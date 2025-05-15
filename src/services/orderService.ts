import { supabase } from "@/integrations/supabase/client";
import { Order, CartItem } from "@/types";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

// Function to create an order in Supabase
export const createOrderInDB = async (
  userId: string | undefined,
  cartItems: CartItem[],
  totalAmount: number,
  pickupTime: string
): Promise<string | null> => {
  try {
    if (!userId) {
      console.error("User is not authenticated");
      return null;
    }
    
    // Create a random 4-digit order code
    const orderCode = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Generate a unique ref_id with SY prefix
    // Format: SY-YYMMDD-XXXX where XXXX is a random string
    const today = new Date();
    const dateStr = today.getFullYear().toString().substr(-2) + 
                   (today.getMonth() + 1).toString().padStart(2, '0') + 
                   today.getDate().toString().padStart(2, '0');
    
    // Add a short random string for uniqueness
    const shortUuid = uuidv4().substring(0, 4);
    const refId = `SY-${dateStr}-${shortUuid}`;
    
    // Insert the order with a unique ref_id
    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total_amount: totalAmount,
        status: 'pending',
        pickup_time: pickupTime,
        order_code: orderCode,
        ref_id: refId
      })
      .select('id')
      .single();
      
    if (error || !data) {
      console.error("Failed to create order:", error);
      return null;
    }
    
    // Insert order items
    const orderItems = cartItems.map(item => ({
      order_id: data.id,
      item_id: parseInt(item.id),
      item_name: item.name,
      price: item.price,
      quantity: item.quantity
    }));
    
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
      
    if (itemsError) {
      console.error("Failed to create order items:", itemsError);
      return null;
    }
    
    return refId;
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
};

// Function to get an order by ID
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    // Get the order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();
      
    if (orderError || !orderData) {
      console.error("Failed to fetch order:", orderError);
      return null;
    }
    
    // Get the order items
    const { data: itemsData, error: itemsError } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);
      
    if (itemsError) {
      console.error("Failed to fetch order items:", itemsError);
      return null;
    }
    
    // Transform to our Order type
    const order: Order = {
      id: orderData.id,
      items: itemsData.map(item => ({
        id: item.item_id?.toString() || "",
        name: item.item_name,
        price: Number(item.price),
        quantity: item.quantity,
        pickupTime: orderData.pickup_time || "",
        description: "",
        image: "/placeholder.svg",
        category: "",
        isVegetarian: false, 
        available: true,
        maxQuantity: 4
      })),
      totalAmount: Number(orderData.total_amount),
      orderDate: new Date(orderData.created_at).toLocaleDateString(),
      pickupTime: orderData.pickup_time || "",
      status: {
        received: true,
        preparation: orderData.status === 'preparing' || orderData.status === 'ready' || orderData.status === 'completed',
        readyForPickup: orderData.status === 'ready' || orderData.status === 'completed',
        completed: orderData.status === 'completed' || orderData.collected,
      },
      orderCode: orderData.order_code || ""
    };
    
    return order;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
};

// Function to update order status
export const updateOrderStatus = async (orderId: string, status: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);
      
    if (error) {
      console.error("Failed to update order status:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error updating order status:", error);
    return false;
  }
};

// Function to mark order as collected
export const collectOrder = async (orderId: string, code: string): Promise<boolean> => {
  try {
    // First verify the code
    const { data, error } = await supabase
      .from('orders')
      .select('order_code')
      .eq('id', orderId)
      .single();
      
    if (error || !data) {
      console.error("Failed to verify order code:", error);
      return false;
    }
    
    if (data.order_code !== code) {
      toast.error("Incorrect collection code");
      return false;
    }
    
    // Mark as collected
    const { error: updateError } = await supabase
      .from('orders')
      .update({ 
        collected: true,
        status: 'completed' 
      })
      .eq('id', orderId);
      
    if (updateError) {
      console.error("Failed to mark order as collected:", updateError);
      return false;
    }
    
    toast.success("Order collected successfully!");
    return true;
  } catch (error) {
    console.error("Error collecting order:", error);
    return false;
  }
};

// Function to get user's orders
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    if (!userId) {
      return [];
    }
    
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (ordersError || !ordersData) {
      console.error("Failed to fetch user orders:", ordersError);
      return [];
    }
    
    // Transform to our Order type (without items for now - can be loaded on demand)
    const orders: Order[] = ordersData.map(order => ({
      id: order.id,
      items: [], // Items will be loaded on demand when needed
      totalAmount: Number(order.total_amount),
      orderDate: new Date(order.created_at).toLocaleDateString(),
      pickupTime: order.pickup_time || "",
      status: {
        received: true,
        preparation: order.status === 'preparing' || order.status === 'ready' || order.status === 'completed',
        readyForPickup: order.status === 'ready' || order.status === 'completed',
        completed: order.status === 'completed' || order.collected,
      },
      orderCode: order.order_code || ""
    }));
    
    return orders;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
};

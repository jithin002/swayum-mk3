
import { supabase } from "@/integrations/supabase/client";
import { CartItem, OrderStatus } from "@/types";

export const createOrderInDB = async (
  userId: string,
  items: CartItem[],
  totalAmount: number,
  pickupTime: string,
  itemName: string
) => {
  try {
    // Create the order in the orders table
    const { data: orderData, error } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total_amount: totalAmount,
        status: 'received',
        pickup_time: pickupTime,
        order_code: Math.floor(1000 + Math.random() * 9000).toString(),
        item_name: itemName // Store the item names in the database
      })
      .select('id')
      .single();

    if (error) {
      console.error("Error creating order:", error);
      return null;
    }

    // Create order items for each item in the cart
    const orderId = orderData.id;
    
    const orderItems = items.map(item => ({
      order_id: orderId,
      item_id: parseInt(item.id),
      item_name: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error("Error creating order items:", itemsError);
      // Order was created but items failed, we should handle this better in production
    }

    return orderId;
  } catch (error) {
    console.error("Error in createOrderInDB:", error);
    return null;
  }
};

export const getOrderById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Error fetching order:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getOrderById:", error);
    return null;
  }
};

export const updateOrderStatus = async (id: string, status: Partial<OrderStatus>) => {
  try {
    let dbStatus = 'received';
    
    if (status.preparation) dbStatus = 'preparation';
    if (status.readyForPickup) dbStatus = 'ready';
    if (status.completed) dbStatus = 'completed';
    
    const { error } = await supabase
      .from('orders')
      .update({ status: dbStatus })
      .eq('id', id);

    if (error) {
      console.error("Error updating order status:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in updateOrderStatus:", error);
    return false;
  }
};

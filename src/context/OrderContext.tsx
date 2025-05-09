
import React, { createContext, useContext, useState, useEffect } from "react";
import { Order, CartItem, OrderStatus } from "@/types";
import { format } from "date-fns";
import { useAuth } from "./AuthContext";
import { createOrderInDB, getOrderById, updateOrderStatus as updateOrderStatusInDB } from "@/services/orderService";
import { toast } from "sonner";

interface OrderContextType {
  orders: Order[];
  createOrder: (cartItems: CartItem[], totalAmount: number, pickupTime: string) => Promise<Order | null>;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Partial<OrderStatus>) => void;
  clearOrders: () => void;
  collectOrder: (id: string, code: string) => Promise<boolean>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();

  // Load orders from localStorage on initial load
  useEffect(() => {
    const storedOrders = localStorage.getItem("swayumOrders");
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (e) {
        console.error("Error parsing orders from localStorage", e);
        localStorage.removeItem("swayumOrders");
      }
    }
  }, []);

  // Save orders to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("swayumOrders", JSON.stringify(orders));
  }, [orders]);

  const createOrder = async (cartItems: CartItem[], totalAmount: number, pickupTime: string): Promise<Order | null> => {
    try {
      // Create an order code (4 digits)
      const orderCode = Math.floor(1000 + Math.random() * 9000).toString();
      
      // Create order in Supabase if user is logged in
      let orderId: string;
      
      if (user) {
        const dbOrderId = await createOrderInDB(user.id, cartItems, totalAmount, pickupTime);
        if (!dbOrderId) {
          toast.error("Failed to create order. Please try again.");
          return null;
        }
        orderId = dbOrderId;
      } else {
        // Fallback to local storage if not logged in
        orderId = `SW${Math.floor(10000 + Math.random() * 90000)}`;
      }
      
      const newOrder: Order = {
        id: orderId,
        items: cartItems,
        totalAmount,
        orderDate: format(new Date(), "MMMM d, yyyy"),
        pickupTime,
        status: {
          received: true,
          preparation: false,
          readyForPickup: false,
          completed: false,
        },
        orderCode
      };

      setOrders((prevOrders) => [...prevOrders, newOrder]);
      return newOrder;
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order. Please try again.");
      return null;
    }
  };

  const getOrderById = (id: string) => {
    return orders.find((order) => order.id === id);
  };

  const updateOrderStatus = (id: string, status: Partial<OrderStatus>) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === id) {
          return {
            ...order,
            status: { ...order.status, ...status },
          };
        }
        return order;
      })
    );
  };

  const collectOrder = async (id: string, code: string): Promise<boolean> => {
    // Check if the code matches
    const order = orders.find((o) => o.id === id);
    if (!order || order.orderCode !== code) {
      toast.error("Incorrect collection code");
      return false;
    }
    
    // Update the order status
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === id) {
          return {
            ...order,
            status: { ...order.status, completed: true },
          };
        }
        return order;
      })
    );
    
    toast.success("Order collected successfully!");
    return true;
  };

  const clearOrders = () => {
    setOrders([]);
  };

  const value = {
    orders,
    createOrder,
    getOrderById,
    updateOrderStatus,
    clearOrders,
    collectOrder,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within a OrderProvider");
  }
  return context;
};


import React, { createContext, useContext, useState, useEffect } from "react";
import { Order, CartItem, OrderStatus } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

interface OrderContextType {
  orders: Order[];
  createOrder: (cartItems: CartItem[], totalAmount: number, pickupTime: string) => Order;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Partial<OrderStatus>) => void;
  clearOrders: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

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

  const createOrder = (cartItems: CartItem[], totalAmount: number, pickupTime: string): Order => {
    const orderId = `SW${Math.floor(10000 + Math.random() * 90000)}`;
    
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
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    return newOrder;
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

  const clearOrders = () => {
    setOrders([]);
  };

  const value = {
    orders,
    createOrder,
    getOrderById,
    updateOrderStatus,
    clearOrders,
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

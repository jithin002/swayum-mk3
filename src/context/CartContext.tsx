import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, MenuItem, TimeSlot } from "@/types";
import { toast } from "sonner";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem, quantity: number, pickupTime: string) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  isQuantityAvailable: (item: MenuItem, quantity: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const storedCart = localStorage.getItem("swayumCart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Error parsing cart from localStorage", e);
        localStorage.removeItem("swayumCart");
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("swayumCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const isQuantityAvailable = (item: MenuItem, quantity: number): boolean => {
    return quantity <= (item.maxQuantity || 4);
  };

  const addToCart = (item: MenuItem, quantity: number, pickupTime: string) => {
    if (!isQuantityAvailable(item, quantity)) {
      toast.error(`Maximum order quantity is ${item.maxQuantity || 4} for this item.`);
      return;
    }

    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.pickupTime === pickupTime
      );

      if (existingItemIndex !== -1) {
        // Update existing item
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;
        
        if (!isQuantityAvailable(item, newQuantity)) {
          toast.error(`Maximum order quantity is ${item.maxQuantity || 4} for this item.`);
          return prevItems;
        }
        
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
        };
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { ...item, quantity, pickupTime }];
      }
    });

    toast.success(`Added ${quantity} ${item.name} to your cart`);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    toast.info("Item removed from cart");
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          if (quantity <= 0) {
            // Return unchanged to be filtered out later
            return item;
          }
          
          if (!isQuantityAvailable(item, quantity)) {
            toast.error(`Maximum order quantity is ${item.maxQuantity || 4} for this item.`);
            return item;
          }
          
          return { ...item, quantity };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getItemCount,
    updateItemQuantity,
    isQuantityAvailable,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

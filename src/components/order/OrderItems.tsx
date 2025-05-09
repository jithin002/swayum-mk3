
import React from "react";
import { CartItem } from "@/types";

interface OrderItemsProps {
  items: CartItem[];
  totalAmount: number;
}

const OrderItems: React.FC<OrderItemsProps> = ({ items, totalAmount }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-6">
      <h3 className="text-lg font-semibold mb-4">Order Items</h3>
      
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between pb-3 border-b last:border-b-0 last:pb-0">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">{item.quantity} × ₹{item.price}</p>
            </div>
            <p className="font-semibold">₹{item.price * item.quantity}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t">
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderItems;

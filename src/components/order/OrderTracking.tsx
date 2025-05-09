
import React from "react";
import { Check, Package, Clock } from "lucide-react";
import { OrderStatus } from "@/types";

interface OrderTrackingProps {
  status: OrderStatus;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ status }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-6">
      <h3 className="text-lg font-semibold mb-4">Order Tracking</h3>
      
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200"></div>
        
        <div className="flex items-center relative z-10 mb-6">
          <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white">
            <Check size={18} />
          </div>
          <div className="ml-4">
            <h4 className="font-medium">Order Received</h4>
            <p className="text-sm text-gray-500">We've got your order</p>
          </div>
        </div>
        
        <div className="flex items-center relative z-10 mb-6">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center 
            ${status.preparation ? "bg-green-500 text-white" : "bg-gray-200"}`}>
            {status.preparation ? <Check size={18} /> : <Package size={18} className="text-gray-500" />}
          </div>
          <div className="ml-4">
            <h4 className="font-medium">Preparation</h4>
            <p className="text-sm text-gray-500">Your food is being prepared</p>
          </div>
        </div>
        
        <div className="flex items-center relative z-10">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center 
            ${status.readyForPickup ? "bg-green-500 text-white" : "bg-gray-200"}`}>
            {status.readyForPickup ? <Check size={18} /> : <Clock size={18} className="text-gray-500" />}
          </div>
          <div className="ml-4">
            <h4 className="font-medium">Ready for Pickup</h4>
            <p className="text-sm text-gray-500">
              {status.readyForPickup 
                ? "Your order is ready! Please collect it." 
                : "We'll notify you when your order is ready"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;

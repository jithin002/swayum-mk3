
import React from "react";
import { Check } from "lucide-react";

const OrderConfirmationBanner: React.FC<{ orderId: string }> = ({ orderId }) => {
  return (
    <div className="bg-green-50 border border-green-100 rounded-lg p-6 mb-6 text-center">
      <div className="flex justify-center mb-4">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="h-8 w-8 text-green-500" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-green-800">Order Confirmed!</h2>
      <p className="text-green-600 mt-1">Your order #{orderId} has been received</p>
    </div>
  );
};

export default OrderConfirmationBanner;


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { Order } from "@/types";

interface OrderDetailsProps {
  order: Order;
  onCollectOrder: (code: string) => Promise<boolean>;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onCollectOrder }) => {
  const [collectionCode, setCollectionCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCollectOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collectionCode) {
      return;
    }

    setIsSubmitting(true);
    const success = await onCollectOrder(collectionCode);
    setIsSubmitting(false);
    
    if (!success) {
      // Reset code on failure
      setCollectionCode("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Order Details</h3>
        <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
          Pickup
        </span>
      </div>
      
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-500">Order Reference</span>
        <span className="font-medium">{order.id}</span>
      </div>

      {order.refId && (
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-500">Order ID</span>
          <span className="font-medium text-swayum-orange">{order.refId}</span>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-500">Date</span>
        <span className="font-medium">{order.orderDate}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-gray-500">Pickup Time</span>
        <span className="font-medium">{order.pickupTime}</span>
      </div>
      
      {order.orderCode && !order.status.completed && (
        <div className="mt-4 pt-4 border-t">
          <form onSubmit={handleCollectOrder}>
            <h4 className="font-medium mb-2">Collect Order</h4>
            <div className="flex items-center gap-2">
              <Input 
                type="text" 
                placeholder="Enter collection code" 
                value={collectionCode}
                onChange={(e) => setCollectionCode(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="submit"
                className="bg-swayum-orange hover:bg-orange-600"
                disabled={isSubmitting || !collectionCode}
              >
                {isSubmitting ? "Verifying..." : "Collect"}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Enter the collection code shown to the customer</p>
          </form>
        </div>
      )}
      
      {order.status.completed && (
        <div className="mt-4 pt-3 border-t">
          <div className="flex items-center text-green-600">
            <Check size={18} className="mr-2" />
            <span className="font-medium">Order has been collected</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;

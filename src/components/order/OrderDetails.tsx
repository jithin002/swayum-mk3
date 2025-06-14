
import React from "react";
import { Check, Clock } from "lucide-react";
import { Order } from "@/types";

// Status mapping for UI
const STATUS_DETAILS: Record<
  string,
  { label: string; icon: React.ReactNode; color: string }
> = {
  pending: {
    label: "Order Received",
    icon: <Clock size={20} className="text-blue-500 mr-2" />,
    color: "bg-blue-100 text-blue-800",
  },
  preparing: {
    label: "Being Prepared",
    icon: <Clock size={20} className="text-yellow-600 mr-2" />,
    color: "bg-yellow-50 text-yellow-800",
  },
  ready: {
    label: "Ready for Pickup",
    icon: <Check size={20} className="text-green-500 mr-2" />,
    color: "bg-green-100 text-green-800",
  },
  completed: {
    label: "Order Collected",
    icon: <Check size={20} className="text-green-800 mr-2" />,
    color: "bg-green-200 text-green-900",
  }
};

interface OrderDetailsProps {
  order: Order & { rawStatus?: string; };
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  // fallback if backend returns status not covered
  const rawStatus = order.rawStatus || "pending";
  const statusData = STATUS_DETAILS[rawStatus] || {
    label: rawStatus[0].toUpperCase() + rawStatus.slice(1),
    icon: <Clock size={20} className="text-gray-400 mr-2" />,
    color: "bg-gray-100 text-gray-600"
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

      {/* Collection Status Section */}
      <div className="mt-6 pt-4 border-t">
        <h4 className="font-medium mb-2">Collection Status</h4>
        <div
          className={`flex items-center px-3 py-2 rounded ${statusData.color} font-semibold text-base`}
        >
          {statusData.icon}
          {statusData.label}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

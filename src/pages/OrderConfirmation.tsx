
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useOrder } from "@/context/OrderContext";
import { Check, Package, Clock } from "lucide-react";

const OrderConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById, updateOrderStatus } = useOrder();
  const navigate = useNavigate();
  const [order, setOrder] = useState(getOrderById(id || ""));

  useEffect(() => {
    if (!order) {
      navigate("/menu");
      return;
    }

    // Simulate order progress for demonstration
    const preparation = setTimeout(() => {
      updateOrderStatus(order.id, { preparation: true });
      setOrder(getOrderById(order.id));
    }, 8000);

    const readyForPickup = setTimeout(() => {
      updateOrderStatus(order.id, { readyForPickup: true });
      setOrder(getOrderById(order.id));
    }, 15000);

    return () => {
      clearTimeout(preparation);
      clearTimeout(readyForPickup);
    };
  }, [order, navigate, updateOrderStatus, getOrderById]);

  if (!order) return null;

  return (
    <div className="min-h-screen flex flex-col pb-20">
      <div className="swayum-header">
        <div className="w-6"></div> {/* Empty div for spacing */}
        <h1 className="text-2xl font-bold">Order Confirmed</h1>
        <div className="w-6"></div> {/* Empty div for spacing */}
      </div>
      
      <main className="flex-1 p-4">
        <div className="bg-green-50 border border-green-100 rounded-lg p-6 mb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-green-800">Order Confirmed!</h2>
          <p className="text-green-600 mt-1">Your order #{order.id} has been received</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-5 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Order Details</h3>
            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
              Pickup
            </span>
          </div>
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-500">Order Number</span>
            <span className="font-medium">{order.id}</span>
          </div>
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-500">Date</span>
            <span className="font-medium">{order.orderDate}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Pickup Time</span>
            <span className="font-medium">{order.pickupTime}</span>
          </div>
        </div>
        
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
                ${order.status.preparation ? "bg-green-500 text-white" : "bg-gray-200"}`}>
                {order.status.preparation ? <Check size={18} /> : <Package size={18} className="text-gray-500" />}
              </div>
              <div className="ml-4">
                <h4 className="font-medium">Preparation</h4>
                <p className="text-sm text-gray-500">Your food is being prepared</p>
              </div>
            </div>
            
            <div className="flex items-center relative z-10">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center 
                ${order.status.readyForPickup ? "bg-green-500 text-white" : "bg-gray-200"}`}>
                {order.status.readyForPickup ? <Check size={18} /> : <Clock size={18} className="text-gray-500" />}
              </div>
              <div className="ml-4">
                <h4 className="font-medium">Ready for Pickup</h4>
                <p className="text-sm text-gray-500">
                  {order.status.readyForPickup 
                    ? "Your order is ready! Please collect it." 
                    : "We'll notify you when your order is ready"}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-5 mb-6">
          <h3 className="text-lg font-semibold mb-4">Order Items</h3>
          
          <div className="space-y-3">
            {order.items.map((item) => (
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
              <span>₹{order.totalAmount}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-5 mb-6">
          <h3 className="text-lg font-semibold mb-3">Pickup QR Code</h3>
          <div className="flex justify-center mb-4">
            <div className="border-2 border-swayum-orange p-2 rounded-md">
              <svg className="h-48 w-48" viewBox="0 0 100 100" fill="black">
                <rect x="10" y="10" width="30" height="30" />
                <rect x="60" y="10" width="30" height="30" />
                <rect x="10" y="60" width="30" height="30" />
                <rect x="45" y="15" width="5" height="20" />
                <rect x="15" y="45" width="20" height="5" />
                <rect x="65" y="45" width="20" height="5" />
                <rect x="45" y="65" width="5" height="20" />
                <rect x="65" y="65" width="5" height="5" />
                <rect x="75" y="65" width="5" height="5" />
                <rect x="85" y="65" width="5" height="5" />
                <rect x="65" y="75" width="5" height="5" />
                <rect x="75" y="75" width="5" height="5" />
                <rect x="85" y="75" width="5" height="5" />
                <rect x="65" y="85" width="5" height="5" />
                <rect x="75" y="85" width="5" height="5" />
                <rect x="85" y="85" width="5" height="5" />
              </svg>
            </div>
          </div>
          <p className="text-center font-semibold">Show this QR code when picking up your order</p>
        </div>
      </main>
      
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4">
        <Link 
          to="/menu"
          className="block w-full py-3 px-4 bg-swayum-orange text-white rounded-lg font-semibold text-center"
        >
          Back to Menu
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;

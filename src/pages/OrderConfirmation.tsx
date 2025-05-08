
import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useOrder } from "@/context/OrderContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const OrderConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById } = useOrder();
  const navigate = useNavigate();
  const order = getOrderById(id || "");

  useEffect(() => {
    if (!order) {
      navigate("/");
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="swayum-header">
        <div className="w-6"></div> {/* Empty div for spacing */}
        <h1 className="text-2xl font-bold">Order Confirmed!</h1>
        <div className="w-6"></div> {/* Empty div for spacing */}
      </div>
      
      <main className="flex-1 p-4 mb-20">
        <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-green-800">Order Confirmed!</h2>
          <p className="text-green-600 mt-1">Your order has been received and is being prepared.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Order Number</h3>
            <p>{order.id}</p>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Date</h3>
            <p>{order.orderDate}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Pickup at</h3>
            <p>{order.pickupTime}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4">Order Items</h3>
          
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 object-cover rounded-md mr-3"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.quantity}x ₹{item.price}</p>
                  </div>
                </div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Subtotal</h4>
              <p>₹{order.totalAmount}</p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <h4 className="font-bold text-lg">Total</h4>
              <p className="font-bold text-lg">₹{order.totalAmount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4">Order Status</h3>
          
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200"></div>
            
            <div className="flex items-center relative z-10 mb-6">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${order.status.received ? 'bg-green-500' : 'bg-gray-300'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="font-medium">Order Received</h4>
                <p className="text-sm text-gray-500">We've got your order</p>
              </div>
            </div>
            
            <div className="flex items-center relative z-10 mb-6">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${order.status.preparation ? 'bg-green-500' : 'bg-gray-300'}`}>
                {order.status.preparation ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-white text-xs">2</span>
                )}
              </div>
              <div className="ml-4">
                <h4 className="font-medium">Preparation</h4>
                <p className="text-sm text-gray-500">Your order is being prepared</p>
              </div>
            </div>
            
            <div className="flex items-center relative z-10 mb-6">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${order.status.readyForPickup ? 'bg-green-500' : 'bg-gray-300'}`}>
                {order.status.readyForPickup ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-white text-xs">3</span>
                )}
              </div>
              <div className="ml-4">
                <h4 className="font-medium">Ready for Pickup</h4>
                <p className="text-sm text-gray-500">Come collect your order</p>
              </div>
            </div>
            
            <div className="flex items-center relative z-10">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${order.status.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                {order.status.completed ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-white text-xs">4</span>
                )}
              </div>
              <div className="ml-4">
                <h4 className="font-medium">Completed</h4>
                <p className="text-sm text-gray-500">Enjoy your meal!</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 text-center">
          <h3 className="text-lg font-semibold mb-3">Your Order QR Code</h3>
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
          <p className="font-semibold">Order #{order.id}</p>
          <p className="text-sm text-gray-500 mt-1">Show this QR code when picking up your order</p>
        </div>
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <Link 
          to="/menu"
          className="swayum-btn w-full"
        >
          Back to Menu
        </Link>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;

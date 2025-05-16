
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useOrder } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import QuantitySelector from "@/components/QuantitySelector";
import { formatTimeSlot } from "@/services/timeSlotService";
import { toast } from "sonner";
import { ShoppingCart, CreditCard } from "lucide-react";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!user) {
      // If user is not authenticated, redirect to auth page with return URL
      navigate('/auth', { state: { from: '/payment-gateway' } });
      return;
    }

    // Navigate to payment gateway with cart data
    navigate('/payment-gateway');
  };

  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.pickupTime]) {
      acc[item.pickupTime] = [];
    }
    acc[item.pickupTime].push(item);
    return acc;
  }, {} as Record<string, typeof cartItems>);

  return (
    <div className="min-h-screen flex flex-col pb-32">
      <div className="swayum-header">
        <Link to="/menu" className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold">Cart</h1>
        <div className="w-6"></div> {/* Empty div for spacing */}
      </div>
      
      <main className="flex-1 p-4">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full mt-20">
            <ShoppingCart size={64} className="text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
            <Link to="/menu" className="swayum-btn">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div>
            {Object.entries(groupedItems).map(([pickupTime, items]) => (
              <div key={pickupTime} className="mb-6">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-swayum-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-semibold">Pickup at {formatTimeSlot(pickupTime)}</h3>
                </div>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-4 border-b last:border-b-0 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-gray-500 text-sm">{item.description.substring(0, 40)}...</p>
                          <p className="text-swayum-orange font-bold mt-1">₹{item.price}</p>
                        </div>
                      </div>
                      
                      <div className="max-w-[100px]">
                        <QuantitySelector
                          quantity={item.quantity}
                          maxQuantity={item.maxQuantity}
                          onIncrease={() => updateItemQuantity(item.id, item.quantity + 1)}
                          onDecrease={() => updateItemQuantity(item.id, item.quantity - 1)}
                          onRemove={() => removeFromCart(item.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{getCartTotal()}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total</span>
                <span>₹{getCartTotal()}</span>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4 z-40">
        <button 
          className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center ${
            cartItems.length === 0 
              ? 'bg-gray-300 text-gray-500' 
              : 'bg-swayum-orange text-white'
          }`}
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          <CreditCard className="mr-2" size={18} />
          {`Proceed to Payment • ₹${getCartTotal()}`}
        </button>
      </div>
    </div>
  );
};

export default CartPage;

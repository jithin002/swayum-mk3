
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useOrder } from "@/context/OrderContext";
import QuantitySelector from "@/components/QuantitySelector";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatTimeSlot } from "@/services/timeSlotService";
import { toast } from "sonner";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal, clearCart } = useCart();
  const { createOrder } = useOrder();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const pickupTime = cartItems[0].pickupTime;
    const totalAmount = getCartTotal();
    
    const order = createOrder(cartItems, totalAmount, pickupTime);
    clearCart();
    
    navigate(`/order-confirmation/${order.id}`);
  };

  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.pickupTime]) {
      acc[item.pickupTime] = [];
    }
    acc[item.pickupTime].push(item);
    return acc;
  }, {} as Record<string, typeof cartItems>);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="swayum-header">
        <Link to="/menu" className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold">Cart</h1>
        <div className="w-6"></div> {/* Empty div for spacing */}
      </div>
      
      <main className="flex-1 p-4 mb-20">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
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
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-gray-500 text-sm">{item.description.substring(0, 40)}...</p>
                          <p className="text-swayum-orange font-bold mt-1">₹{item.price}</p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="mb-2 max-w-[100px]">
                          <QuantitySelector
                            quantity={item.quantity}
                            maxQuantity={item.maxQuantity}
                            onIncrease={() => updateItemQuantity(item.id, item.quantity + 1)}
                            onDecrease={() => updateItemQuantity(item.id, item.quantity - 1)}
                          />
                        </div>
                        <button 
                          className="text-red-500 text-sm hover:underline"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-700">Total Amount:</span>
          <span className="text-xl font-bold">₹{getCartTotal()}</span>
        </div>
        <button 
          className="swayum-btn w-full"
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          Proceed to Payment
        </button>
      </div>
      
      <Footer />
    </div>
  );
};

export default CartPage;

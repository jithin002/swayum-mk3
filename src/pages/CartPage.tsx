
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useOrder } from "@/context/OrderContext";
import QuantitySelector from "@/components/QuantitySelector";
import { formatTimeSlot } from "@/services/timeSlotService";
import { toast } from "sonner";
import { ShoppingCart, ArrowRight, CreditCard } from "lucide-react";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal, clearCart } = useCart();
  const { createOrder } = useOrder();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      setTimeout(async () => {
        const pickupTime = cartItems[0].pickupTime;
        const totalAmount = getCartTotal();
        
        // Await the order creation to get the order object
        const order = await createOrder(cartItems, totalAmount, pickupTime);
        
        if (order) {
          clearCart();
          navigate(`/order-confirmation/${order.id}`);
        } else {
          toast.error("Failed to create order");
        }
        
        setIsProcessing(false);
      }, 1500);
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Checkout failed. Please try again.");
      setIsProcessing(false);
    }
  };

  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.pickupTime]) {
      acc[item.pickupTime] = [];
    }
    acc[item.pickupTime].push(item);
    return acc;
  }, {} as Record<string, typeof cartItems>);

  return (
    <div className="min-h-screen flex flex-col pb-24">
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
      
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4">
        <button 
          className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center ${
            cartItems.length === 0 || isProcessing 
              ? 'bg-gray-300 text-gray-500' 
              : 'bg-swayum-orange text-white'
          }`}
          onClick={handleCheckout}
          disabled={cartItems.length === 0 || isProcessing}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2" size={18} />
              {`Checkout • ₹${getCartTotal()}`}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CartPage;

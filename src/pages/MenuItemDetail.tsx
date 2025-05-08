
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getMenuItemById } from "@/services/menuService";
import { useCart } from "@/context/CartContext";
import TimeSlotSelector from "@/components/TimeSlotSelector";
import QuantitySelector from "@/components/QuantitySelector";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const MenuItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const menuItem = getMenuItemById(id || "");
  const { addToCart, isQuantityAvailable } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  if (!menuItem) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>Item not found</p>
        <Link to="/menu" className="text-swayum-orange hover:underline mt-2">
          Back to Menu
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedTime) {
      toast.error("Please select a pickup time");
      return;
    }
    
    if (!isQuantityAvailable(menuItem, quantity)) {
      toast.error(`Maximum order quantity is ${menuItem.maxQuantity} for this item`);
      return;
    }
    
    addToCart(menuItem, quantity, selectedTime);
    navigate("/cart");
  };

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleIncreaseQuantity = () => {
    if (quantity < menuItem.maxQuantity) {
      setQuantity(quantity + 1);
    } else {
      toast.error(`Maximum order quantity is ${menuItem.maxQuantity} for this item`);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = menuItem.price * quantity;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="swayum-header">
        <Link to="/menu" className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-xl font-bold">Item Details</h1>
        <div className="w-6"></div> {/* Empty div for spacing */}
      </div>

      <main className="flex-1 p-4 mb-16">
        <div className="bg-white rounded-lg overflow-hidden shadow-md mb-6">
          <img
            src={menuItem.image}
            alt={menuItem.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{menuItem.name}</h1>
              <span className="text-xl font-bold text-swayum-orange">₹{menuItem.price}</span>
            </div>
            
            <div className="flex items-center mt-2">
              {menuItem.isVegetarian && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2">
                  Vegetarian
                </span>
              )}
              <span className="text-gray-500">
                {menuItem.category}
              </span>
            </div>
            
            <p className="text-gray-600 mt-3">{menuItem.description}</p>
            
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Quantity: <span className="text-xs text-gray-500">(Max: {menuItem.maxQuantity})</span></h3>
              </div>
              <div className="mt-2 max-w-[120px]">
                <QuantitySelector 
                  quantity={quantity} 
                  onIncrease={handleIncreaseQuantity} 
                  onDecrease={handleDecreaseQuantity}
                  maxQuantity={menuItem.maxQuantity}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <TimeSlotSelector 
            onSelectTimeSlot={handleTimeSlotSelect}
            selectedTime={selectedTime}
          />
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-gray-500">Total:</span>
              <span className="ml-2 text-xl font-bold">₹{totalPrice}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">Quantity:</span>
              <span>{quantity}</span>
            </div>
          </div>
          <button 
            className="swayum-btn w-full"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MenuItemDetail;

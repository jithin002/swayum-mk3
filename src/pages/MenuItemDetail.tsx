
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getMenuItemById } from "@/services/menuService";
import { useCart } from "@/context/CartContext";
import TimeSlotSelector from "@/components/TimeSlotSelector";
import QuantitySelector from "@/components/QuantitySelector";
import FloatingAddToCart from "@/components/FloatingAddToCart";
import { toast } from "sonner";
import { MenuItem } from "@/types";

const MenuItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState<MenuItem | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart, isQuantityAvailable } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        setLoading(true);
        const item = await getMenuItemById(id || "", true);
        setMenuItem(item);
      } catch (error) {
        console.error("Error fetching menu item:", error);
        toast.error("Failed to load menu item details");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-swayum-orange"></div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen flex flex-col pb-32">
      <div className="swayum-header">
        <Link to="/menu" className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-xl font-bold">Item Details</h1>
        <div className="w-6"></div> {/* Empty div for spacing */}
      </div>

      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-md mb-6">
          <div className="w-full h-48">
            <img 
              src={menuItem.image} 
              alt={menuItem.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </div>
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
      </main>
      
      <FloatingAddToCart 
        price={menuItem.price}
        quantity={quantity}
        onAddToCart={handleAddToCart}
        disabled={!selectedTime}
      />
    </div>
  );
};

export default MenuItemDetail;

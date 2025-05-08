
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface FloatingAddToCartProps {
  price: number;
  quantity: number;
  onAddToCart: () => void;
  disabled?: boolean;
}

const FloatingAddToCart: React.FC<FloatingAddToCartProps> = ({
  price,
  quantity,
  onAddToCart,
  disabled = false
}) => {
  const totalPrice = price * quantity;
  
  return (
    <div className="fixed bottom-16 left-0 right-0 mx-auto px-4 z-20">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto flex items-center justify-between">
        <div>
          <p className="text-gray-500">Total:</p>
          <p className="text-xl font-bold">₹{totalPrice}</p>
        </div>
        <Button 
          onClick={onAddToCart} 
          disabled={disabled} 
          className="bg-swayum-orange hover:bg-orange-600 text-white"
        >
          <ShoppingCart className="mr-2" size={18} />
          {disabled ? "Select Time" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};

export default FloatingAddToCart;

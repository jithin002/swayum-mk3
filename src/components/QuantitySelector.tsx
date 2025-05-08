
import React from "react";
import { Plus, Minus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  maxQuantity?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ 
  quantity, 
  onIncrease, 
  onDecrease,
  maxQuantity = 4
}) => {
  return (
    <div className="quantity-control">
      <button 
        className="quantity-btn" 
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <div className="quantity-display">
        <span>{quantity}</span>
      </div>
      <button 
        className="quantity-btn" 
        onClick={onIncrease}
        disabled={quantity >= maxQuantity}
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default QuantitySelector;


import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove?: () => void;
  maxQuantity?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ 
  quantity, 
  onIncrease, 
  onDecrease,
  onRemove,
  maxQuantity = 4
}) => {
  return (
    <div className="quantity-control">
      <button 
        className="quantity-btn text-red-500"
        onClick={quantity === 1 ? onRemove : onDecrease}
        aria-label={quantity === 1 ? "Remove item" : "Decrease quantity"}
      >
        {quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
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

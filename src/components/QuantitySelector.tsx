
import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const handleDecrease = onRemove && quantity === 1 ? onRemove : onDecrease;

  return (
    <div className="flex items-center justify-end w-full">
      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg hover:bg-swayum-orange/10"
          onClick={handleDecrease}
          aria-label={quantity === 1 ? "Remove item" : "Decrease quantity"}
        >
          {quantity === 1 ? (
            <Trash2 className="text-red-500" size={18} /> 
          ) : (
            <Minus className="text-swayum-orange" size={20} />
          )}
        </Button>
        
        <span className="w-8 text-center font-bold text-lg text-swayum-text-dark select-none">
          {quantity}
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg text-swayum-orange hover:bg-swayum-orange/10 disabled:opacity-40"
          onClick={onIncrease}
          disabled={quantity >= maxQuantity}
          aria-label="Increase quantity"
        >
          <Plus size={20} />
        </Button>
      </div>
    </div>
  );
};

export default QuantitySelector;

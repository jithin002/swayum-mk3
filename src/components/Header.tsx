
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Header: React.FC = () => {
  const { getItemCount } = useCart();
  const cartItemCount = getItemCount();
  
  return (
    <header className="swayum-header">
      <Link to="/" className="flex items-center">
        <div className="ml-2">
          <h1 className="font-bold text-2xl">SwaYum</h1>
        </div>
      </Link>
      
      <Link to="/cart" className="relative" aria-label="Cart">
        <ShoppingCart size={24} />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-swayum-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
      </Link>
    </header>
  );
};

export default Header;

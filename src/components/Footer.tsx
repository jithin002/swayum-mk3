
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Footer: React.FC = () => {
  const { getItemCount } = useCart();
  const cartItemCount = getItemCount();
  
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4">
      <div className="flex justify-around items-center">
        <Link to="/" className="flex flex-col items-center text-gray-500 hover:text-swayum-orange">
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link to="/menu" className="flex flex-col items-center text-gray-500 hover:text-swayum-orange">
          <Menu size={24} />
          <span className="text-xs mt-1">Menu</span>
        </Link>
        
        <Link to="/cart" className="flex flex-col items-center text-gray-500 hover:text-swayum-orange relative">
          <ShoppingCart size={24} />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-swayum-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
          <span className="text-xs mt-1">Cart</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
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
      
      <div className="flex items-center gap-4">
        <Link to="/notifications" aria-label="Notifications">
          <Bell size={24} />
        </Link>
        
        <Link to="/profile" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-lg font-bold">U</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;

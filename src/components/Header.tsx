
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
  const { getItemCount } = useCart();
  const { user } = useAuth();
  const cartItemCount = getItemCount();
  
  // Get the first letter of the email as the avatar fallback
  const getInitials = () => {
    if (!user || !user.email) return 'G';
    return user.email.charAt(0).toUpperCase();
  };
  
  return (
    <header className="swayum-header">
      <Link to="/" className="flex items-center">
        <div className="ml-2">
          <h1 className="font-bold text-2xl">SwaYum</h1>
        </div>
      </Link>
      
      <div className="flex items-center space-x-4">
        <Link to="/auth" className="relative" aria-label="Profile">
          <Avatar className="h-9 w-9 border-2 border-white">
            <AvatarFallback className="bg-orange-100 text-swayum-orange">
              {user ? getInitials() : <User size={18} />}
            </AvatarFallback>
          </Avatar>
        </Link>
        
        <Link to="/cart" className="relative" aria-label="Cart">
          <ShoppingCart size={24} />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-swayum-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;

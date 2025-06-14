
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import SwayumLogo from './SwayumLogo';

const Header: React.FC = () => {
  const { getItemCount } = useCart();
  const { user, signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const cartItemCount = getItemCount();

  // Get the first letter of the email as the avatar fallback
  const getInitials = () => {
    if (!user || !user.email) return 'G';
    return user.email.charAt(0).toUpperCase();
  };

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    await signOut();
    setIsLoggingOut(false);
  };

  return (
    <header className="swayum-header">
      <Link to="/" className="flex items-center">
        <SwayumLogo size={44} />
        <div className="ml-3">
          <h1 className="font-bold text-2xl">SwaYum</h1>
        </div>
      </Link>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative" aria-label="Profile">
              <Avatar className="h-9 w-9 border-2 border-white cursor-pointer">
                <AvatarFallback className="bg-orange-100 text-swayum-orange">
                  {user ? getInitials() : <User size={18} />}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {user ? (
              <>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-gray-600">
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} disabled={isLoggingOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{isLoggingOut ? 'Signing out...' : 'Sign out'}</span>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/auth">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Sign in / Register</span>
                  </DropdownMenuItem>
                </Link>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Link to="/cart" className="relative" aria-label="Cart">
          <ShoppingCart size={24} />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-swayum-orange rounded-full w-5 h-5 flex items-center justify-center text-white-50 text-xs">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};
export default Header;

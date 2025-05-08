
import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem } from '@/types';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  return (
    <Link to={`/menu/${item.id}`} className="menu-item-card">
      <div className="flex p-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{item.name}</h3>
          <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
          <div className="mt-2 flex items-center">
            <span className="text-swayum-orange font-bold">₹{item.price}</span>
            {item.isVegetarian && (
              <span className="ml-2 text-green-600 text-xs bg-green-100 px-2 py-1 rounded-full">Vegetarian</span>
            )}
            <span className="ml-2 text-xs text-gray-500">(Max: {item.maxQuantity})</span>
          </div>
        </div>
        <div className="w-24 h-24 ml-3 flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-md"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        </div>
      </div>
    </Link>
  );
};

export default MenuItemCard;

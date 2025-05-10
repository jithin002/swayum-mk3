
import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem } from '@/types';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  return (
    <Link to={`/menu/${item.id}`} className="menu-item-card bg-white rounded-lg shadow-md mb-4 p-4">
      <div className="flex flex-col">
        <div className="mb-2">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <span className="text-swayum-orange font-bold text-lg">₹{item.price}</span>
          </div>
          <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
          
          <div className="mt-2">
            {item.isVegetarian && (
              <div className="flex items-center">
                <span className="inline-block w-4 h-4 rounded-full bg-green-500 mr-2"></span>
                <span className="text-sm">Vegetarian</span>
              </div>
            )}
          </div>
        </div>
        
        {item.image && (
          <div className="mt-2">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </div>
        )}
        
        <button 
          className="mt-4 w-full bg-swayum-orange hover:bg-swayum-dark-orange text-white py-3 rounded-md font-medium transition-colors"
          onClick={(e) => {
            e.preventDefault();
            // Add to cart functionality remains in the MenuItemDetail page
          }}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default MenuItemCard;

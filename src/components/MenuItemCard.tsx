import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem } from '@/types';
interface MenuItemCardProps {
  item: MenuItem;
}
const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item
}) => {
  return <Link to={`/menu/${item.id}`} className="menu-item-card bg-white rounded-lg shadow-md mb-4 p-4">
      <div className="flex flex-col">
        <div className="mb-2">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <span className="text-swayum-orange font-bold text-xl">₹{item.price}</span>
          </div>
          <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
          
          <div className="mt-2">
            {item.isVegetarian && <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2 text-xs"></span>
                <span className="text-xs">Veg</span>
              </div>}
          </div>
        </div>
        
        {item.image && <div className="mt-2">
            <img src={item.image} alt={item.name} onError={e => {
          const target = e.target as HTMLImageElement;
          target.src = '/placeholder.svg';
        }} className="w-full h-48 rounded-md object-cover" />
          </div>}
        
        
      </div>
    </Link>;
};
export default MenuItemCard;
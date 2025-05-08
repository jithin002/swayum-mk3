
import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuItemCard from "@/components/MenuItemCard";
import { getMenuItems } from "@/services/menuService";

const MenuPage: React.FC = () => {
  const menuItems = getMenuItems();
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="swayum-header">
        <Link to="/" className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold">Menu</h1>
        <div className="w-6"></div> {/* Empty div for spacing */}
      </div>
      
      <main className="flex-1 p-4 mb-16">
        <div className="space-y-4">
          {menuItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MenuPage;

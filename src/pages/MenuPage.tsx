
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuItemCard from "@/components/MenuItemCard";
import { getMenuItems } from "@/services/menuService";
import { MenuItem } from "@/types";
import { toast } from "sonner";

const MenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        setLoading(true);
        const items = await getMenuItems(true); // true to fetch from DB
        setMenuItems(items);
      } catch (error) {
        console.error("Error loading menu items:", error);
        toast.error("Failed to load menu items. Showing fallback data.");
      } finally {
        setLoading(false);
      }
    };

    loadMenuItems();
  }, []);

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
      
      <main className="flex-1 p-4 mb-16 bg-orange-50">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-swayum-orange"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default MenuPage;

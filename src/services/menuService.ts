
import { supabase } from "@/integrations/supabase/client";
import { MenuItem } from "@/types";

// Menu data with appropriate image paths
export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Masala Dosa",
    price: 60,
    description: "Crispy & savory pancake, served with chutney and sambar.",
    image: "/lovable-uploads/7ac79e1a-32a9-4be0-b5fe-daccedb94e1f.png",
    category: "Breakfast",
    isVegetarian: true,
    available: true,
    maxQuantity: 4
  },
  {
    id: "2",
    name: "Garlic Naan",
    price: 80,
    description: "Soft bread with garlic and butter",
    image: "/lovable-uploads/ae78c791-371e-41a9-9e12-26ed7e77d4ad.png",
    category: "Bread",
    isVegetarian: true,
    available: true,
    maxQuantity: 4
  },
  {
    id: "3",
    name: "Chicken Biryani",
    price: 120,
    description: "Fragrant basmati rice with spiced chicken",
    image: "/lovable-uploads/009bbf96-f771-498c-9c6c-230ae4756456.png",
    category: "Main Course",
    isVegetarian: false,
    available: true,
    maxQuantity: 4
  },
  {
    id: "4",
    name: "Dal Makhani",
    price: 240,
    description: "Creamy black lentils slow-cooked to perfection",
    image: "/lovable-uploads/02a620f8-4e01-43f1-b72e-9cb0bc8254c9.png",
    category: "Main Course",
    isVegetarian: true,
    available: true,
    maxQuantity: 4
  },
  {
    id: "5",
    name: "Paneer Tikka",
    price: 290,
    description: "Grilled cottage cheese with spices and vegetables",
    image: "/lovable-uploads/00540110-545d-4558-bfea-ed795a87a2da.png",
    category: "Starter",
    isVegetarian: true,
    available: true,
    maxQuantity: 4
  },
  {
    id: "6",
    name: "Veg Thali",
    price: 120,
    description: "Complete meal with rice, dal, sabzi, roti, papad, and dessert",
    image: "/lovable-uploads/614f0e46-be75-4d62-a9c4-142d30b15597.png",
    category: "Main Course",
    isVegetarian: true,
    available: true,
    maxQuantity: 4
  },
  {
    id: "7",
    name: "Masala Chai",
    price: 40,
    description: "Indian spiced tea with milk",
    image: "/lovable-uploads/166db783-d305-43f5-b024-3996ba8cc716.png",
    category: "Beverages",
    isVegetarian: true,
    available: true,
    maxQuantity: 4
  }
];

// Function to fetch menu items from Supabase
export const fetchMenuItemsFromDB = async (): Promise<MenuItem[]> => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*');
    
    if (error) {
      console.error('Error fetching menu items:', error);
      return menuItems; // Return fallback data if Supabase fetch fails
    }
    
    // Transform the Supabase data to match our MenuItem type
    const transformedData: MenuItem[] = data.map(item => ({
      id: item.id.toString(),
      name: item.name,
      price: Number(item.price),
      description: item.description || "",
      image: item.image_url || "/placeholder.svg", 
      category: item.category || "Other",
      isVegetarian: item.is_vegetarian || false,
      available: item.available || true,
      maxQuantity: item.max_quantity || 4
    }));
    
    return transformedData.length > 0 ? transformedData : menuItems;
  } catch (error) {
    console.error('Error in fetchMenuItemsFromDB:', error);
    return menuItems; // Return fallback data on error
  }
};

// Get menu items (with option to fetch from DB)
export const getMenuItems = async (useDB: boolean = true): Promise<MenuItem[]> => {
  if (useDB) {
    return await fetchMenuItemsFromDB();
  }
  return menuItems;
};

// Get a menu item by ID 
export const getMenuItemById = async (id: string, useDB: boolean = true): Promise<MenuItem | undefined> => {
  if (useDB) {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('id', parseInt(id))
        .single();
      
      if (error || !data) {
        return menuItems.find(item => item.id === id);
      }
      
      return {
        id: data.id.toString(),
        name: data.name,
        price: Number(data.price),
        description: data.description || "",
        image: data.image_url || "/placeholder.svg",
        category: data.category || "Other",
        isVegetarian: data.is_vegetarian || false,
        available: data.available !== false,
        maxQuantity: data.max_quantity || 4
      };
    } catch (error) {
      console.error('Error in getMenuItemById:', error);
      return menuItems.find(item => item.id === id);
    }
  }
  return menuItems.find(item => item.id === id);
};

export const getMenuItemsByCategory = async (category: string, useDB: boolean = true): Promise<MenuItem[]> => {
  const items = await getMenuItems(useDB);
  return items.filter(item => item.category === category);
};

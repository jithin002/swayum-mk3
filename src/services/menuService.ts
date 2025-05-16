import { MenuItem } from "@/types";
import { supabase } from "@/integrations/supabase/client";

// Function to fetch menu items from Supabase
export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('category');
    
    if (error) {
      console.error('Error fetching menu items:', error);
      throw error;
    }
    
    // Transform the data to match our MenuItem type with both image_url and image (for backward compatibility)
    return data.map(item => ({
      id: item.id.toString(),
      name: item.name,
      description: item.description || "",
      price: Number(item.price),
      image_url: item.image_url || "/placeholder.svg",
      image: item.image_url || "/placeholder.svg", // For backward compatibility
      category: item.category || "Other",
      is_vegetarian: Boolean(item.is_vegetarian),
      isVegetarian: Boolean(item.is_vegetarian), // For backward compatibility
      available: item.available === undefined ? true : Boolean(item.available),
      maxQuantity: item.max_quantity || 4
    }));
    
  } catch (error) {
    console.error('Error in fetchMenuItems:', error);
    
    // Fallback to local data if API call fails
    const localItems = getLocalMenuItems();
    return localItems;
  }
};

// Function to get menu items - wrapper function for backward compatibility
export const getMenuItems = async (fromDB: boolean = true): Promise<MenuItem[]> => {
  if (fromDB) {
    return fetchMenuItems();
  } else {
    return getLocalMenuItems();
  }
};

// Function to fetch a specific menu item by ID from Supabase
export const fetchMenuItemById = async (id: string): Promise<MenuItem | null> => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('id', parseInt(id))
      .single();
    
    if (error) {
      console.error(`Error fetching menu item with ID ${id}:`, error);
      throw error;
    }
    
    if (!data) return null;
    
    return {
      id: data.id.toString(),
      name: data.name,
      description: data.description || "",
      price: Number(data.price),
      image_url: data.image_url || "/placeholder.svg",
      image: data.image_url || "/placeholder.svg", // For backward compatibility
      category: data.category || "Other",
      is_vegetarian: Boolean(data.is_vegetarian),
      isVegetarian: Boolean(data.is_vegetarian), // For backward compatibility
      available: data.available === undefined ? true : Boolean(data.available),
      maxQuantity: data.max_quantity || 4
    };
    
  } catch (error) {
    console.error(`Error in fetchMenuItemById for ID ${id}:`, error);
    
    // Fallback to local data if API call fails
    const localItems = getLocalMenuItems();
    return localItems.find(item => item.id === id) || null;
  }
};

// Function to get menu item by ID - wrapper function for backward compatibility
export const getMenuItemById = async (id: string, fromDB: boolean = true): Promise<MenuItem | null> => {
  if (fromDB) {
    return fetchMenuItemById(id);
  } else {
    const localItems = getLocalMenuItems();
    return localItems.find(item => item.id === id) || null;
  }
};

// Function to get menu items from local data (fallback)
export const getLocalMenuItems = (): MenuItem[] => {
  // Sample data for local development and fallback
  return [
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
  ] as MenuItem[];
};

// Function to fetch menu items by category
export const fetchMenuItemsByCategory = async (category: string): Promise<MenuItem[]> => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('category', category)
      .order('name');
    
    if (error) {
      console.error(`Error fetching menu items for category ${category}:`, error);
      throw error;
    }
    
    return data.map(item => ({
      id: item.id.toString(),
      name: item.name,
      description: item.description || "",
      price: Number(item.price),
      image_url: item.image_url || "/placeholder.svg",
      image: item.image_url || "/placeholder.svg", // For backward compatibility
      category: item.category || "Other",
      is_vegetarian: Boolean(item.is_vegetarian),
      isVegetarian: Boolean(item.is_vegetarian), // For backward compatibility
      available: item.available === undefined ? true : Boolean(item.available),
      maxQuantity: item.max_quantity || 4
    }));
    
  } catch (error) {
    console.error(`Error in fetchMenuItemsByCategory for category ${category}:`, error);
    
    // Fallback to local data filtered by category
    const localItems = getLocalMenuItems();
    return localItems.filter(item => item.category === category);
  }
};

// Function to search menu items
export const searchMenuItems = async (query: string): Promise<MenuItem[]> => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .ilike('name', `%${query}%`)
      .order('name');
    
    if (error) {
      console.error(`Error searching menu items for query ${query}:`, error);
      throw error;
    }
    
    return data.map(item => ({
      id: item.id.toString(),
      name: item.name,
      description: item.description || "",
      price: Number(item.price),
      image_url: item.image_url || "/placeholder.svg",
      image: item.image_url || "/placeholder.svg", // For backward compatibility
      category: item.category || "Other",
      is_vegetarian: Boolean(item.is_vegetarian),
      isVegetarian: Boolean(item.is_vegetarian), // For backward compatibility
      available: item.available === undefined ? true : Boolean(item.available),
      maxQuantity: item.max_quantity || 4
    }));
    
  } catch (error) {
    console.error(`Error in searchMenuItems for query ${query}:`, error);
    
    // Fallback to local data with filtering
    const localItems = getLocalMenuItems();
    const lowercaseQuery = query.toLowerCase();
    return localItems.filter(
      item => item.name.toLowerCase().includes(lowercaseQuery) || 
             (item.description && item.description.toLowerCase().includes(lowercaseQuery))
    );
  }
};

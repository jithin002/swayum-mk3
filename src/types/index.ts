
export interface CartItem extends MenuItem {
  quantity: number;
  pickupTime: string;
}

export interface Order {
  id: string;
  refId?: string;
  internalId?: string;
  items: CartItem[];
  totalAmount: number;
  orderDate: string;
  pickupTime: string;
  status: OrderStatus;
  orderCode: string;
  itemName?: string;
}

export interface OrderStatus {
  received: boolean;
  preparation: boolean;
  readyForPickup: boolean;
  completed: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  image?: string; // Added for backward compatibility
  category: string;
  is_vegetarian: boolean;
  isVegetarian?: boolean; // Added for backward compatibility
  available: boolean;
  maxQuantity?: number;
}

export interface ProfileData {
  name?: string;
  customerType?: 'student' | 'teacher' | 'other';
}

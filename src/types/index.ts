
export interface CartItem extends MenuItem {
  quantity: number;
  pickupTime: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  orderDate: string;
  pickupTime: string;
  status: OrderStatus;
  orderCode: string;
  itemName?: string; // Add itemName property
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
  category: string;
  is_vegetarian: boolean;
  available: boolean;
  maxQuantity?: number;
}

export interface ProfileData {
  name?: string;
  customerType?: 'student' | 'teacher' | 'other';
}

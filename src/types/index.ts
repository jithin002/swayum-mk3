
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  isVegetarian: boolean;
  available: boolean;
  maxQuantity: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
  pickupTime: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface OrderStatus {
  received: boolean;
  preparation: boolean;
  readyForPickup: boolean;
  completed: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  orderDate: string;
  pickupTime: string;
  status: OrderStatus;
}

export interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

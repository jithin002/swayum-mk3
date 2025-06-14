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
  refId?: string;
  items: CartItem[];
  totalAmount: number;
  orderDate: string;
  pickupTime: string;
  status: OrderStatus;
  orderCode?: string;
  /** The raw string status from the backend (e.g. "pending", "preparing", "ready", "completed") **/
  rawStatus?: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

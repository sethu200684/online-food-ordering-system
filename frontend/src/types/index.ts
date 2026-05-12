export interface User {
    id: number;
    name: string;
    email: string;
    role: 'ADMIN' | 'CUSTOMER';
}

export interface Category {
    id: number;
    name: string;
}

export interface FoodItem {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    status: 'AVAILABLE' | 'OUT_OF_STOCK';
    category: Category;
}

export interface CartItem {
    id: number;
    quantity: number;
    foodItem: FoodItem;
}

export interface Cart {
  id: number;
  cartItems: CartItem[];
}

export interface Order {
  id: number;
  orderDate: string;
  totalAmount: number;
  status: 'PLACED' | 'PREPARING' | 'DELIVERED' | 'CANCELLED';
  user: User;
}

export interface Payment {
  id: number;
  amount: number;
  paymentDate: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
}

export interface AuthResponse {
  token: string;
  role: string;
}
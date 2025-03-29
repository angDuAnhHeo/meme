
// Customer types
export type CustomerType = 'regular' | 'vip' | 'new';
export type MembershipLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'none';
export type Gender = 'male' | 'female' | 'other';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  gender: Gender;
  birthYear?: number;
  customerType: CustomerType;
  membershipLevel: MembershipLevel;
  createdAt: Date;
  totalOrders: number;
}

// Order types
export type OrderStatus = 'pending' | 'processing' | 'washing' | 'drying' | 'folding' | 'ready' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  serviceName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  createdAt: Date;
  estimatedCompletion: Date;
  shelfPosition?: string;
  note?: string;
}

// Inventory types
export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minQuantity: number;
  lastRestocked: Date;
}

// Promotion types
export interface Promotion {
  id: string;
  name: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  applicableServices: string[];
  minOrderAmount?: number;
}

// Invoice types
export interface Invoice {
  id: string;
  orderId: string;
  customerName: string;
  issueDate: Date;
  dueDate: Date;
  totalAmount: number;
  amountPaid: number;
  status: 'paid' | 'unpaid' | 'partial';
  paymentMethod?: 'cash' | 'card' | 'transfer';
}

// Delivery types
export interface Delivery {
  id: string;
  orderId: string;
  customerName: string;
  address: string;
  phone: string;
  scheduledDate: Date;
  status: 'pending' | 'in-transit' | 'delivered' | 'failed';
  driverName?: string;
  trackingNote?: string;
}

// Service types
export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  estimatedTimeHours: number;
  isActive: boolean;
}

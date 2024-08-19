import { User } from './user';

export interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  sellerId: number;
  vendor?: string;
  seller?: {
    id: number;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
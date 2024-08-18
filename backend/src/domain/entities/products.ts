export interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  sellerId: number;
  createdAt: Date;
  updatedAt: Date;
}

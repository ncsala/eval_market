import { Product } from "../../entities/products";

export interface ProductRepository {
  create(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product>;
  findBySellerId(sellerId: number): Promise<Product[]>;
  searchProducts(filters: {
    name?: string;
    sku?: string;
    minPrice?: number;
    maxPrice?: number;
    vendors?: string[];
  }): Promise<Product[]>;
  findAll(sellerId?: number): Promise<Product[]>;
  getMaxPrice(): Promise<number>;
  getVendors(): Promise<string[]>;
}
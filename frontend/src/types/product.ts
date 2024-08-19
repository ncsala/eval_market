export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  vendor?: string;
  sellerId?: number;
}

export interface SearchFilters {
  name?: string;
  sku?: string;
  minPrice?: number;
  maxPrice?: number;
  vendors?: string[];
}

export interface CreateProductDTO {
  name: string;
  sku: string;
  price: number;
  quantity: number;
  sellerId: number;
}
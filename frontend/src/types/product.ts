export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  imageUrl: string;
}

export interface SearchFilters {
  name: string;
  sku: string;
  minPrice: number;
  maxPrice: number;
}
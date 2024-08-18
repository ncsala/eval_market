import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1";

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  imageUrl: string;
}

export interface SearchFilters {
  name?: string;
  sku?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const productService = {
  async searchProducts(filters: SearchFilters): Promise<Product[]> {
    const response = await axios.get(`${API_URL}/products/search`, {
      params: filters,
    });
    return response.data;
  },
  async getMaxPrice(): Promise<number> {
    const response = await axios.get(`${API_URL}/products/max-price`);
    return response.data.maxPrice;
  },
};

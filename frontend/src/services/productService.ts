import axios from "axios";
import { Product, SearchFilters, CreateProductDTO } from "@/types/product";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1";

export const productService = {
  async searchProducts(filters: SearchFilters): Promise<Product[]> {
    const response = await axios.get(`${API_URL}/products/search`, {
      params: {
        ...filters,
        vendors: filters.vendors?.join(',')
      },
    });
    return response.data;
  },

  async getMaxPrice(): Promise<number> {
    const response = await axios.get(`${API_URL}/products/max-price`);
    return response.data.maxPrice;
  },

  async getVendors(): Promise<string[]> {
    try {
      const response = await axios.get(`${API_URL}/products/vendors`);
      console.log("Vendors API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching vendors:", error);
      throw error;
    }
  },

  async createProduct(productData: CreateProductDTO): Promise<Product> {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).token : null;
    
    if (!token) {
      throw new Error('No se encontró token de autenticación');
    }

    const response = await axios.post(`${API_URL}/products`, productData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  },

  async getSellerProducts(): Promise<Product[]> {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).token : null;
    
    if (!token) {
      throw new Error('No se encontró token de autenticación');
    }

    const response = await axios.get(`${API_URL}/products`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  },
};

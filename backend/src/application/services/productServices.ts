import { ProductRepository } from "../../domain/ports/repositories/productRepository";
import { Product } from "../../domain/entities/products";
import { AppError } from "../../infrastructure/adapters/http/middlewares/errorMiddleware";

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    if (!productData.name || !productData.sku || productData.quantity === undefined || !productData.price) {
      throw new AppError("Todos los campos son requeridos", 400);
    }
    return this.productRepository.create(productData);
  }

  async getProductsBySellerId(sellerId: number): Promise<Product[]> {
    return this.productRepository.findBySellerId(sellerId);
  }

  async searchProducts(filters: {
    name?: string;
    sku?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Product[]> {
    return this.productRepository.searchProducts(filters);
  }

  async getAllProducts(sellerId?: string): Promise<Product[]> {
    return this.productRepository.findAll(sellerId ? parseInt(sellerId) : undefined);
  }

  async getMaxPrice(): Promise<number> {
    return this.productRepository.getMaxPrice();
  }
}
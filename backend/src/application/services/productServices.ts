import { ProductRepository } from "../../domain/ports/repositories/productRepository";
import { Product } from "../../domain/entities/products";
import { AppError } from "../../infrastructure/adapters/http/middlewares/errorMiddleware";
import { UserRepository } from "../../domain/ports/repositories/userRepository";

export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private userRepository: UserRepository
  ) {}

  async createProduct(
    productData: Omit<Product, "id" | "createdAt" | "updatedAt" | "vendor">,
    sellerId: number
  ): Promise<Product> {
    if (
      !productData.name ||
      !productData.sku ||
      productData.quantity === undefined ||
      !productData.price
    ) {
      throw new AppError("Todos los campos son requeridos", 400);
    }

    const seller = await this.userRepository.findById(sellerId);
    if (!seller) {
      throw new AppError("Vendedor no encontrado", 404);
    }

    // Extraer el vendor del email del usuario
    const vendor = seller.email.split("@")[0];

    return this.productRepository.create({
      ...productData,
      sellerId,
      vendor,
    });
  }

  async getProductsBySellerId(sellerId: number): Promise<Product[]> {
    return this.productRepository.findBySellerId(sellerId);
  }

  async searchProducts(filters: {
    name?: string;
    sku?: string;
    minPrice?: number;
    maxPrice?: number;
    vendors?: string[];
  }): Promise<Product[]> {
    return this.productRepository.searchProducts(filters);
  }

  async getVendors(): Promise<string[]> {
    return this.productRepository.getVendors();
  }

  async getAllProducts(sellerId?: string): Promise<Product[]> {
    return this.productRepository.findAll(
      sellerId ? parseInt(sellerId) : undefined
    );
  }

  async getMaxPrice(): Promise<number> {
    return this.productRepository.getMaxPrice();
  }
}

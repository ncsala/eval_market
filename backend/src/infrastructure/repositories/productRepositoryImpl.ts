import { ProductRepository } from "../../domain/ports/repositories/productRepository";
import ProductModel from "../models/product";
import { Product } from "../../domain/entities/products";
import { Op } from "sequelize";

export class ProductRepositoryImpl implements ProductRepository {
  async create(
    productData: Omit<Product, "id" | "createdAt" | "updatedAt">
  ): Promise<Product> {
    const product = await ProductModel.create(productData);
    return this.mapToProduct(product);
  }

  private mapToProduct(productModel: ProductModel): Product {
    return {
      id: productModel.id,
      name: productModel.name,
      sku: productModel.sku,
      quantity: productModel.quantity,
      price: productModel.price,
      sellerId: productModel.sellerId,
      createdAt: productModel.createdAt,
      updatedAt: productModel.updatedAt,
    };
  }

  async findBySellerId(sellerId: number): Promise<Product[]> {
    const products = await ProductModel.findAll({ where: { sellerId } });
    return products.map(this.mapToProduct);
  }

  async searchProducts(filters: {
    name?: string;
    sku?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Product[]> {
    const where: any = {};
    if (filters.name) where.name = { [Op.iLike]: `%${filters.name}%` };
    if (filters.sku) where.sku = { [Op.iLike]: `%${filters.sku}%` };
    if (filters.minPrice !== undefined)
      where.price = { ...where.price, [Op.gte]: filters.minPrice };
    if (filters.maxPrice !== undefined)
      where.price = { ...where.price, [Op.lte]: filters.maxPrice };

    const products = await ProductModel.findAll({ where });
    return products.map(this.mapToProduct);
  }

  async findAll(sellerId?: number): Promise<Product[]> {
    const where = sellerId ? { sellerId } : {};
    const products = await ProductModel.findAll({ where });
    return products.map(this.mapToProduct);
  }
}

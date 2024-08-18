import { ProductRepository } from "../../domain/ports/repositories/productRepository";
import ProductModel from "../models/product";
import { Product } from "../../domain/entities/products";
import { Op, Sequelize } from "sequelize";

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

  async findAll(sellerId?: number): Promise<Product[]> {
    const where = sellerId ? { sellerId } : {};
    const products = await ProductModel.findAll({ where });
    return products.map(this.mapToProduct);
  }

  async searchProducts(filters: {
    name?: string;
    sku?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Product[]> {
    console.log("Searching with filters:", filters);

    const where: any = {};

    // Búsqueda por nombre O SKU
    if (filters.name || filters.sku) {
      where[Op.or] = [];
      if (filters.name) {
        where[Op.or].push({ name: { [Op.iLike]: `%${filters.name}%` } });
      }
      if (filters.sku) {
        where[Op.or].push({ sku: { [Op.iLike]: `%${filters.sku}%` } });
      }
    }

    // Filtro de precio
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.price = {};
      if (filters.minPrice !== undefined) {
        where.price[Op.gte] = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        where.price[Op.lte] = filters.maxPrice;
      }
    }

    console.log("Generated where clause:", JSON.stringify(where, null, 2));

    const products = await ProductModel.findAll({ where });
    console.log(
      "Found products:",
      products.map((p) => ({
        id: p.id,
        name: p.name,
        sku: p.sku,
        price: p.price,
      }))
    );

    return products.map(this.mapToProduct);
  }

  async getMaxPrice(): Promise<number> {
    const result = await ProductModel.findOne({
      attributes: [[Sequelize.fn('MAX', Sequelize.col('price')), 'maxPrice']],
      raw: true,
    });
    return (result as any)?.maxPrice || 0;
  }
}

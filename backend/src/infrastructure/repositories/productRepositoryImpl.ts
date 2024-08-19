import { ProductRepository } from "../../domain/ports/repositories/productRepository";
import ProductModel from "../models/product";
import { Product } from "../../domain/entities/products";
import { Op, Sequelize } from "sequelize";
import User from "../models/user";

export class ProductRepositoryImpl implements ProductRepository {
  async create(
    productData: Omit<Product, "id" | "createdAt" | "updatedAt">
  ): Promise<Product> {
    const product = await ProductModel.create(productData);
    return this.mapToProduct(product);
  }

  private mapToProduct(productModel: ProductModel): Product {
    const product: Product = {
      id: productModel.id,
      name: productModel.name,
      sku: productModel.sku,
      quantity: productModel.quantity,
      price: productModel.price,
      sellerId: productModel.sellerId,
      createdAt: productModel.createdAt,
      updatedAt: productModel.updatedAt,
    };

    if (productModel.vendor) {
      product.vendor = productModel.vendor;
    }

    if (productModel.get('seller')) {
      const seller = productModel.get('seller') as User;
      product.seller = {
        id: seller.id,
        email: seller.email,
      };
    }

    return product;
  }

  async findBySellerId(sellerId: number): Promise<Product[]> {
    const products = await ProductModel.findAll({
      where: { sellerId },
      include: [{ model: User, as: "seller", attributes: ["id", "email"] }]
    });
    return products.map(this.mapToProduct);
  }

  async findAll(sellerId?: number): Promise<Product[]> {
    const where = sellerId ? { sellerId } : {};
    const products = await ProductModel.findAll({
      where,
      include: [{ model: User, as: "seller", attributes: ["id", "email"] }],
    });
    return products.map(this.mapToProduct);
  }

  async searchProducts(filters: {
    name?: string;
    sku?: string;
    minPrice?: number;
    maxPrice?: number;
    vendors?: string[];
  }): Promise<Product[]> {
    const where: any = {};

    if (filters.name || filters.sku) {
      where[Op.or] = [];
      if (filters.name) {
        where[Op.or].push({ name: { [Op.iLike]: `%${filters.name}%` } });
      }
      if (filters.sku) {
        where[Op.or].push({ sku: { [Op.iLike]: `%${filters.sku}%` } });
      }
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.price = {};
      if (filters.minPrice !== undefined) {
        where.price[Op.gte] = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        where.price[Op.lte] = filters.maxPrice;
      }
    }

    if (filters.vendors && filters.vendors.length > 0) {
      where[Op.or] = [
        { vendor: { [Op.in]: filters.vendors } },
        { vendor: null },
      ];
    }

    const products = await ProductModel.findAll({
      where,
      include: [{ model: User, as: "seller", attributes: ["id", "email"] }]
    });
    return products.map(this.mapToProduct);
  }

  async getVendors(): Promise<string[]> {
    const vendors = await ProductModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("vendor")), "vendor"],
      ],
      raw: true,
    });
    return vendors.map((v: any) => v.vendor).filter((v: string | null) => v !== null);
  }

  async getMaxPrice(): Promise<number> {
    const result = await ProductModel.findOne({
      attributes: [[Sequelize.fn("MAX", Sequelize.col("price")), "maxPrice"]],
      raw: true,
    });
    return (result as any)?.maxPrice || 0;
  }
}
import { Request, Response, NextFunction } from "express";
import { ProductService } from "../../../../application/services/productServices";
import { AuthenticatedRequest } from "../../../../types/express/authenticatedRequest";

export class ProductController {
  constructor(private productService: ProductService) {}

  async createProduct(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, sku, quantity, price } = req.body;
      const sellerId = req.user.id;

      const product = await this.productService.createProduct(
        { name, sku, quantity, price, sellerId },
        sellerId
      );
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  async getSellerProducts(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const sellerId = req.user.id;
      const products = await this.productService.getProductsBySellerId(
        sellerId
      );
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async searchProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, sku, minPrice, maxPrice, vendors } = req.query;

      const filters: any = {};
      if (name) filters.name = name as string;
      if (sku) filters.sku = sku as string;
      if (minPrice !== undefined)
        filters.minPrice = parseFloat(minPrice as string);
      if (maxPrice !== undefined)
        filters.maxPrice = parseFloat(maxPrice as string);
      if (vendors) filters.vendors = (vendors as string).split(",");

      const products = await this.productService.searchProducts(filters);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async getVendors(req: Request, res: Response, next: NextFunction) {
    try {
      const vendors = await this.productService.getVendors();
      res.json(vendors);
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { sellerId } = req.query;
      const products = await this.productService.getAllProducts(
        sellerId as string | undefined
      );
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async getMaxPrice(req: Request, res: Response, next: NextFunction) {
    try {
      const maxPrice = await this.productService.getMaxPrice();
      res.json({ maxPrice });
    } catch (error) {
      next(error);
    }
  }
}

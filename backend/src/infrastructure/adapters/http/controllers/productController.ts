import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../../../../application/services/productServices';
import { AuthenticatedRequest } from '../../../../types/express/authenticatedRequest';

export class ProductController {
  constructor(private productService: ProductService) {}

  async createProduct(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { name, sku, quantity, price } = req.body;
      const sellerId = req.user.id;

      const product = await this.productService.createProduct({ name, sku, quantity, price, sellerId });
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  async getSellerProducts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const sellerId = req.user.id;
      const products = await this.productService.getProductsBySellerId(sellerId);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async searchProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, sku, minPrice, maxPrice } = req.query;
      const products = await this.productService.searchProducts({
        name: name as string | undefined,
        sku: sku as string | undefined,
        minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined
      });
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { sellerId } = req.query;
      const products = await this.productService.getAllProducts(sellerId as string | undefined);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
}
import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { ProductService } from '../../../../application/services/productServices';
import { ProductRepositoryImpl } from '../../../repositories/productRepositoryImpl';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleValidationMiddleware';
import { UserRole } from '../../../../domain/entities/userRoles';

const router = Router();
const productRepository = new ProductRepositoryImpl();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.post('/products', authMiddleware, roleMiddleware([UserRole.VENDEDOR]), (req, res, next) => productController.createProduct(req as any, res, next));
router.get('/products', authMiddleware, roleMiddleware([UserRole.VENDEDOR]), (req, res, next) => productController.getSellerProducts(req as any, res, next));
router.get('/products/search', (req, res, next) => productController.searchProducts(req, res, next));
router.get('/products/all', authMiddleware, roleMiddleware([UserRole.ADMINISTRADOR]), (req, res, next) => productController.getAllProducts(req, res, next));

export default router;
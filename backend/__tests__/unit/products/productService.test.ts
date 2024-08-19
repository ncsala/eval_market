import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ProductService } from '../../../src/application/services/productServices';
import { ProductRepository } from '../../../src/domain/ports/repositories/productRepository';
import { UserRepository } from '../../../src/domain/ports/repositories/userRepository';
import { Product } from '../../../src/domain/entities/products';
import { User } from '../../../src/domain/entities/user';
import { AppError } from '../../../src/infrastructure/adapters/http/middlewares/errorMiddleware';
import { UserRole } from '../../../src/domain/entities/userRoles';


describe('ProductService', () => {
  let productService: ProductService;
  let mockProductRepository: jest.Mocked<ProductRepository>;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockProductRepository = {
      create: jest.fn(),
      findBySellerId: jest.fn(),
      searchProducts: jest.fn(),
      findAll: jest.fn(),
      getMaxPrice: jest.fn(),
      getVendors: jest.fn(),
    } as jest.Mocked<ProductRepository>;

    mockUserRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    } as jest.Mocked<UserRepository>;

    productService = new ProductService(mockProductRepository, mockUserRepository);
  });

  describe('createProduct', () => {
    it('should create a product successfully', async () => {
      const mockUser: User = { id: 1, email: 'seller@test.com', role: UserRole.VENDEDOR };
      const productData: Omit<Product, "id" | "createdAt" | "updatedAt" | "vendor" | "sellerId"> = {
        name: 'Test Product',
        sku: 'TEST-123',
        price: 99.99,
        quantity: 10,
      };
      const sellerId = 1;
      const expectedProduct: Product = {
        ...productData,
        id: 1,
        sellerId,
        vendor: 'seller',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockProductRepository.create.mockResolvedValue(expectedProduct);

      const result = await productService.createProduct(productData as any, sellerId);

      expect(result).toEqual(expect.objectContaining({
        ...productData,
        id: expect.anything(), // Acepta cualquier valor para id
        sellerId,
        vendor: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }));
      expect(mockUserRepository.findById).toHaveBeenCalledWith(sellerId);
      expect(mockProductRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        ...productData,
        sellerId,
      }));
    });

    it('should throw an error if seller is not found', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      const productData: Omit<Product, "id" | "createdAt" | "updatedAt" | "vendor" | "sellerId"> = {
        name: 'Test Product',
        sku: 'TEST-123',
        price: 99.99,
        quantity: 10,
      };
      const sellerId = 1;

      await expect(productService.createProduct(productData as any, sellerId)).rejects.toThrow(AppError);
    });
  });
});
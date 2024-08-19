import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ProductService } from '../../../src/application/services/productServices';
import { ProductRepository } from '../../../src/domain/ports/repositories/productRepository';
import { UserRepository } from '../../../src/domain/ports/repositories/userRepository';
import { Product } from '../../../src/domain/entities/products';

describe('ProductService - Search', () => {
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

    mockUserRepository = {} as jest.Mocked<UserRepository>;

    productService = new ProductService(mockProductRepository, mockUserRepository);
  });

  describe('searchProducts', () => {
    it('should return products based on search filters', async () => {
      const mockProducts: Product[] = [
        { id: 1, name: 'Product 1', sku: 'SKU1', price: 10, quantity: 5, sellerId: 1, createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: 'Product 2', sku: 'SKU2', price: 20, quantity: 10, sellerId: 2, createdAt: new Date(), updatedAt: new Date() },
      ];
      mockProductRepository.searchProducts.mockResolvedValue(mockProducts);

      const filters = { name: 'Product', minPrice: 5, maxPrice: 25 };
      const result = await productService.searchProducts(filters);

      expect(result).toEqual(mockProducts);
      expect(mockProductRepository.searchProducts).toHaveBeenCalledWith(filters);
    });
  });

  describe('getMaxPrice', () => {
    it('should return the maximum price of all products', async () => {
      mockProductRepository.getMaxPrice.mockResolvedValue(100);

      const result = await productService.getMaxPrice();

      expect(result).toBe(100);
      expect(mockProductRepository.getMaxPrice).toHaveBeenCalled();
    });
  });

  describe('getVendors', () => {
    it('should return a list of all vendors', async () => {
      const mockVendors = ['Vendor1', 'Vendor2'];
      mockProductRepository.getVendors.mockResolvedValue(mockVendors);

      const result = await productService.getVendors();

      expect(result).toEqual(mockVendors);
      expect(mockProductRepository.getVendors).toHaveBeenCalled();
    });
  });
});
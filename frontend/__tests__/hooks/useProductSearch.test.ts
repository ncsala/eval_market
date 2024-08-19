import { renderHook, act } from '@testing-library/react';
import { useProductSearch } from '../../src/hooks/useProductSearch';
import { productService } from '../../src/services/productService';

// Mock del servicio de productos
jest.mock('../../src/services/productService', () => ({
  productService: {
    searchProducts: jest.fn(),
    getMaxPrice: jest.fn(),
  },
}));

describe('useProductSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useProductSearch());

    expect(result.current.filters).toEqual({
      name: '',
      sku: '',
      minPrice: 0,
      maxPrice: 1000,
    });
    expect(result.current.searchTerm).toBe('');
    expect(result.current.maxPrice).toBe(1000);
  });

  it('should update search term', async () => {
    const { result } = renderHook(() => useProductSearch());

    act(() => {
      result.current.updateSearch('test product');
    });

    // Esperamos a que se aplique el debounce
    await new Promise((r) => setTimeout(r, 500));

    expect(result.current.searchTerm).toBe('test product');
    expect(result.current.filters.name).toBe('test product');
    expect(result.current.filters.sku).toBe('test product');
  });

  it('should update price range', () => {
    const { result } = renderHook(() => useProductSearch());

    act(() => {
      result.current.updatePriceRange(10, 500);
    });

    expect(result.current.filters.minPrice).toBe(10);
    expect(result.current.filters.maxPrice).toBe(500);
  });

  it('should reset filters', () => {
    const { result } = renderHook(() => useProductSearch());

    act(() => {
      result.current.updateSearch('test');
      result.current.updatePriceRange(10, 500);
      result.current.resetFilters();
    });

    expect(result.current.filters).toEqual({
      name: '',
      sku: '',
      minPrice: 0,
      maxPrice: 1000,
    });
    expect(result.current.searchTerm).toBe('');
  });

  // Puedes agregar más tests aquí para cubrir otros aspectos del hook
});
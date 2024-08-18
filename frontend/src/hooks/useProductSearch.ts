import { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash/debounce';
import { productService } from '@/services/productService';
import { SearchFilters } from '@/types';

export const useProductSearch = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    name: '',
    sku: '',
    minPrice: 0,
    maxPrice: 1000,
  });
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    productService.getMaxPrice().then(setMaxPrice);
  }, []);

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setFilters(prev => ({ ...prev, name: term, sku: term }));
    }, 500),
    []
  );

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.searchProducts(filters),
    placeholderData: (previousData) => previousData,
  });

  const updateSearch = useCallback((term: string) => {
    setSearchTerm(term);
    debouncedSearch(term);
  }, [debouncedSearch]);

  const updatePriceRange = useCallback((minPrice: number, maxPrice: number) => {
    setFilters(prev => ({ ...prev, minPrice, maxPrice }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      name: '',
      sku: '',
      minPrice: 0,
      maxPrice: maxPrice,
    });
    setSearchTerm('');
  }, [maxPrice]);

  return { 
    products, 
    isLoading, 
    error, 
    filters, 
    updateSearch, 
    updatePriceRange, 
    maxPrice, 
    searchTerm,
    resetFilters
  };
};
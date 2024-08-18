import React, { useState, useEffect } from 'react';
import { Box, Typography, Input, Slider } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import { ProductGrid } from '../../components/ProductGrid';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { useProductSearch } from '../../hooks/useProductSearch';

const Home: React.FC = () => {
  const { 
    products, 
    isLoading, 
    error, 
    filters, 
    updateSearch, 
    updatePriceRange, 
    maxPrice, 
    searchTerm 
  } = useProductSearch();
  
  const [localPriceRange, setLocalPriceRange] = useState([0, maxPrice]);

  useEffect(() => {
    setLocalPriceRange([filters.minPrice, filters.maxPrice]);
  }, [filters.minPrice, filters.maxPrice]);

  useEffect(() => {
    setLocalPriceRange(prev => [prev[0], maxPrice]);
  }, [maxPrice]);

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setLocalPriceRange(newValue as number[]);
  };

  const handlePriceChangeCommitted = () => {
    updatePriceRange(localPriceRange[0], localPriceRange[1]);
  };

  return (
    <Box sx={{ display: 'flex', p: 2 }}>
      {/* Filtros */}
      <Box sx={{ width: 200, mr: 4 }}>
        <Typography level="h4" gutterBottom>Filtros</Typography>
        <Typography gutterBottom>Rango de precios</Typography>
        <Slider
          getAriaLabel={() => 'Rango de precios'}
          value={localPriceRange}
          onChange={handlePriceChange}
          onChangeCommitted={handlePriceChangeCommitted}
          valueLabelDisplay="auto"
          min={0}
          max={maxPrice}
        />
        <Typography>${localPriceRange[0]} - ${localPriceRange[1]}</Typography>
      </Box>

      {/* Contenido principal */}
      <Box sx={{ flexGrow: 1 }}>
        <Input
          endDecorator={<SearchIcon />}
          placeholder="Buscar por nombre y/o SKU"
          value={searchTerm}
          onChange={(e) => updateSearch(e.target.value)}
          sx={{ width: '100%', mb: 2 }}
        />

        <ErrorBoundary>
          <ProductGrid products={products} isLoading={isLoading} error={error} />
        </ErrorBoundary>
      </Box>
    </Box>
  );
};

export default Home;
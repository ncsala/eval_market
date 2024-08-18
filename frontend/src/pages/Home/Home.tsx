import React, { useState } from 'react';
import { Box, Typography, Input, Slider, Button, Grid, Card, AspectRatio } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  imageUrl: string;
}

const mockProducts: Product[] = [
  { id: '1', name: 'Product name 01', sku: 'PRDCT-NM-01', price: 100.00, imageUrl: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Product name 02', sku: 'PRDCT-NM-02', price: 150.00, imageUrl: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Product name 03', sku: 'PRDCT-NM-03', price: 225.00, imageUrl: 'https://via.placeholder.com/150' },
  { id: '4', name: 'Product name 04', sku: 'PRDCT-NM-04', price: 230.00, imageUrl: 'https://via.placeholder.com/150' },
];

const Home: React.FC = () => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSearchTerm('');
  };

  const filteredProducts = mockProducts.filter(product => 
    product.price >= priceRange[0] && 
    product.price <= priceRange[1] &&
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box sx={{ display: 'flex', p: 2 }}>
      {/* Filtros */}
      <Box sx={{ width: 200, mr: 4 }}>
        <Typography level="h4" gutterBottom>Filtros</Typography>
        <Typography gutterBottom>Rango de precios</Typography>
        <Slider
          getAriaLabel={() => 'Rango de precios'}
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
        <Typography>${priceRange[0]} - ${priceRange[1]}</Typography>
        <Button variant="plain" color="neutral" onClick={clearFilters} sx={{ mt: 2 }}>
          Borrar filtros
        </Button>
      </Box>

      {/* Contenido principal */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Buscador */}
        <Input
          startDecorator={<SearchIcon />}
          placeholder="Buscar por nombre y/o SKU"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: '100%', mb: 2 }}
        />

        {/* Línea separadora */}
        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', mb: 2 }} />

        {/* Grid de productos */}
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid key={product.id} xs={12} sm={6} md={3}>
              <Card variant="outlined">
                <AspectRatio ratio="1">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    loading="lazy"
                  />
                </AspectRatio>
                <Box sx={{ p: 2 }}>
                  <Typography level="title-md">{product.name}</Typography>
                  <Typography level="body-sm">{product.sku}</Typography>
                  <Typography level="body-md">${product.price.toFixed(2)}</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
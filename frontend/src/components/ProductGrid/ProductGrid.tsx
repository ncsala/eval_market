import React from 'react';
import { Grid, Card, AspectRatio, Box, Typography, CircularProgress } from '@mui/joy';
import { Product } from '@/types';

interface ProductGridProps {
  products: Product[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading, error }) => {
  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="danger">{error.message}</Typography>;
  if (!products || products.length === 0) return <Typography>No se encontraron productos.</Typography>;

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid key={product.id} xs={12} sm={6} md={3}>
          <Card variant="outlined">
            <AspectRatio ratio="1">
              <img
                src={product.imageUrl || 'https://via.placeholder.com/150'}
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
  );
};

export default ProductGrid;
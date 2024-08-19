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
          <Card 
            variant="outlined" 
            sx={{
              height: '100%',
              minHeight: '290px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <AspectRatio ratio="1" sx={{ flexGrow: 1 }}>
              <img
                src={product.imageUrl || 'https://via.placeholder.com/150'}
                alt={product.name}
                loading="lazy"
              />
            </AspectRatio>
            <Box sx={{ p: 2, flexGrow: 0 }}>
              <Typography 
                level="title-md" 
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  ...(product.name.length > 20 && { fontSize: 'smaller' })
                }}
              >
                {product.name}
              </Typography>
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
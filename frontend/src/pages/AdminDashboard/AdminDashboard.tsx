import React, { useState } from 'react';
import { Box, Typography, Chip, Autocomplete, Sheet, Grid, Card, AspectRatio, Checkbox, FormControl, FormLabel } from '@mui/joy';
import ClearIcon from '@mui/icons-material/Clear';
import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import { Product } from '../../types/product';

const vendors = ['Amazon', 'Bananero', 'C-Vendor', 'X-Vendor', 'Y-Vendor'];

const AdminDashboard: React.FC = () => {
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products', selectedVendors, searchTerm],
    queryFn: () => productService.searchProducts({ name: searchTerm }),
  });

  const filteredProducts = products?.filter(product => 
    selectedVendors.length === 0 || selectedVendors.includes(product.name.split(' ')[0])
  );

  return (
    <Box sx={{ display: 'flex', p: 2 }}>
      {/* Filtros */}
      <Sheet sx={{ width: 200, mr: 4, p: 2 }}>
        <Typography level="h4" gutterBottom>Filtros</Typography>
        <FormControl>
          <FormLabel>Proveedores</FormLabel>
          {vendors.map((vendor) => (
            <Checkbox
              key={vendor}
              label={vendor}
              checked={selectedVendors.includes(vendor)}
              onChange={(event) => {
                if (event.target.checked) {
                  setSelectedVendors([...selectedVendors, vendor]);
                } else {
                  setSelectedVendors(selectedVendors.filter(v => v !== vendor));
                }
              }}
            />
          ))}
        </FormControl>
      </Sheet>

      {/* Contenido principal */}
      <Box sx={{ flexGrow: 1 }}>
        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={searchTerm ? [searchTerm] : []}
          onChange={(_, newValue) => {
            setSearchTerm(newValue[newValue.length - 1] || '');
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="soft"
                color="primary"
                endDecorator={<ClearIcon fontSize="small" />}
                {...getTagProps({ index })}
              >
                {option}
              </Chip>
            ))
          }
          sx={{ width: '100%', mb: 2 }}
        />

        {isLoading && <Typography>Cargando productos...</Typography>}
        {error && <Typography color="danger">Error al cargar los productos</Typography>}
        
        <Grid container spacing={2}>
          {filteredProducts?.map((product) => (
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
      </Box>
    </Box>
  );
};

export default AdminDashboard;
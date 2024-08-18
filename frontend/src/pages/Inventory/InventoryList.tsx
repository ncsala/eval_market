import React, { useState } from 'react';
import { Box, Button, Typography, Table, Sheet } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
}

const mockProducts: Product[] = [
  { id: '1', name: 'Product Name 01', sku: 'PRDCT-NM-01', quantity: 20 },
  { id: '2', name: 'Product Name 02', sku: 'PRDCT-NM-02', quantity: 10 },
  { id: '3', name: 'Product Name 03', sku: 'PRDCT-NM-03', quantity: 30 },
];

const InventoryList: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateProduct = () => {
    navigate('/inventory/create');
  };

  return (
    <Box sx={{ p: 2, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button onClick={handleCreateProduct}>CREAR</Button>
      </Box>
      <Sheet
        variant="outlined"
        sx={{
          width: '100%',
          borderRadius: 'sm',
          boxShadow: 'sm',
          overflow: 'auto',
          '--TableCell-height': '40px',
        }}
      >
        <Table
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Nombre del producto</th>
              <th style={{ width: '30%' }}>SKU</th>
              <th style={{ width: '30%' }}>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  );
};

export default InventoryList;
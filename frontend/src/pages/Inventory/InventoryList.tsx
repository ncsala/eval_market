import React from "react";
import {
  Box,
  Button,
  Table,
  Sheet,
  Typography,
  CircularProgress,
} from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import { Product } from "@/types/product";

const InventoryList: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ["sellerProducts"],
    queryFn: productService.getSellerProducts,
  });

  const handleCreateProduct = () => {
    navigate("/inventory/create");
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="danger">{error.message}</Typography>;

  return (
    <Box sx={{ p: 2, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button onClick={handleCreateProduct}>CREAR</Button>
      </Box>
      <Sheet
        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: "sm",
          boxShadow: "sm",
          overflow: "auto",
          "--TableCell-height": "40px",
        }}
      >
        <Table
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th style={{ width: "30%" }}>Nombre del producto</th>
              <th style={{ width: "20%" }}>SKU</th>
              <th style={{ width: "20%" }}>Cantidad</th>
              <th style={{ width: "20%" }}>Precio</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price.toFixed(2)}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  );
};

export default InventoryList;

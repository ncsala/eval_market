import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Chip,
  Sheet,
  Grid,
  Card,
  AspectRatio,
  Checkbox,
  FormControl,
  FormLabel,
  CircularProgress,
  Link,
  Divider,
  ChipDelete,
} from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services";
import { Product } from "@/types";

const AdminDashboard: React.FC = () => {
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [vendors, setVendors] = useState<string[]>([]);

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery<Product[]>({
    queryKey: ["adminProducts", selectedVendors],
    queryFn: () =>
      productService.searchProducts({
        vendors: selectedVendors,
      }),
  });

  const {
    data: vendorsList,
    isLoading: vendorsLoading,
    error: vendorsError,
  } = useQuery<string[]>({
    queryKey: ["vendors"],
    queryFn: productService.getVendors,
  });

  useEffect(() => {
    if (vendorsList) {
      setVendors(vendorsList);
    }
  }, [vendorsList]);

  const handleVendorToggle = (vendor: string) => {
    setSelectedVendors((prev) =>
      prev.includes(vendor)
        ? prev.filter((v) => v !== vendor)
        : [...prev, vendor]
    );
  };

  const resetFilters = () => {
    setSelectedVendors([]);
  };

  const handleDeleteVendor = (vendorToDelete: string) => {
    setSelectedVendors((prev) =>
      prev.filter((vendor) => vendor !== vendorToDelete)
    );
  };

  if (productsLoading || vendorsLoading) return <CircularProgress />;
  if (productsError || vendorsError)
    return <Typography color="danger">Error al cargar los datos</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mb: 2,
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <Typography level="h4" sx={{ mr: 2 }}>
          Administrador
        </Typography>
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", width: "100%", mb: 2 }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: 200, mr: 4, flexShrink: 0 }}></Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {selectedVendors.map((vendor) => (
              <Chip
                key={vendor}
                size="sm"
                variant="outlined"
                color="neutral"
                endDecorator={
                  <ChipDelete onDelete={() => handleDeleteVendor(vendor)} />
                }
              >
                {vendor}
              </Chip>
            ))}
          </Box>
        </Box>

        <Divider
          sx={{
            mt: 2,
            borderWidth: "2px",
          }}
        />
      </Box>

      {/* Filtros */}
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box sx={{ width: 200, mr: 4, mt: 4, flexShrink: 0 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography level="h4">Filtros</Typography>
            <Link
              component="button"
              underline="none"
              color="danger"
              onClick={resetFilters}
              sx={{ fontSize: "sm" }}
            >
              Borrar
            </Link>
          </Box>
          <Sheet sx={{ width: 200, mr: 4, p: 2 }}>
            <FormControl>
              <FormLabel>Proveedores</FormLabel>
              {vendors.map((vendor) => (
                <Checkbox
                  key={vendor}
                  label={vendor}
                  checked={selectedVendors.includes(vendor)}
                  onChange={() => handleVendorToggle(vendor)}
                  sx={{ mb: 1 }}
                />
              ))}
            </FormControl>
          </Sheet>
        </Box>

        {/* Contenido principal */}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {products?.map((product) => (
              <Grid key={product.id} xs={12} sm={6} md={3}>
                <Card variant="outlined">
                  <AspectRatio ratio="1">
                    <img
                      src={
                        product.imageUrl || "https://via.placeholder.com/150"
                      }
                      alt={product.name}
                      loading="lazy"
                    />
                  </AspectRatio>
                  <Box sx={{ p: 2 }}>
                    <Typography level="title-md">{product.name}</Typography>
                    <Typography level="body-sm">{product.sku}</Typography>
                    <Typography level="body-md">
                      ${product.price.toFixed(2)}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;

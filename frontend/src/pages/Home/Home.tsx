import React, { useState, useEffect } from "react";
import { Box, Typography, Input, Slider, Divider, Link } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import { ProductGrid, ErrorBoundary } from "@/components";
import { useProductSearch } from "@/hooks";

const Home: React.FC = () => {
  const {
    products,
    isLoading,
    error,
    filters,
    updateSearch,
    updatePriceRange,
    maxPrice,
    searchTerm,
    resetFilters,
  } = useProductSearch();

  const [localPriceRange, setLocalPriceRange] = useState([0, maxPrice]);

  useEffect(() => {
    const minPrice = filters.minPrice ?? 0;
    const maxPrice = filters.maxPrice ?? localPriceRange[1];
    setLocalPriceRange([minPrice, maxPrice]);
  }, [filters.minPrice, filters.maxPrice]);

  useEffect(() => {
    setLocalPriceRange((prev) => [prev[0], maxPrice]);
  }, [maxPrice]);

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setLocalPriceRange(newValue as number[]);
  };

  const handlePriceChangeCommitted = () => {
    updatePriceRange(localPriceRange[0], localPriceRange[1]);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", pl: 3, pr: 3, pb: 3 }}>
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
          Comprador
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        {/* Buscador */}
        <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
          <Box sx={{ width: 200, mr: 4, flexShrink: 0 }}></Box>
          <Input
            endDecorator={<SearchIcon />}
            placeholder="Buscar por nombre y/o SKU"
            value={searchTerm}
            onChange={(e) => updateSearch(e.target.value)}
            sx={{ width: "40%" }}
          />
        </Box>
        <Divider sx={{ mb: 2, mt: 2 }} />
      </Box>

      <Box sx={{ display: "flex", width: "100%" }}>
        {/* Filtros */}
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
          <Box sx={{ mt: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography gutterBottom>Precios</Typography>
              <Typography gutterBottom>
                ${localPriceRange[0]} - ${localPriceRange[1]}
              </Typography>
            </Box>
          </Box>
          <Slider
            getAriaLabel={() => "Rango de precios"}
            value={localPriceRange}
            onChange={handlePriceChange}
            onChangeCommitted={handlePriceChangeCommitted}
            valueLabelDisplay="auto"
            min={0}
            max={maxPrice}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>${localPriceRange[0]}</Typography>
            <Typography>${localPriceRange[1]}</Typography>
          </Box>
        </Box>

        {/* Productos */}
        <Box sx={{ flexGrow: 1 }}>
          <ErrorBoundary>
            <ProductGrid
              products={products}
              isLoading={isLoading}
              error={error}
            />
          </ErrorBoundary>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

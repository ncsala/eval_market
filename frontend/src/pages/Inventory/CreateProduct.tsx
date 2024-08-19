import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  Typography,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/joy";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { productService } from "@/services/productService";
import { CreateProductDTO } from "@/types";
import { useAppSelector } from "@/redux/hooks";

type CreateProductInput = Omit<CreateProductDTO, "sellerId">;

const CreateProduct: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductInput>();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const onSubmit: SubmitHandler<CreateProductInput> = async (data) => {
    try {
      if (!user) {
        throw new Error("Usuario no autenticado");
      }
      const newProduct = await productService.createProduct({
        ...data,
        sellerId: user.id,
      });
      console.log("Producto creado:", newProduct);
      navigate("/inventory");
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Box sx={{ display: "flex" }}>
        <Button
          startDecorator={<ArrowBackIcon />}
          variant="plain"
          onClick={() => navigate("/inventory")}
          sx={{ color: "text.secondary", alignItems: "flex-start" }}
        >
          Regresar
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <Typography level="h4" component="h1" sx={{ mb: 2 }}>
          Crear producto
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <FormControl error={!!errors.name} sx={{ mb: 2 }}>
            <FormLabel>Nombre</FormLabel>
            <Input
              {...register("name", { required: "El nombre es requerido" })}
              placeholder="Product Name 01"
            />
            {errors.name && (
              <FormHelperText>{errors.name.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors.sku} sx={{ mb: 2 }}>
            <FormLabel>SKU</FormLabel>
            <Input
              {...register("sku", { required: "El SKU es requerido" })}
              placeholder="PRDCT-NM-01"
            />
            {errors.sku && (
              <FormHelperText>{errors.sku.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors.quantity} sx={{ mb: 2 }}>
            <FormLabel>Cantidad</FormLabel>
            <Input
              type="number"
              {...register("quantity", {
                required: "La cantidad es requerida",
                min: {
                  value: 0,
                  message: "La cantidad debe ser mayor o igual a 0",
                },
              })}
              placeholder="20"
            />
            {errors.quantity && (
              <FormHelperText>{errors.quantity.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors.price} sx={{ mb: 2 }}>
            <FormLabel>Precio</FormLabel>
            <Input
              type="number"
              {...register("price", {
                required: "El precio es requerido",
                min: {
                  value: 0,
                  message: "El precio debe ser mayor o igual a 0",
                },
              })}
              placeholder="99.99"
            />
            {errors.price && (
              <FormHelperText>{errors.price.message}</FormHelperText>
            )}
          </FormControl>
          <Button type="submit" sx={{ mt: 2, width: "100%" }}>
            CREAR
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CreateProduct;

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Typography, Input, Button, FormControl, FormLabel, FormHelperText } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface IFormInput {
  name: string;
  sku: string;
  quantity: number;
}

const CreateProduct: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    // Aquí iría la lógica para crear el producto
    navigate('/inventory');
  };

  return (
    <Box sx={{ p: 2, width: '100%', maxWidth: 400 }}>
      <Button
        startDecorator={<ArrowBackIcon />}
        variant="plain"
        onClick={() => navigate('/inventory')}
        sx={{ mb: 2 }}
      >
        Regresar
      </Button>
      <Typography level="h4" component="h1" sx={{ mb: 2 }}>
        Crear producto
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl error={!!errors.name} sx={{ mb: 2 }}>
          <FormLabel>Nombre</FormLabel>
          <Input
            {...register("name", { required: "El nombre es requerido" })}
            placeholder="Product Name 01"
          />
          {errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
        </FormControl>
        <FormControl error={!!errors.sku} sx={{ mb: 2 }}>
          <FormLabel>SKU</FormLabel>
          <Input
            {...register("sku", { required: "El SKU es requerido" })}
            placeholder="PRDCT-NM-01"
          />
          {errors.sku && <FormHelperText>{errors.sku.message}</FormHelperText>}
        </FormControl>
        <FormControl error={!!errors.quantity} sx={{ mb: 2 }}>
          <FormLabel>Cantidad</FormLabel>
          <Input
            type="number"
            {...register("quantity", { 
              required: "La cantidad es requerida",
              min: { value: 0, message: "La cantidad debe ser mayor o igual a 0" }
            })}
            placeholder="20"
          />
          {errors.quantity && <FormHelperText>{errors.quantity.message}</FormHelperText>}
        </FormControl>
        <Button type="submit" sx={{ mt: 2 }}>CREAR</Button>
      </form>
    </Box>
  );
};

export default CreateProduct;
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Typography, Input, Button, FormControl, FormLabel, Alert } from '@mui/joy';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { login, clearError } from '../../redux/slices/authSlice';
import { RegisterModal } from '@/components/Auth';

interface LoginFormInputs {
  Correo: string;
  Contraseña: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    dispatch(login({ email: data.Correo, password: data.Contraseña }));
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Previene que el formulario se envíe
    setOpenRegisterModal(true);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: '100%',
        maxWidth: 400,
        p: 3,
        border: '1px solid',
        borderColor: 'neutral.outlinedBorder',
        borderRadius: 'sm',
      }}
    >
      {error && (
        <Alert color="danger" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Typography level="h1" component="h1" sx={{ mb: 2 }}>
        Iniciar sesión
      </Typography>
      <FormControl error={!!errors.Correo}>
        <FormLabel>Correo</FormLabel>
        <Input
          {...register("Correo", {
            required: "El correo es requerido",
            maxLength: { value: 254, message: "El correo es demasiado largo" },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Formato de correo inválido"
            }
          })}
          type="email"
          placeholder="name@mail.com"
        />
        {errors.Correo && <Typography color="danger">{errors.Correo.message}</Typography>}
      </FormControl>
      <FormControl sx={{ mt: 2 }} error={!!errors.Contraseña}>
        <FormLabel>Contraseña</FormLabel>
        <Input
          {...register("Contraseña", {
            required: "La contraseña es requerida",
            maxLength: { value: 8, message: "La contraseña no debe exceder 8 caracteres" }
          })}
          type="password"
          placeholder="••••••"
        />
        {errors.Contraseña && <Typography color="danger">{errors.Contraseña.message}</Typography>}
      </FormControl>
      <Button type="submit" fullWidth sx={{ mt: 3 }} loading={isLoading}>
        Iniciar sesión
      </Button>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Button
          variant="plain"
          color="neutral"
          sx={{ fontSize: 'sm' }}
          onClick={handleRegisterClick}
        >
          ¿No tienes cuenta? Regístrate
        </Button>
      </Box>
      <RegisterModal
        open={openRegisterModal}
        onClose={() => setOpenRegisterModal(false)}
      />
    </Box>
  );
};

export default LoginForm;
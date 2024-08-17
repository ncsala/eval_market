import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Modal, ModalDialog, Typography, Input, Button, FormControl, FormLabel, FormHelperText, Link } from '@mui/joy';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { register as registerAction } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

interface RegisterFormInputs {
  Correo: string;
  Contraseña: string;
  "Confirmar contraseña": string;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose }) => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<RegisterFormInputs>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    dispatch(registerAction({ email: data.Correo, password: data.Contraseña }))
      .unwrap()
      .then(() => {
        onClose();
      })
      .catch(() => {
        // Error is handled by the reducer
      });
  };

  const handleLoginClick = () => {
    onClose(); // Cierra el modal de registro
    navigate('/login'); // Navega a la página de inicio de sesión
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{ width: 400, p: 3, borderRadius: 'sm' }}>
        <Typography level="h4" component="h1" sx={{ mb: 2 }}>
          Crea una cuenta
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl error={!!errors.Correo || !!error}>
            <FormLabel>Correo</FormLabel>
            <Input
              {...register("Correo", {
                required: "El correo es requerido",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Formato de correo inválido"
                }
              })}
              placeholder="name@mail.com"
            />
            {errors.Correo && <FormHelperText>{errors.Correo.message}</FormHelperText>}
            {error && <FormHelperText>Este usuario ya existe, prueba con otro</FormHelperText>}
          </FormControl>
          <FormControl sx={{ mt: 2 }} error={!!errors.Contraseña}>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              {...register("Contraseña", {
                required: "La contraseña es requerida",
                minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" }
              })}
              placeholder="••••••"
            />
            {errors.Contraseña && <FormHelperText>{errors.Contraseña.message}</FormHelperText>}
          </FormControl>
          <FormControl sx={{ mt: 2 }} error={!!errors["Confirmar contraseña"]}>
            <FormLabel>Confirmar contraseña</FormLabel>
            <Input
              type="password"
              {...register("Confirmar contraseña", {
                required: "Confirma tu contraseña",
                validate: (value) => value === getValues("Contraseña") || "Las contraseñas no coinciden"
              })}
              placeholder="••••••"
            />
            {errors["Confirmar contraseña"] && <FormHelperText>{errors["Confirmar contraseña"].message}</FormHelperText>}
          </FormControl>
          <Button type="submit" fullWidth sx={{ mt: 3 }} loading={isLoading}>
            REGISTRARSE
          </Button>
          <Typography
            level="body-sm"
            sx={{
              mt: 2,
              textAlign: 'center',
              fontSize: '0.875rem',  // Ajusta esto si necesitas un tamaño específico
              fontWeight: 400,       // Ajusta el peso de la fuente si es necesario
            }}
          >
            <Link
              component="button"
              onClick={handleLoginClick}
              sx={{ cursor: 'pointer' }}
            >
              Inicia sesión
            </Link>
          </Typography>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default RegisterModal;
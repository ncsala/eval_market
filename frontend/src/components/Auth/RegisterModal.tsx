import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Modal,
  ModalDialog,
  Typography,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Link,
  RadioGroup,
  Radio,
} from "@mui/joy";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  register as registerAction,
  setUserRole,
  login,
  clearError,
} from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { UserRole } from "@/types";
import { RegisterModalProps, RegisterFormInputs } from "./types";

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<RegisterFormInputs>();
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    if (!showRoleSelection) {
      try {
        await dispatch(
          registerAction({
            email: data.Correo,
            password: data.Contraseña,
            confirmPassword: data["Confirmar contraseña"],
          })
        ).unwrap();
        setShowRoleSelection(true);
      } catch (error) {
        console.error("Registration failed:", error);
      }
    } else {
      if (selectedRole) {
        try {
          await dispatch(
            setUserRole({ email: data.Correo, role: selectedRole })
          ).unwrap();
          await dispatch(
            login({ email: data.Correo, password: data.Contraseña })
          ).unwrap();
          reset();
          onClose();
          switch (selectedRole) {
            case UserRole.COMPRADOR:
              navigate("/");
              break;
            case UserRole.VENDEDOR:
              navigate("/vendedor");
              break;
            default:
              navigate("/");
          }
        } catch (error) {
          console.error("Role selection or login failed:", error);
        }
      }
    }
  };

  const handleLoginClick = () => {
    dispatch(clearError());
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{ width: 400, p: 3, borderRadius: "sm" }}>
        <Typography level="h4" component="h1" sx={{ mb: 2 }}>
          {showRoleSelection ? "Selecciona tu rol" : "Crea una cuenta"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!showRoleSelection ? (
            <>
              <FormControl error={!!errors.Correo || !!error}>
                <FormLabel>Correo</FormLabel>
                <Input
                  {...register("Correo", {
                    required: "El correo es requerido",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Formato de correo inválido",
                    },
                  })}
                  placeholder="name@mail.com"
                />
                {errors.Correo && (
                  <FormHelperText>{errors.Correo.message}</FormHelperText>
                )}
                {error && <FormHelperText>{error}</FormHelperText>}
              </FormControl>
              <FormControl sx={{ mt: 2 }} error={!!errors.Contraseña}>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  type="password"
                  {...register("Contraseña", {
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                  placeholder="••••••"
                />
                {errors.Contraseña && (
                  <FormHelperText>{errors.Contraseña.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                sx={{ mt: 2 }}
                error={!!errors["Confirmar contraseña"]}
              >
                <FormLabel>Confirmar contraseña</FormLabel>
                <Input
                  type="password"
                  {...register("Confirmar contraseña", {
                    required: "Confirma tu contraseña",
                    validate: (value) =>
                      value === getValues("Contraseña") ||
                      "Las contraseñas no coinciden",
                  })}
                  placeholder="••••••"
                />
                {errors["Confirmar contraseña"] && (
                  <FormHelperText>
                    {errors["Confirmar contraseña"].message}
                  </FormHelperText>
                )}
              </FormControl>
            </>
          ) : (
            <FormControl>
              <FormLabel>Selecciona tu rol</FormLabel>
              <RadioGroup
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              >
                <Radio value={UserRole.COMPRADOR} label="Comprador" />
                <Radio value={UserRole.VENDEDOR} label="Vendedor" />
              </RadioGroup>
            </FormControl>
          )}
          <Button
            type="submit"
            fullWidth
            sx={{ mt: 3 }}
            loading={isLoading}
            disabled={showRoleSelection && !selectedRole}
          >
            {showRoleSelection ? "FINALIZAR REGISTRO" : "REGISTRARSE"}
          </Button>
          {!showRoleSelection && (
            <Typography
              level="body-sm"
              sx={{
                mt: 2,
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: 400,
              }}
            >
              <Link
                component="button"
                onClick={handleLoginClick}
                sx={{ cursor: "pointer" }}
              >
                Inicia sesión
              </Link>
            </Typography>
          )}
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default RegisterModal;

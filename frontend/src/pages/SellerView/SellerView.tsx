import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Link,
  Alert,
  IconButton,
} from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { UserRole } from "@/types/user";

const SellerView: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [showAlert, setShowAlert] = useState(false);

  const handleAction = () => {
    if (user && user.role !== UserRole.VENDEDOR) {
      setShowAlert(true);
    } else if (!user) {
      navigate("/login");
    } else {
      navigate("/inventory/create");
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {user && user.role === UserRole.VENDEDOR ? (
        <>
          <Typography level="body-md" sx={{ mb: 2 }}>
            Bienvenido al panel de vendedor. Aquí puedes gestionar tu inventario
            y crear nuevos productos.
          </Typography>
          <Button onClick={() => navigate("/inventory/create")}>
            Crear Producto
          </Button>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {showAlert && user && user.role !== UserRole.VENDEDOR && (
            <Alert
              color="warning"
              variant="soft"
              sx={{ mb: 2, width: "80%", maxWidth: 1200 }}
              endDecorator={
                <IconButton
                  variant="soft"
                  size="sm"
                  color="warning"
                  onClick={() => setShowAlert(false)}
                >
                  <CloseRoundedIcon />
                </IconButton>
              }
            >
              Para acceder a las funciones de vendedor, debes cerrar sesión y
              registrarte como vendedor.
            </Alert>
          )}
          <Card
            variant="outlined"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "stretch",
              justifyContent: "space-between",
              width: "80%",
              maxWidth: 1200,
              height: 400,
              p: 3,
            }}
          >
            <Box sx={{ width: "80%", height: "100%", p: 2 }}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={"https://via.placeholder.com/150"}
                  alt="Placeholder"
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                height: "100%",
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box sx={{ mb: 2, textAlign: "left" }}>
                <Typography level="h1" sx={{ mb: 2 }}>
                  Crea tu producto
                </Typography>
                <Typography level="h4">
                  Organiza de manera profesional tu inventario
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Link href="#" underline="hover" sx={{ mr: 2 }}>
                  Conocer más
                </Link>
                <Button
                  onClick={handleAction}
                  sx={{
                    backgroundColor: "lightgray",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#d3d3d3",
                    },
                  }}
                >
                  {user ? "CREAR PRODUCTO" : "INICIAR SESIÓN"}
                </Button>
              </Box>
            </Box>
          </Card>

          {!user && (
            <RouterLink
              to="/login"
              style={{
                marginTop: "16px",
                color: "inherit",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Inicia sesión para poder ver tu inventario
            </RouterLink>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SellerView;

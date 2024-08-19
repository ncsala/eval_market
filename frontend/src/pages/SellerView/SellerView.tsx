import React from "react";
import { Box, Typography, Button, Card, Link } from "@mui/joy";
import { useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { UserRole } from "@/types/user";

const SellerView: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogin = () => {
    navigate("/login");
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
                  onClick={handleLogin}
                  sx={{
                    backgroundColor: "lightgray",
                    color: "black",
                    border: "2px solid #a9a9a9",
                    borderRadius: "5px",
                    padding: "8px 16px",
                    "&:hover": {
                      backgroundColor: "#d3d3d3",
                      borderColor: "#8c8c8c",
                      color: "black",
                    },
                  }}
                >
                  CREAR PRODUCTO
                </Button>
              </Box>
            </Box>
          </Card>

          <Link href="/login" underline="hover" sx={{ mt: 2 }}>
            Inicia sesión para poder ver tu inventario
          </Link>
          <Typography level="body-md" sx={{ mb: 2 }}></Typography>
        </Box>
      )}
    </Box>
  );
};

export default SellerView;

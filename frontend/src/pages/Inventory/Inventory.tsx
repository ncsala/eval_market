import React from 'react';
import { Box, Typography, Button, Link } from '@mui/joy';
import { useAppSelector } from '@/redux/hooks';
import { useNavigate } from 'react-router-dom';

const Inventory: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      padding: 4,
    }}>
      <Box sx={{
        display: 'flex',
        width: '100%',
        maxWidth: 800,
        bgcolor: 'background.paper',
        borderRadius: 'sm',
        boxShadow: 1,
        overflow: 'hidden',
        marginBottom: 4,
      }}>
        {/* Columna izquierda: Imagen */}
        <Box sx={{
          width: '50%',
          bgcolor: 'grey.200',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Typography level="body-lg" textColor="text.secondary">
            Imagen del producto
          </Typography>
        </Box>
        
        {/* Columna derecha: Contenido */}
        <Box sx={{ 
          width: '50%', 
          p: 3, 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <Box>
            <Typography level="h2" component="h1" sx={{ mb: 2 }}>
              Crea tu producto
            </Typography>
            <Typography level="body-md" sx={{ mb: 2 }}>
              Organiza de manera profesional tu inventario
            </Typography>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mt: 2
          }}>
            <Link href="#" underline="always">Conocer más</Link>
            <Button variant="solid" color="primary" size="lg">
              CREAR PRODUCTO
            </Button>
          </Box>
        </Box>
      </Box>
      
      {/* Link de inicio de sesión fuera del rectángulo */}
      {!user && (
        <Button
          variant="plain"
          color="neutral"
          onClick={handleLogin}
          sx={{ textDecoration: 'underline' }}
        >
          Inicia sesión para poder ver tu inventario
        </Button>
      )}
    </Box>
  );
};

export default Inventory;
// src/pages/Home/Home.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/joy';
import { useAppSelector } from '@/redux/hooks';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
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
      textAlign: 'center',
      height: '100%',
    }}>
      <Typography level="h2" component="h1" sx={{ mb: 2 }}>
        Crea tu producto
      </Typography>
      <Typography level="body-md" sx={{ mb: 2 }}>
        Organiza de manera profesional tu inventario
      </Typography>
      <Button variant="solid" color="primary" size="lg" sx={{ mb: 2 }}>
        CREAR PRODUCTO
      </Button>
      <Typography level="body-sm">
        <Button
          variant="plain"
          color="neutral"
          onClick={user ? undefined : handleLogin}
        >
          Inicia sesión para poder ver tu inventario
        </Button>
      </Typography>
    </Box>
  );
};

export default Home;
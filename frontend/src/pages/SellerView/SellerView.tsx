import React from 'react';
import { Box, Typography, Button } from '@mui/joy';
import { useAppSelector } from '@/redux/hooks';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components';
import { UserRole } from '@/types/user';

const SellerView: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography level="h4" component="h1" sx={{ mb: 2 }}>
          Panel de Vendedor
        </Typography>
        {user && user.role === UserRole.VENDEDOR ? (
          <>
            <Typography level="body-md" sx={{ mb: 2 }}>
              Bienvenido al panel de vendedor. Aquí puedes gestionar tu inventario y crear nuevos productos.
            </Typography>
            <Button onClick={() => navigate('/inventory/create')}>Crear Producto</Button>
          </>
        ) : (
          <>
            <Typography level="body-md" sx={{ mb: 2 }}>
              Para acceder a todas las funcionalidades del panel de vendedor, por favor inicia sesión.
            </Typography>
            <Button onClick={handleLogin}>Iniciar Sesión</Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SellerView;
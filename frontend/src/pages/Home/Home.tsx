import React from 'react';
import { Box, Typography, Button } from '@mui/joy';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{ maxWidth: 'sm', mx: 'auto', my: 4, textAlign: 'center' }}>
      <Typography level="h1" component="h1">
        Bienvenido al Marketplace de MagicLog
      </Typography>
      {user && (
        <Box sx={{ mt: 2 }}>
          <Typography>
            Hola, {user.email}
          </Typography>
          <Button
            onClick={handleLogout}
            variant="outlined"
            color="neutral"
            sx={{ mt: 2 }}
          >
            Cerrar sesión
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Home;
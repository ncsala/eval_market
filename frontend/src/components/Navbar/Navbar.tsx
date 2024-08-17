// src/components/Navbar/Navbar.tsx
import React from 'react';
import { Box, Typography, Button, Sheet } from '@mui/joy';
import PersonIcon from '@mui/icons-material/Person';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Sheet
      component="nav"
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        borderColor: 'divider',
        width: '100%',
      }}
    >
      <Typography level="title-lg">Company name</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1px solid',
            borderColor: 'neutral.outlinedBorder',
          }}
        >
          <PersonIcon />
        </Box>
        {user ? (
          <Button variant="outlined" color="neutral" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        ) : (
          <Button variant="outlined" color="neutral" onClick={handleLogin}>
            Iniciar sesión
          </Button>
        )}
      </Box>
    </Sheet>
  );
};

export default Navbar;
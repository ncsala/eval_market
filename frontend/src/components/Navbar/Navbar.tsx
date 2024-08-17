import React from 'react';
import { Box, Typography, Button, Sheet, Menu, MenuItem } from '@mui/joy';
import PersonIcon from '@mui/icons-material/Person';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const displayName = user?.email
    ? user.email.split('@')[0]
    : 'Usuario';

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
          <>
            <Button variant="outlined" color="neutral" onClick={handleClick}>
              {displayName}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </Menu>
          </>
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
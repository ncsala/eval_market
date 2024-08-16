import React from 'react';
import { Box, Typography, Button } from '@mui/joy';
import { Link as RouterLink } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 'sm', mx: 'auto', my: 4, textAlign: 'center' }}>
      <Typography level="h1" component="h1">
        Bienvenido al Marketplace de MagicLog
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button
          component={RouterLink}
          to="/register"
          variant="solid"
          color="primary"
          sx={{ mr: 2 }}
        >
          Registrarse
        </Button>
        <Button
          component={RouterLink}
          to="/login"
          variant="outlined"
          color="neutral"
        >
          Iniciar sesión
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
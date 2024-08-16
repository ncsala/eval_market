import React, { useState } from 'react';
import { Box, Typography, Input, Button, Link, FormControl, FormLabel, FormHelperText } from '@mui/joy';
import { Link as RouterLink } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para iniciar sesión
    console.log('Intento de inicio de sesión con:', { email, password });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 3,
          border: '1px solid',
          borderColor: 'neutral.outlinedBorder',
          borderRadius: 'sm',
        }}
      >
        <Typography level="h4" component="h1" sx={{ mb: 2 }}>
          Iniciar sesión
        </Typography>
        <FormControl error={!!error}>
          <FormLabel>Correo</FormLabel>
          <Input
            type="email"
            placeholder="name@mail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
        <FormControl sx={{ mt: 2 }}>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type="password"
            placeholder="••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" fullWidth sx={{ mt: 3 }}>
          Iniciar sesión
        </Button>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link component={RouterLink} to="/register" variant="plain" sx={{ fontSize: 'sm' }}>
            ¿No tienes cuenta? Regístrate
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
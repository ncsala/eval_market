import React, { useState } from 'react';
import { Box, Typography, Input, Button, Link, FormControl, FormLabel, FormHelperText } from '@mui/joy';
import { Link as RouterLink } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
    } else {
      // Aquí iría la lógica para crear la cuenta
      console.log('Intento de registro con:', { email, password });
    }
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
          Crear una cuenta
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
        <FormControl sx={{ mt: 2 }}>
          <FormLabel>Confirmar contraseña</FormLabel>
          <Input
            type="password"
            placeholder="••••••"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        {error && <FormHelperText sx={{ color: 'danger.500' }}>{error}</FormHelperText>}
        <Button type="submit" fullWidth sx={{ mt: 3 }}>
          Registrarse
        </Button>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link component={RouterLink} to="/login" variant="plain" sx={{ fontSize: 'sm' }}>
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
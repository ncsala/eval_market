import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import { LoginForm } from '@/components';

const Login: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (user) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: 'sm', mx: 'auto', my: 4 }}>
      <LoginForm />
    </Box>
  );
};

export default Login;
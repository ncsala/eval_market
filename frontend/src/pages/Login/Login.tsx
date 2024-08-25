import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { LoginForm } from "@/components";
import { handleAuthRedirect } from "./hooks/handleAuthRedirect";
import { Box } from "@mui/joy";

const Login: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      handleAuthRedirect(user, navigate);
    }
  }, [user, navigate]);

  if (user) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: "sm", mx: "auto", my: 4 }}>
      <LoginForm />
    </Box>
  );
};

export default Login;

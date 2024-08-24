import React, { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { setUser, logout, setInitialized } from "../../redux/slices/authSlice";
import { AuthWrapperProps } from "./types";

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        dispatch(logout());
        dispatch(setInitialized(true)); // Establece isInitialized en Redux
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Usuario cargado:", parsedUser);
        dispatch(setUser(parsedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
        dispatch(logout());
      } finally {
        dispatch(setInitialized(true)); // Establece isInitialized en Redux después de que el usuario ha sido cargado
      }
    };

    loadUser();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthWrapper;

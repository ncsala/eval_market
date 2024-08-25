import { useEffect } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import {
  setUser,
  logout,
  setInitialized,
} from "../../../redux/slices/authSlice";

export const useAuthInitialization = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        dispatch(logout());
        dispatch(setInitialized(true));
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
        dispatch(setInitialized(true));
      }
    };

    loadUser();
  }, [dispatch]);
};

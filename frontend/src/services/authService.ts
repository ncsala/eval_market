import axios from "axios";
import { User, UserRole } from "../types/user";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1/auth";

interface DecodedToken {
  userId: number;
  role: UserRole;
  iat: number;
  exp: number;
}

export const authService = {
  async register(email: string, password: string): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/register`, { email, password });
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || "Error en el registro");
      }
      throw new Error("Error en la conexión con el servidor");
    }
  },

  async login(email: string, password: string): Promise<User> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      if (response.data.token) {
        const decodedToken = jwtDecode(response.data.token) as DecodedToken;
        const user: User = {
          id: decodedToken.userId,
          email: email,
          role: decodedToken.role,
          token: response.data.token,
        };
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      }
      throw new Error("No se recibió token del servidor");
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw new Error(
          error.response.data.message || "Error en el inicio de sesión"
        );
      }
      throw new Error("Error en la conexión con el servidor");
    }
  },

  logout() {
    localStorage.removeItem("user");
  },
};
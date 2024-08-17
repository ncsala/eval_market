import axios from 'axios';

const API_URL = 'http://localhost:3002/auth';

export const authService = {
  async register(email: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/register`, { email, password });
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || 'Error en el registro');
      }
      throw new Error('Error en la conexión con el servidor');
    }
  },

  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || 'Error en el inicio de sesión');
      }
      throw new Error('Error en la conexión con el servidor');
    }
  },

  logout() {
    localStorage.removeItem('user');
  },
};
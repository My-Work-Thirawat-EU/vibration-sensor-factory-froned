import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface LoginResponse {
  id: string;
  username: string;
  email: string;
  organization: string;
  token: string;
  refresh_token: string;
  token_expiry: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    
    // Store tokens in localStorage
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refreshToken', response.data.refresh_token);
    localStorage.setItem('tokenExpiry', response.data.token_expiry);
    localStorage.setItem('user', JSON.stringify({
      id: response.data.id,
      username: response.data.username,
      email: response.data.email,
      organization: response.data.organization,
    }));

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
    throw new Error('Login failed');
  }
}; 
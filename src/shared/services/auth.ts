import { apiClient } from '../../core/interceptors/axios';
import type { LoginRequest, RegisterRequest, LoginResponse } from '../types/auth';

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/auth/login', credentials);
  }

  async register(userData: RegisterRequest): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>('/auth/register', userData);
  }

  saveTokens(accessToken: string, csrfToken: string): void {
    apiClient.saveTokens(accessToken, csrfToken);
  }

  getStoredTokens() {
    return apiClient.getStoredTokens();
  }

  clearTokens(): void {
    apiClient.clearTokens();
  }
}

export const authService = new AuthService();
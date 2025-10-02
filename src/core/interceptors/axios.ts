import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { AuthTokens } from '../../shared/types/auth';

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error.response && error.response.data)
    );

    this.instance.interceptors.request.use(
      (config) => {
        const tokens = this.getStoredTokens();

        if (tokens && config.headers) {
          config.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
          config.headers['X-CSRF-Token'] = tokens.csrfToken;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }

  saveTokens(accessToken: string, csrfToken: string): void {
    localStorage.setItem('@taskmanager:accessToken', accessToken);
    localStorage.setItem('@taskmanager:csrfToken', csrfToken);
  }

  getStoredTokens(): AuthTokens | null {
    const accessToken = localStorage.getItem('@taskmanager:accessToken');
    const csrfToken = localStorage.getItem('@taskmanager:csrfToken');

    if (!accessToken || !csrfToken) {
      return null;
    }
    return { accessToken, csrfToken };
  }

  clearTokens(): void {
    localStorage.removeItem('@taskmanager:accessToken');
    localStorage.removeItem('@taskmanager:csrfToken');
    localStorage.removeItem('@taskmanager:user');
    localStorage.clear();
  }

  getInstance(): AxiosInstance {
    return this.instance;
  }
}

export const apiClient = new ApiClient();

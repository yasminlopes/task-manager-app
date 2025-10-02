import { useEffect, useState, type ReactNode } from 'react';
import type { User } from '../../shared/types/user';
import type { RegisterRequest } from '../../shared/types/auth';
import { authService } from '../../shared/services/auth';
import { AuthContext, type AuthContextData } from './auth-context';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokens = authService.getStoredTokens();
    const userData = localStorage.getItem('@taskmanager:user');

    if (tokens && userData) {
      setUser(JSON.parse(userData));
    }

    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      
      authService.saveTokens(response.data.accessToken, response.data.csrfToken);
      
      const userData: User = {
        id: 'temp-id',
        email,
        name: email.split('@')[0],
        cpf: ''
      };
      
      localStorage.setItem('@taskmanager:user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userData: RegisterRequest) => {
    setIsLoading(true);
    try {
      await authService.register(userData);
      await signIn(userData.email, userData.password);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    authService.clearTokens();
    setUser(null);
  };

  const value: AuthContextData = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

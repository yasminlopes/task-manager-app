import { createContext, useContext } from 'react';
import type { User } from '../../shared/types/user';
import type { RegisterRequest } from '../../shared/types/auth';

export interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: RegisterRequest) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuth() {
  const context = useContext(AuthContext);

  if (Object.keys(context).length === 0) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
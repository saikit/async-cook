import { createContext, ReactElement, useCallback } from 'react';
import { apiClient } from '@/lib/apiClient';
import { useContext } from 'react';

export type AuthContextType = {
  loginWithSSO: (code: string, provider?: string) => Promise<unknown>;
  logoutUser: () => Promise<unknown>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_URL = import.meta.env.VITE_API_URL;
const APP_URL = import.meta.env.VITE_URL;

export const AuthenticationProvider = ({
  children,
}: {
  children?: ReactElement | ReactElement[];
}) => {
  const loginWithSSO = useCallback(
    async (code: string, provider?: string): Promise<unknown> => {
      try {
        await fetch(`${APP_URL}/sanctum/csrf-cookie`, {
          method: 'GET',
          credentials: 'include',
        });
        return await apiClient(
          API_URL + '/login/' + provider + '/callback?code=' + code,
          {
            includeAuth: true,
          },
        );
      } catch (error) {
        console.error('Error during SSO login:', error);
        throw error;
      }
    },
    [],
  );

  const logoutUser = useCallback(async () => {
    try {
      return await apiClient(API_URL + '/logout', {
        method: 'POST',
        includeAuth: true,
      });
    } catch (error) {
      console.error('Logout failed:', error);
      if ((error as any).status === 401) {
        throw new Error('Unauthorized');
      }
      throw error;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loginWithSSO, logoutUser }}>
      <>{children}</>
    </AuthContext.Provider>
  );
};

export const useAuthentication = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(
      'useAuthentication must be used within a AuthenticationProvider',
    );
  return context;
};

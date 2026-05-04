import { createContext, ReactElement, useCallback } from 'react';
import { getHeaders } from '@/hooks/getHeaders';
import { useContext } from 'react';

export type AuthContextType = {
  loginWithSSO: (code: string, provider?: string) => Promise<unknown>;
  logoutUser: () => Promise<unknown>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_URL = import.meta.env.VITE_API_URL;

export const AuthenticationProvider = ({
  children,
}: {
  children?: ReactElement | ReactElement[];
}) => {
  const loginWithSSO = useCallback(
    async (code: string, provider?: string): Promise<unknown> => {
      try {
        await fetch(`${URL}/sanctum/csrf-cookie`, {
          method: 'GET',
          credentials: 'include',
        });
        const response = await fetch(
          API_URL + '/login/' + provider + '/callback?code=' + code,
          {
            headers: getHeaders(),
            credentials: 'include',
          },
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'OAuth authentication failed');
        }
        return data;
      } catch (error) {
        console.error('Error during SSO login:', error);
        throw error;
      }
    },
    [],
  );

  const logoutUser = useCallback(async () => {
    try {
      const response = await fetch(API_URL + '/logout', {
        method: 'POST',
        headers: getHeaders(),
        credentials: 'include',
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized');
        }
        throw new Error('Logout failed');
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
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

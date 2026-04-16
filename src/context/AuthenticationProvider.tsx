import { createContext, useState, ReactElement } from 'react';
import { setItem } from '@/utils/sessionStorage';
import { usePersistedState } from '@/hooks/usePersistedState';

type AuthContextType = {
  token: string | null;
  user: string | null;
  logoutUser: (token: string | null) => Promise<unknown>;
  loginWithSSO: (code: string, provider: string) => Promise<unknown>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_URL = import.meta.env.VITE_API_URL;

export const AuthenticationProvider = ({
  children,
}: {
  children?: ReactElement | ReactElement[];
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [token] = usePersistedState('token', '');

  const logoutUser = async (token: string | null) => {
    try {
      const response = await fetch(API_URL + '/logout', {
        method: 'POST',
        body: JSON.stringify({
          token: token,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized');
        }
      }
      const data = await response.json();
      setItem('token', null);
      setUser(null);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const loginWithSSO = async (code: string, provider?: string) => {
    try {
      const response = await fetch(
        API_URL + '/login/' + provider + '/callback?code=' + code,
        {},
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'OAuth authentication failed');
      }
      console.log(data);
      setItem('token', data.access_token);
      setUser(data.user.name || 'GitHub User');
      return data;
    } catch (error) {
      console.error('Error during SSO login:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, logoutUser, loginWithSSO }}>
      <>{children}</>
    </AuthContext.Provider>
  );
};

export default AuthContext;

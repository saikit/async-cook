import {
  createContext,
  useEffect,
  useCallback,
  ReactElement,
  useContext,
} from 'react';
import { useState } from 'react';
import type { RecipesListType } from '@/types/api';
import { getHeaders } from '@/hooks/getHeaders';

export type ManageContextType = {
  manageView: {
    categories: Array<{
      id: number;
      category: string;
    }>;
    equipment: Array<{
      id: number;
      name: string;
    }>;
    icons: Array<{
      id: number;
      category: string;
      note: string;
    }>;
    recipes: RecipesListType[];
  };
  refetch: () => Promise<void>;
};

type ChildrenType = { children?: ReactElement | ReactElement[] };
const ManageContext = createContext<ManageContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL;

export const ManageProvider = ({ children }: ChildrenType) => {
  const [manageView, setManageView] = useState<ManageContextType['manageView']>(
    {
      categories: [],
      equipment: [],
      icons: [],
      recipes: [],
    },
  );

  const fetchJSONDataFrom = useCallback(
    async (path: string) => {
      try {
        const response = await fetch(path, {
          headers: getHeaders(),
          credentials: 'include',
        });
        if (!response.ok) {
          console.error(
            'Error fetching recipe data:',
            response.status,
            response.statusText,
          );
        } else {
          const data = await response.json();
          if (data) {
            setManageView(data);
          } else {
            console.error('Invalid API response structure:', data);
          }
        }
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    },
    [setManageView],
  );

  const refetch = useCallback(async () => {
    const path = `${API_URL}/manage`;
    await fetchJSONDataFrom(path);
  }, [fetchJSONDataFrom]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <ManageContext.Provider value={{ manageView, refetch }}>
      <>{children}</>
    </ManageContext.Provider>
  );
};

export const useManage = () => {
  const context = useContext(ManageContext);
  if (!context)
    throw new Error('useManage must be used within a ManageProvider');
  return context;
};

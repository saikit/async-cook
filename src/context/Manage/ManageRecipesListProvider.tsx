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

type RecipesListContextType = {
  recipesList: RecipesListType[];
};

type ChildrenType = { children?: ReactElement | ReactElement[] };
const ManageRecipesListContext = createContext<RecipesListContextType>({
  recipesList: [],
});

const API_URL = import.meta.env.VITE_API_URL;

export const ManageRecipesListProvider = ({ children }: ChildrenType) => {
  const [recipesList, setRecipesList] = useState([] as RecipesListType[]);
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
          setRecipesList([]);
        } else {
          const data = await response.json();
          // Validate that data.data exists and is an array
          if (data && Array.isArray(data.data)) {
            setRecipesList(data.data);
          } else {
            console.error('Invalid API response structure:', data);
            setRecipesList([]);
          }
        }
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    },
    [setRecipesList],
  );

  useEffect(() => {
    const path = `${API_URL}/manage/recipes`;
    if (recipesList.length === 0) fetchJSONDataFrom(path);
  }, [fetchJSONDataFrom, recipesList.length]);

  return (
    <ManageRecipesListContext.Provider value={{ recipesList }}>
      <>{children}</>
    </ManageRecipesListContext.Provider>
  );
};

export const useManageRecipeList = () => {
  const context = useContext(ManageRecipesListContext);
  if (!context)
    throw new Error(
      'useManageRecipeList must be used within a ManageRecipesListProvider',
    );
  return context;
};

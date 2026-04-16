import { createContext, useEffect, useCallback, ReactElement } from 'react';
import { usePersistedState } from '@/hooks/usePersistedState';
import type { RecipesListType } from '@/types/api';

type RecipesListContextType = {
  recipesList: RecipesListType[];
};

type ChildrenType = { children?: ReactElement | ReactElement[] };
const RecipesListContext = createContext<RecipesListContextType>({
  recipesList: [],
});

const API_URL = import.meta.env.VITE_API_URL;

export const RecipesListProvider = ({ children }: ChildrenType) => {
  const [recipesList, setRecipesList] = usePersistedState<
    Array<RecipesListType>
  >('recipesList', []);
  const fetchJSONDataFrom = useCallback(
    async (path: string) => {
      try {
        const response = await fetch(path, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
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
    const path = `${API_URL}/recipes`;
    if (recipesList.length === 0) fetchJSONDataFrom(path);
  }, [fetchJSONDataFrom, recipesList.length]);

  return (
    <RecipesListContext.Provider value={{ recipesList }}>
      <>{children}</>
    </RecipesListContext.Provider>
  );
};

export default RecipesListContext;

import { createContext, useEffect, useCallback, ReactElement } from 'react';
import { useState, useContext } from 'react';
import type { RecipesListType, RecipeType } from '@/types/api';

type RecipesListContextType = {
  recipesList: RecipesListType;
};

type ChildrenType = { children?: ReactElement | ReactElement[] };
const RecipesListContext = createContext<RecipesListContextType | undefined>(
  undefined,
);

const API_URL = import.meta.env.VITE_API_URL;

export const RecipesListProvider = ({ children }: ChildrenType) => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

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
        } else {
          const data = await response.json();
          // Validate that data.data exists and is an array
          if (data && Array.isArray(data.data)) {
            setRecipes(data.data);
          } else {
            console.error('Invalid API response structure:', data);
          }
        }
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    },
    [setRecipes],
  );

  useEffect(() => {
    const path = `${API_URL}/recipes`;
    if (recipes.length === 0) fetchJSONDataFrom(path);
  }, [fetchJSONDataFrom, recipes.length]);

  const recipesList = recipes.reduce((acc, recipe) => {
    const category = recipe.category || 'None';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(recipe);
    return acc;
  }, {} as RecipesListType);

  return (
    <RecipesListContext.Provider value={{ recipesList }}>
      <>{children}</>
    </RecipesListContext.Provider>
  );
};

export const useRecipeList = () => {
  const context = useContext(RecipesListContext);
  if (!context)
    throw new Error('useRecipeList must be used within a RecipesListProvider');
  return context;
};

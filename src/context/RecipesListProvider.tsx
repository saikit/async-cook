import { createContext, useEffect, useState, useCallback, ReactElement } from 'react'

export type RecipesListType = {
  id: number,
  title: string,
  slug: string
}

type RecipesListContextType = {
  recipesList: RecipesListType[]
}

type ChildrenType = { children?: ReactElement | ReactElement[] }
const RecipesListContext = createContext<RecipesListContextType>({ recipesList: [] })

const API_URL = import.meta.env.VITE_API_URL;

export const RecipesListProvider = ({ children } : ChildrenType) => {
  const [recipesList, setRecipesList] = useState<Array<RecipesListType>>([])
  const fetchJSONDataFrom = useCallback(async (path : string) => {
    const response = await fetch(path, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const data = await response.json();
    setRecipesList(data.data);
  }, []);

  useEffect(() => {
    const path = `${API_URL}/recipes`;
    fetchJSONDataFrom(path);

  }, [fetchJSONDataFrom]);

  return (
    <RecipesListContext.Provider value={{recipesList}}>
        <>{children}</>
    </RecipesListContext.Provider>
  )
}
  
export default RecipesListContext
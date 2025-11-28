import { Link } from 'react-router'
import { useEffect, useState, useCallback } from 'react'

type RecipeListType = {
  id: number,
  title: string,
  slug: string
}

type RecipeListProps = {
  action?: (value: boolean) => void
}

const API_URL = import.meta.env.VITE_API_URL;

function RecipeList({action = () => {}}: RecipeListProps) {

    const [recipes, setRecipes] = useState<Array<RecipeListType>>([])

    const fetchJSONDataFrom = useCallback(async (path : string) => {
          const response = await fetch(path, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          });
          const data = await response.json();
          setRecipes(data.data);
        }, []);

    useEffect(() => {
      const path = `${API_URL}/recipes/`;
      fetchJSONDataFrom(path);

    }, [fetchJSONDataFrom]);

    const clickHandler = () => {
        action(false)
    }

    const content = (
        <>
        <ol className='list-decimal pl-4'>
          {recipes.map(recipe => <li className='underline' key={recipe.slug}>
            <Link to={`/${recipe.slug}`} onClick={clickHandler}>{recipe.title}</Link></li>
          )}
        </ol>
        </>
    )

    return content
}
export default RecipeList
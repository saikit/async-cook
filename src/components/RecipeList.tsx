import { Link } from 'react-router'
import { useEffect, useState } from 'react'

type RecipeListType = {
  id: number,
  title: string,
  slug: string
}

const API_URL = import.meta.env.VITE_API_URL;

function RecipeList() {

    const [recipes, setRecipes] = useState<Array<RecipeListType>>([])

    useEffect(() => {
        fetch(`${API_URL}/recipes`)
        .then(response => response.json())
        .then(response => {
            setRecipes(response.data);
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
    }, [])

    const content = (
        <>
        <ol className='list-decimal pl-4'>
          {recipes.map(recipe => <li className='underline' key={recipe.slug}>
            <Link to={recipe.slug}>{recipe.title}</Link></li>
          )}
        </ol>
        </>
    )

    return content
}
export default RecipeList
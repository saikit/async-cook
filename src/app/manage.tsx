import { Link } from 'react-router'
import { useContext } from 'react'
import RecipesListContext from "@/context/RecipesListProvider";

function ManageRecipes () {
    const context = useContext(RecipesListContext)
    const { recipesList } = context
    return (
        <>
        <h1>Manage Recipes Page</h1>
        <ol className='list-decimal pl-4 text-gray-900'>
          {recipesList?.map(recipe => <li className='underline' key={recipe.slug}>
            <Link className='text-gray-900' to={`/manage/update/${recipe.slug}`}>{recipe.title}</Link></li>
          )}
        </ol>
        </>
    )
}

export default ManageRecipes

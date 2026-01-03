import { Link } from 'react-router'
import { useContext } from 'react'
import RecipesListContext from "@/context/RecipesListProvider";
import { EggFried } from 'lucide-react';

function Landing() {
    const context = useContext(RecipesListContext)
    const { recipesList } = context

    const content = (
    <div className='p-4'>
        <h1 className="font-bold text-4xl mb-4 text-center">The Async Cook</h1>
        <h2 className='text-xl mb-4'>Async Cook is an App for mobile devices and tablets and a cookbook for home cooks with easy-to-follow recipes. App and recipes developed by <Link className='underline text-blue-500 whitespace-nowrap' to="http://saikithui.com" target='_blank'>Sai-Kit Hui</Link></h2>
        <h3 className='text-xl mb-2 font-bold uppercase'>Recipe List</h3>
        <ol className='list-decimal pl-4 text-gray-900'>
          {!recipesList &&(
          <EggFried className="animate-spin w-12 h-12 text-slate-800" />)}
          {recipesList.map(recipe => <li className='underline' key={recipe.slug}>
            <Link className='text-gray-900' to={`/${recipe.slug}`}>{recipe.title}</Link></li>
          )}
        </ol>
    </div>
    )

    return content
}

export default Landing
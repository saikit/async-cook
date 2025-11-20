import { Link } from 'react-router'
import { useEffect, useState } from 'react'


type RecipeListType = {
  id: number,
  title: string,
  slug: string
}

const API_URL = import.meta.env.VITE_API_URL;

function Index() {
  const [recipes, setRecipes] = useState<Array<RecipeListType>>([])

  useEffect(() => {
    fetch(`${API_URL}/recipes`)
      .then(response => response.json())
      .then(data => {
        setRecipes(data);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  }, [])

    if (recipes.length < 1) {
      return <div className='h-screen text-center'>Loading...</div>;
    }
    const content = (
    <div className='p-4'>
        <h1 className='font-bold text-2xl mb-4'>Welcome to Async Cook, an App and cookbook for mobile devices and tablets that display easy-to-follow recipes for home cooks. App and recipes developed by <Link className='underline text-blue-500' to="http://saikithui.com">Sai-Kit Hui</Link></h1>
        <h2 className='text-xl mb-2'>Recipe List</h2>
        <ul className='list-disc list-outside pl-4'>
          {recipes.map(recipe => <li className='underline' key={recipe.id}>
            <Link to={recipe.slug}>{recipe.title}</Link></li>
          )}
          {/* <li><Link to="pasta" className='underline'>Roasted Tomato and Garlic Pasta</Link></li>
          <li><Link to="lettuce" className='underline'>Boiled Lettuce in Oyster and Garlic Sauce</Link></li>
          <li><Link to="rice-pulse/weekday-zongzi" className='underline'>Weekday Zongzi</Link></li>
          <li><Link to="rice-pulse/bean-sweet-potato" className='underline'>Sweet Potato and Bean bowl</Link></li> */}
        </ul>
    </div>
    )

    return content
}
export default Index
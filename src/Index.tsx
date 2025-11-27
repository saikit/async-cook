import { Link } from 'react-router'
import RecipeList from './components/RecipeList'

function Index() {
    const content = (
    <div className='p-4'>
        <h1 className="font-bold text-3xl mb-4 text-center">The Async Cook</h1>
        <h2 className='text-2xl mb-4'>Async Cook is an App for mobile devices and tablets and a cookbook for home cooks with easy-to-follow recipes. App and recipes developed by <Link className='underline text-blue-500 whitespace-nowrap' to="http://saikithui.com">Sai-Kit Hui</Link></h2>
        <h3 className='text-xl mb-2 font-bold uppercase'>Recipe List</h3>
        <RecipeList />
    </div>
    )

    return content
}
export default Index
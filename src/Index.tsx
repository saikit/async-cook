import { Link } from 'react-router'

function Index() {
  return (
    <div className='p-4'>
        <h1 className='font-bold text-2xl mb-4'>Welcome to Async Cook, an App for mobile devices and tablets that display easy-to-follow recipes for home cooks. App and recipes developed by <Link className='underline' to="http://saikithui.com">Sai-Kit Hui</Link></h1>
        <h2 className='text-xl mb-2'>Recipe List</h2>
        <ul>
          <li><Link to="pasta" className='underline'>Roasted Tomato and Garlic Pasta</Link></li>
          <li><Link to="lestture" className='underline'>Boiled Lettuce in Oyster and Garlic Sauce</Link></li>
        </ul>
    </div>
  )
}
export default Index
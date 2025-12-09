import { Link } from "react-router"

function NotFound () {
    const content = (
    <div className='p-4'>
        <h1 className="font-bold text-3xl mb-4 text-center">404 - Page Not Found</h1>
        <h2 className='text-2xl mb-4'>Sorry, the page you are looking for does not exist.</h2>
        <p><Link className="underline text-blue-500" to="/">Return to homepage</Link></p>
    </div>
    )
    return content
}

export default NotFound
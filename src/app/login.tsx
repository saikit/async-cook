import { Button } from "@/components/ui/button"
import AuthContext from "../context/AuthenticationProvider"
import { useContext, useEffect } from "react"
import { getItem } from "../utils/sessionStorage"
import { useSearchParams, useNavigate } from "react-router"


function Login () {

    const { user, token, logoutUser, loginWithSSO } = useContext(AuthContext)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    // Handle OAuth callback on mount
    useEffect(() => {
        const code = searchParams.get('code')
        const provider = searchParams.get('provider')

        if(token) {
            navigate('/manage', { replace: true })
        }
        if (code) {
            loginWithSSO(code, provider)
                .then(() => {
                    // Clear the URL params after successful login
                    navigate('/manage', { replace: true })
                })
                .catch((error) => {
                    console.error('SSO login failed:', error)
                })
        }
    }, [searchParams, loginWithSSO, navigate])

    const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        logoutUser(getItem('token'))
    }

    const onGitHubClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const redirectUri = import.meta.env.VITE_OAUTH_REDIRECT_URI
        const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`
    }

    if(token){
        return <p>Welcome, {user}! <a onClick={onClick}>Logout</a></p>
    }

    const content = (
        <main className="p-4">
        <div className="text-center p-4">
            <Button 
                onClick={onGitHubClick}
                type="button"
                className="w-full bg-gray-800 hover:bg-gray-900 text-white"
            >
                Login with GitHub
            </Button>
        </div>
        </main>
    )

    return content
}

export default Login
import { Button } from '@/components/ui/button';
import { redirect } from 'react-router';
import { apiClient } from '@/lib/apiClient';
import type { Route } from './+types/login';

const API_URL = import.meta.env.VITE_API_URL;
const APP_URL = import.meta.env.VITE_URL;

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const provider = url.searchParams.get('provider') || 'github';

  if (code) {
    try {
      // Ensure CSRF protection is initialized for the session
      await fetch(`${APP_URL}/sanctum/csrf-cookie`, {
        method: 'GET',
        credentials: 'include',
      });

      await apiClient(`${API_URL}/login/${provider}/callback?code=${code}`, {
        includeAuth: true,
      });

      // Success: redirect to the management dashboard
      return redirect('/manage');
    } catch (error) {
      console.error('SSO login failed:', error);
    }
  }

  return null;
}

function Login() {
  const onGitHubClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const redirectUri = import.meta.env.VITE_OAUTH_REDIRECT_URI;
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  };

  const content = (
    <main className="p-4">
      <div className="text-center p-4">
        <h1 className="text-4xl mb-4 font-bold">Login</h1>
        <Button
          onClick={onGitHubClick}
          type="button"
          className="w-full bg-gray-800 hover:bg-gray-900 text-white"
        >
          Login with GitHub
        </Button>
      </div>
    </main>
  );

  return content;
}

export default Login;

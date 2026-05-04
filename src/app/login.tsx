import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { useAuthentication } from '@/context/AuthenticationProvider';
function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithSSO } = useAuthentication();

  useEffect(() => {
    const code = searchParams.get('code');
    const provider = searchParams.get('provider') || 'github';

    if (code) {
      loginWithSSO(code, provider)
        .then(() => {
          navigate('/manage');
        })
        .catch((error) => {
          console.error('SSO login failed:', error);
        });
    }
  }, [searchParams, loginWithSSO, navigate]);

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

import { Outlet } from 'react-router';
import { AuthenticationProvider } from '@/context/AuthenticationProvider';

function Login() {
  return (
    <AuthenticationProvider>
      <Outlet />
    </AuthenticationProvider>
  );
}

export default Login;

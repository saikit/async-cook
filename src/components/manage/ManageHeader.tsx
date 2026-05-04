import { Button } from '@/components/ui/button';
import { useNavigate, useRouteLoaderData } from 'react-router';
import { useAuthentication } from '@/context/AuthenticationProvider';
import type { Route } from '@/layouts/+types/Manage';
import type { UserType } from '@/middleware/auth';

function ManageHeader() {
  const data =
    useRouteLoaderData<Route.ComponentProps['loaderData']>('manage-layout');
  const user = data?.user as UserType | undefined;
  const navigate = useNavigate();
  const { logoutUser } = useAuthentication();

  const onClick = () => {
    logoutUser()
      .then((response) => {
        if (response) {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  if (!user) return <p className="p-4">Loading...</p>;

  const content = (
    <header className="p-4 flex justify-between items-center">
      <p>Welcome {user.name}!</p>
      <Button variant="destructive" onClick={onClick}>
        Logout
      </Button>
    </header>
  );

  return content;
}

export default ManageHeader;

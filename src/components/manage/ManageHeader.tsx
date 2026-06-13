import { Button } from '@/components/ui/button';
import { useNavigate, useRouteLoaderData } from 'react-router';
import { useAuthentication } from '@/context/AuthenticationProvider';
import type { Route } from '@/app/+types/manage';
import type { UserType } from '@/middleware/auth';
import { Link } from 'react-router';
import { useManage } from '@/context/Manage/ManageProvider';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';

function ManageHeader() {
  const [open, setOpen] = useState(false);
  const data =
    useRouteLoaderData<Route.ComponentProps['loaderData']>('manage-layout');
  const user = data?.user as UserType | undefined;
  const navigate = useNavigate();
  const { logoutUser } = useAuthentication();
  const { manageView } = useManage();
  const { recipes } = manageView;

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

  function handleClick(event: MouseEvent<HTMLAnchorElement>, path: string) {
    if (location.pathname === path) {
      event.preventDefault();
    } else {
      setOpen(false);
    }
  }

  const content = (
    <header>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className="rounded-full h-7 w-7 fixed top-2 left-2 bg-slate-200 opacity-80 transform flex z-2 justify-center print:hidden">
            <Menu className="" size={18} color="black" />
          </Button>
        </SheetTrigger>
        <SheetContent side="top" aria-describedby="Recipe List">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-center">
              <p>{user.name}'s recipes</p>
            </SheetTitle>
            <SheetDescription></SheetDescription>
            <nav>
              <ul className="text-gray-900 text-center">
                {recipes?.map((recipe) => (
                  <>
                    <li className="underline mb-1" key={recipe.slug}>
                      <Link
                        className="text-gray-900 mr-2 underline"
                        to={`/manage/update/${recipe.slug}`}
                        onClick={(e) =>
                          handleClick(e, `/manage/update/${recipe.slug}`)
                        }
                      >
                        {recipe.title}
                      </Link>
                    </li>
                  </>
                ))}
              </ul>
              <Button variant="destructive" onClick={onClick}>
                Logout
              </Button>
            </nav>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );

  return content;
}

export default ManageHeader;

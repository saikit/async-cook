import { ManageRecipesListProvider } from '@/context/Manage/ManageRecipesListProvider.tsx';
import { Outlet, type ClientLoaderFunctionArgs } from 'react-router';
import ManageHeader from '@/components/manage/ManageHeader';
import ManageBackgroundBanner from '@/components/manage/ManageBackgroundBanner.tsx';
import { AuthenticationProvider } from '@/context/AuthenticationProvider.tsx';
import { userContext, authMiddleware } from '@/middleware/auth.ts';
import { NotificationProvider } from '@/context/NotificationProvider.tsx';

export const clientMiddleware = [authMiddleware];

export async function clientLoader({ context }: ClientLoaderFunctionArgs) {
  return {
    user: context.get(userContext),
  };
}

export default function Manage() {
  return (
    <AuthenticationProvider>
      <NotificationProvider>
        <ManageBackgroundBanner />
        <ManageHeader />
        <ManageRecipesListProvider>
          <Outlet />
        </ManageRecipesListProvider>
      </NotificationProvider>
    </AuthenticationProvider>
  );
}

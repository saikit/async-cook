import { ManageProvider } from '@/context/Manage/ManageProvider';
import { Outlet, type ClientLoaderFunctionArgs } from 'react-router';
import ManageHeader from '@/components/manage/ManageHeader';
import { Toaster } from '@/components/ui/sonner';
import { AuthenticationProvider } from '@/context/AuthenticationProvider.tsx';
import { userContext, authMiddleware } from '@/middleware/auth.ts';

export const clientMiddleware = [authMiddleware];

export async function clientLoader({ context }: ClientLoaderFunctionArgs) {
  return {
    user: context.get(userContext),
  };
}

export default function Manage() {
  return (
    <AuthenticationProvider>
      <Toaster />
      <ManageHeader />
      <ManageProvider>
        <Outlet />
      </ManageProvider>
    </AuthenticationProvider>
  );
}

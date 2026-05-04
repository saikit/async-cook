import { createContext, redirect, type MiddlewareFunction } from 'react-router';
import { getHeaders } from '@/hooks/getHeaders';

export type UserType = {
  name: string;
  email: string;
} | null;

const API_URL = import.meta.env.VITE_API_URL;

export const userContext = createContext<UserType>(null);

export const authMiddleware: MiddlewareFunction = async ({ context }, next) => {
  const response = await fetch(API_URL + '/user', {
    headers: getHeaders(),
    credentials: 'include',
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw redirect('/login');
    }
    throw new Error('Failed to fetch user');
  }

  const user = await response.json();
  context.set(userContext, user);

  return next();
};

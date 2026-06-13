import { getCookie } from '@/utils/cookieStorage';

interface RequestOptions extends RequestInit {
  includeAuth?: boolean;
}

export async function apiClient<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { includeAuth = false, headers: customHeaders, ...rest } = options;

  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...((customHeaders as Record<string, string>) || {}),
  });

  if (includeAuth) {
    const xsrfToken = getCookie('XSRF-TOKEN');
    if (xsrfToken && !headers.has('X-XSRF-TOKEN')) {
      headers.set('X-XSRF-TOKEN', decodeURIComponent(xsrfToken));
    }
  }

  const response = await fetch(path, {
    headers, // Always send headers
    credentials: includeAuth ? 'include' : 'omit', // Conditionally include credentials
    ...rest,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const error = new Error(
      errorBody.message ||
        `API error: ${response.status} ${response.statusText}`,
    ) as Error & { status?: number; data?: unknown };
    error.status = response.status;
    error.data = errorBody;
    throw error;
  }

  return response.json();
}

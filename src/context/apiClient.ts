import { getHeaders } from '@/hooks/getHeaders';

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
    const authHeaders = getHeaders();
    Object.entries(authHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });
  }

  const response = await fetch(path, {
    headers,
    credentials: includeAuth ? 'include' : 'omit',
    ...rest,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const error = new Error(
      errorBody.message ||
        `API error: ${response.status} ${response.statusText}`,
    );
    (error as any).status = response.status;
    (error as any).data = errorBody;
    throw error;
  }

  return response.json();
}

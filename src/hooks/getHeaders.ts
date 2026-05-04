import { getCookie } from '@/utils/cookieStorage';

export function getHeaders() {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  const token = getCookie('XSRF-TOKEN');
  if (token) {
    headers.set('X-XSRF-TOKEN', token);
  }
  return headers;
}

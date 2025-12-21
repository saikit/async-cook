export const setItem = (key: string, value: unknown) => {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to set item in localStorage: ${key}`, error);
  }
};

export const getItem = (key: string) => {
  try {
    const item = window.sessionStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  } catch (error) {
    console.error(`Failed to get item from localStorage: ${key}`, error);
  }
};
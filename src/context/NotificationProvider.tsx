import {
  createContext,
  useState,
  useCallback,
  ReactNode,
  useContext,
} from 'react';

type NotificationContextType = {
  message: string | null;
  notify: (message: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const notify = useCallback((msg: string) => {
    setMessage(msg);
  }, []);

  return (
    <NotificationContext.Provider value={{ message, notify }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  return context;
};

import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNotification } from '@/context/NotificationProvider';

function ManageBackgroundBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { message } = useNotification();

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!isVisible || !message) return null;

  return (
    <Alert className=" w-80 fixed top-5 left-1/2 transform -translate-x-1/2">
      <AlertDescription>
        <p>{message}</p>
      </AlertDescription>
    </Alert>
  );
}

export default ManageBackgroundBanner;

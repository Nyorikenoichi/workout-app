import { useState } from 'react';

interface NotificationState {
  open: boolean;
  message: string;
}

type NotificationHookResult = [
  NotificationState,
  (errorMessage: string) => void,
  () => void
];

export default function useNotification(): NotificationHookResult {
  const [notification, setNotification] = useState<NotificationState>({
    open: false,
    message: '',
  });

  const showNotification = (errorMessage: string) => {
    setNotification({
      open: true,
      message: errorMessage,
    });
  };

  const closeNotification = () => {
    setNotification({
      open: false,
      message: '',
    });
  };

  return [notification, showNotification, closeNotification];
}

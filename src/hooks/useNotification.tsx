import { useEffect, useState } from 'react';
import { Paging } from '@models/Common';

class PagingNotify extends Paging {
  readType: string | null = null;
}

export const useNotification = () => {
  const [notifications, setNotifications] = useState()

  useEffect(() => {

  }, []);

  return { notifications };
}
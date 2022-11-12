import { useCallback, useState } from 'react';

import { StatusData } from '@interfaces/StatusData';
import { getStatus, Status } from '@enums/Status';
import { useWebsocket } from './useWebsocket';

export const useStatus = (pathname?: string) => {
  const [status, setStatus] = useState<StatusData>();

  const onMessage = useCallback((event: MessageEvent<Status>) => {
    setStatus(getStatus(event.data));
  }, []);

  const onClose = useCallback(() => {
    setStatus(getStatus(Status.DISCONNECTED));
  }, []);

  useWebsocket(pathname, onMessage, onClose);

  return {
    status,
  };
};

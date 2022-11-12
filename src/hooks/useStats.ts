import { useCallback, useState } from 'react';

import { StatsError } from '@interfaces/Stats';
import { useWebsocket } from './useWebsocket';

export function useStats<T>(pathname?: string) {
  const [stats, setStats] = useState<T>();
  const [error, setError] = useState<StatsError>();

  const onMessage = useCallback((event: MessageEvent<string>) => {
    const stats = JSON.parse(event.data) as T | StatsError;
    if ('error' in stats) {
      return setError(stats);
    }
    setStats(stats);
    setError(undefined);
  }, []);

  const onClose = useCallback(() => {
    setStats(undefined);
    setError(undefined);
  }, []);

  useWebsocket(pathname, onMessage, onClose);

  return {
    stats,
    error,
  };
}

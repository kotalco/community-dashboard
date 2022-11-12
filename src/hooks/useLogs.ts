import { useCallback, useState } from 'react';
import { useWebsocket } from './useWebsocket';

export const OPEN_CONNECTION_MSG = 'Connection Established.';
export const CLOSE_CONNECTION_MSG = 'Disconnected. Connection Closed.';

const MAX_LENGTH = 200;
const TIME_INTERVAL = 10000;

export const useLogs = (pathname: string) => {
  const [logs, setLogs] = useState<string[]>([]);

  const onOpen = useCallback(() => {
    setLogs((logs) => {
      if (logs.length > MAX_LENGTH) {
        return [...logs.splice(1), OPEN_CONNECTION_MSG];
      }
      return [...logs, OPEN_CONNECTION_MSG];
    });
  }, []);

  const onMessage = useCallback((event: MessageEvent<string>) => {
    setLogs((logs) => {
      if (logs.length > MAX_LENGTH) {
        return [...logs.splice(1), event.data];
      }
      return [...logs, event.data];
    });
  }, []);

  const onClose = useCallback(() => {
    setLogs((logs) => [
      ...logs,
      CLOSE_CONNECTION_MSG,
      `Will retry to connect in ${TIME_INTERVAL / 1000} seconds`,
    ]);
  }, []);

  const onCounter = useCallback((counter: number) => {
    setLogs((logs) => [
      ...logs.slice(0, -1),
      `Will retry to connect in ${counter / 1000} ${
        counter / 1000 === 1 ? 'second.' : 'seconds.'
      }`,
    ]);
  }, []);

  const { timeoutId, intervalId } = useWebsocket(
    pathname,
    onMessage,
    onClose,
    onOpen,
    onCounter
  );

  const cancelConnect = () => {
    setLogs((logs) => [...logs, 'Canceled']);
    if (timeoutId) clearTimeout(timeoutId);
    if (intervalId) clearInterval(intervalId);
  };

  return { logs, setLogs, cancelConnect };
};

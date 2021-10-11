import { useCallback, useEffect, useState } from 'react';

export const OPEN_CONNECTION_MSG = 'Connection Established.';
export const CLOSE_CONNECTION_MSG = 'Disconnected. Connection Closed.';

const NEXT_PUBLIC_WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL as string;
const MAX_LENGTH = 200;
const TIME_INTERVAL = 10000;

export const useLogs = (pathname: string) => {
  const [logs, setLogs] = useState<string[]>([]);

  const createWebsocket = useCallback(() => {
    const ws = new WebSocket(`${NEXT_PUBLIC_WS_BASE_URL}${pathname}`);

    ws.onopen = () => {
      setLogs((logs) => {
        if (logs.length > MAX_LENGTH) {
          return [...logs.splice(1), OPEN_CONNECTION_MSG];
        }
        return [...logs, OPEN_CONNECTION_MSG];
      });
    };

    ws.onmessage = (event: MessageEvent<string>) => {
      setLogs((logs) => {
        if (logs.length > MAX_LENGTH) {
          return [...logs.splice(1), event.data];
        }
        return [...logs, event.data];
      });
    };

    return { ws };
  }, [pathname]);

  useEffect(() => {
    const { ws } = createWebsocket();
    let timeoutId: NodeJS.Timeout;

    ws.onclose = () => {
      setLogs((logs) => {
        if (logs.length > MAX_LENGTH) {
          return [
            ...logs.splice(1),
            CLOSE_CONNECTION_MSG,
            `Will retry to connect in ${TIME_INTERVAL / 1000} seconds`,
          ];
        }
        return [
          ...logs,
          CLOSE_CONNECTION_MSG,
          `Will retry to connect in ${TIME_INTERVAL / 1000} seconds`,
        ];
      });

      timeoutId = setTimeout(() => {
        createWebsocket();
      }, TIME_INTERVAL);
    };

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      ws.onclose = () => {};
      ws.close();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [createWebsocket, pathname]);

  return { logs };
};

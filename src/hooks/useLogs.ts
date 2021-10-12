import { useCallback, useEffect, useRef, useState } from 'react';

export const OPEN_CONNECTION_MSG = 'Connection Established.';
export const CLOSE_CONNECTION_MSG = 'Disconnected. Connection Closed.';

const NEXT_PUBLIC_WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL as string;
const MAX_LENGTH = 200;
const TIME_INTERVAL = 10000;

export const useLogs = (pathname: string) => {
  const [logs, setLogs] = useState<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const websocketRef = useRef<WebSocket>();

  const connect = useCallback(() => {
    console.log('run');
    const ws = new WebSocket(`${NEXT_PUBLIC_WS_BASE_URL}${pathname}`);
    const check = () => {
      if (
        !websocketRef.current ||
        websocketRef.current.readyState === WebSocket.CLOSED
      )
        connect();
    };

    ws.onopen = () => {
      setLogs((logs) => {
        if (logs.length > MAX_LENGTH) {
          return [...logs.splice(1), OPEN_CONNECTION_MSG];
        }
        return [...logs, OPEN_CONNECTION_MSG];
      });

      websocketRef.current = ws;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    ws.onmessage = (event: MessageEvent<string>) => {
      setLogs((logs) => {
        if (logs.length > MAX_LENGTH) {
          return [...logs.splice(1), event.data];
        }
        return [...logs, event.data];
      });
    };

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

      timeoutRef.current = setTimeout(check, TIME_INTERVAL);
    };
  }, [pathname]);

  useEffect(() => {
    connect();
    return () => {
      if (websocketRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        websocketRef.current.onclose = () => {};
        websocketRef.current.close();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [connect]);

  return { logs };
};

import { useCallback, useEffect, useRef, useState } from 'react';

export const OPEN_CONNECTION_MSG = 'Connection Established.';
export const CLOSE_CONNECTION_MSG = 'Disconnected. Connection Closed.';

const NEXT_PUBLIC_WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL as string;
const MAX_LENGTH = 200;
const TIME_INTERVAL = 10000;

export const useLogs = (pathname: string) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [counter, setCounter] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const counterRef = useRef<NodeJS.Timer>();
  const websocketRef = useRef<WebSocket>();

  const connect = useCallback(() => {
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
      if (counterRef.current) {
        clearInterval(counterRef.current);
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
      setCounter(TIME_INTERVAL - 1000);
      setLogs((logs) => [
        ...logs,
        CLOSE_CONNECTION_MSG,
        `Will retry to connect in ${TIME_INTERVAL / 1000} seconds`,
      ]);

      timeoutRef.current = setTimeout(check, TIME_INTERVAL);
    };
  }, [pathname]);

  useEffect(() => {
    connect();

    return () => {
      // Stop listening to onclose() event then close the socket previuosly created
      if (websocketRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        websocketRef.current.onclose = () => {};
        websocketRef.current.close();
      }
      // Clear timeout function to prevent memory leak
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [connect]);

  useEffect(() => {
    if (counter > 0) {
      counterRef.current = setInterval(() => {
        setLogs((logs) => {
          return [
            ...logs.slice(0, -1),
            `Will retry to connect in ${counter / 1000} ${
              counter / 1000 === 1 ? 'second' : 'seconds'
            }`,
          ];
        });
        setCounter((counter) => counter - 1000);
      }, 1000);
    }

    return () => {
      // Clear interval function to prevern memory leak
      if (counterRef.current) clearInterval(counterRef.current);
    };
  }, [counter]);

  return { logs, setLogs };
};

import { useCallback, useEffect, useRef, useState } from 'react';

const TIME_INTERVAL = 10000;
const NEXT_PUBLIC_WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL as string;

export const useWebsocket = <T>(
  pathname: string | undefined,
  onMessageCallback: (event: MessageEvent<T>) => void,
  onCloseCallback: () => void
) => {
  const [counter, setCounter] = useState(0);

  const websocketRef = useRef<WebSocket>();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const counterRef = useRef<NodeJS.Timer>();

  const connect = useCallback(() => {
    if (!pathname) return;
    const ws = new WebSocket(`${NEXT_PUBLIC_WS_BASE_URL}${pathname}`);

    const check = () => {
      if (
        !websocketRef.current ||
        websocketRef.current.readyState === WebSocket.CLOSED
      ) {
        connect();
      }
    };
    ws.onopen = () => {
      websocketRef.current = ws;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (counterRef.current) {
        clearInterval(counterRef.current);
      }
    };

    ws.onmessage = onMessageCallback;

    ws.onclose = () => {
      setCounter(TIME_INTERVAL - 1000);
      onCloseCallback();

      timeoutRef.current = setTimeout(check, TIME_INTERVAL);
    };
  }, [onCloseCallback, onMessageCallback, pathname]);

  useEffect(() => {
    connect();

    return () => {
      console.log('clear');
      // Stop listening to onclose() event then close the socket previuosly created
      if (websocketRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        websocketRef.current.onclose = () => {};
        websocketRef.current.close();
        console.log('clear');
      }
      // Clear timeout function to prevent memory leak
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      // Clear interval function to prevern memory leak
      if (counterRef.current) clearInterval(counterRef.current);
    };
  }, [connect]);

  useEffect(() => {
    if (counter === TIME_INTERVAL - 1000) {
      counterRef.current = setInterval(() => {
        setCounter((counter) => counter - 1000);
      }, 1000);
    }
  }, [counter]);
};

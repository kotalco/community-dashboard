import { useCallback, useEffect, useRef, useState } from 'react';

import { StatusData } from '@interfaces/StatusData';
import { getStatus, Status } from '@enums/Status';
import { useWebsocket } from './useWebsocket';

const NEXT_PUBLIC_WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL as string;
const TIME_INTERVAL = 10000;

export const useStatus = (pathname?: string) => {
  const [status, setStatus] = useState<StatusData>();
  const [counter, setCounter] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const counterRef = useRef<NodeJS.Timer>();
  const websocketRef = useRef<WebSocket>();

  const onMessage = (event: MessageEvent<Status>) => {
    setStatus(getStatus(event.data));
  };

  const onClose = () => {
    setStatus(getStatus(Status.DISCONNECTED));
  };

  useWebsocket(pathname, onMessage, onClose);

  // const connect = useCallback(() => {
  //   if (!pathname) return;
  //   const ws = new WebSocket(`${NEXT_PUBLIC_WS_BASE_URL}${pathname}`);

  //   const check = () => {
  //     if (
  //       !websocketRef.current ||
  //       websocketRef.current.readyState === WebSocket.CLOSED
  //     )
  //       connect();
  //   };

  //   ws.onopen = () => {
  //     console.log('Listening to status...');

  //     websocketRef.current = ws;
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //     if (counterRef.current) {
  //       clearInterval(counterRef.current);
  //     }
  //   };

  //   ws.onmessage = (event: MessageEvent<Status>) => {
  //     setStatus(getStatus(event.data));
  //   };

  //   ws.onclose = () => {
  //     setCounter(TIME_INTERVAL - 1000);
  //     setStatus(getStatus(Status.DISCONNECTED));

  //     timeoutRef.current = setTimeout(check, TIME_INTERVAL);
  //   };
  // }, [pathname]);

  // useEffect(() => {
  //   connect();

  //   return () => {
  //     // Stop listening to onclose() event then close the socket previuosly created
  //     if (websocketRef.current) {
  //       // eslint-disable-next-line @typescript-eslint/no-empty-function
  //       websocketRef.current.onclose = () => {};
  //       websocketRef.current.close();
  //     }
  //     // Clear timeout function to prevent memory leak
  //     if (timeoutRef.current) clearTimeout(timeoutRef.current);
  //     // Clear interval function to prevern memory leak
  //     if (counterRef.current) clearInterval(counterRef.current);
  //   };
  // }, [connect]);

  // useEffect(() => {
  //   if (counter === TIME_INTERVAL - 1000) {
  //     counterRef.current = setInterval(() => {
  //       setCounter((counter) => counter - 1000);
  //     }, 1000);
  //   }
  // }, [counter]);

  return {
    status,
  };
};

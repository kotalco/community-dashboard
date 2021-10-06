import { useEffect, useState } from 'react';

export const useWebsocket = (pathname: string) => {
  const [logs, setLogs] = useState('');

  const NEXT_PUBLIC_WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL as string;

  useEffect(() => {
    const websocket = new WebSocket(`${NEXT_PUBLIC_WS_BASE_URL}${pathname}`);

    websocket.onopen = () => {
      setLogs(() => 'Connection Established \n');
    };
    websocket.onmessage = (event: MessageEvent<string>) => {
      setLogs((logs) => `${logs}${event.data}`);
    };

    return () => {
      websocket.close();
    };
  }, [NEXT_PUBLIC_WS_BASE_URL, pathname]);

  return { logs };
};

import { useEffect, useState } from 'react';

export const useLogs = (pathname: string) => {
  const [logs, setLogs] = useState<string[]>([]);

  const NEXT_PUBLIC_WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL as string;

  useEffect(() => {
    const websocket = new WebSocket(`${NEXT_PUBLIC_WS_BASE_URL}${pathname}`);

    websocket.onopen = () => {
      setLogs((logs) => [...logs, 'Connection Established']);
    };

    websocket.onmessage = (event: MessageEvent<string>) => {
      setLogs((logs) => [...logs, event.data]);
    };

    websocket.onclose = () => {
      setLogs((logs) => [...logs, 'Disconnected. Connection Closed']);
    };

    return () => {
      websocket.close();
    };
  }, [NEXT_PUBLIC_WS_BASE_URL, pathname]);

  return { logs };
};

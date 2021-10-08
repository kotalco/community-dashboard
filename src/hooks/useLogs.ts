import { useEffect, useState } from 'react';

export const useLogs = (pathname: string) => {
  const [logs, setLogs] = useState<string[]>([]);

  const NEXT_PUBLIC_WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL as string;
  const MAX_LENGTH = 200;

  useEffect(() => {
    const websocket = new WebSocket(`${NEXT_PUBLIC_WS_BASE_URL}${pathname}`);

    websocket.onopen = () => {
      setLogs((logs) => {
        if (logs.length > MAX_LENGTH) {
          return [...logs.splice(1), 'Connection Established'];
        }
        return [...logs, 'Connection Established'];
      });
    };

    websocket.onmessage = (event: MessageEvent<string>) => {
      setLogs((logs) => {
        if (logs.length > MAX_LENGTH) {
          return [...logs.splice(1), event.data];
        }
        return [...logs, event.data];
      });
    };

    websocket.onclose = () => {
      setLogs((logs) => {
        if (logs.length > MAX_LENGTH) {
          return [...logs.splice(1), 'Disconnected. Connection Closed'];
        }
        return [...logs, 'Disconnected. Connection Closed'];
      });
    };

    return () => {
      websocket.close();
    };
  }, [NEXT_PUBLIC_WS_BASE_URL, pathname]);

  return { logs };
};

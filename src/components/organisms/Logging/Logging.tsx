import {
  useLogs,
  CLOSE_CONNECTION_MSG,
  OPEN_CONNECTION_MSG,
} from '@hooks/useLogs';

interface Props {
  wsUrl: string;
}

function Logging({ wsUrl }: Props) {
  const { logs, setLogs, timeoutId, intervalId, ws } = useLogs(wsUrl);

  const cancelConnect = () => {
    setLogs((logs) => [...logs, 'Canceled']);
    if (timeoutId) clearTimeout(timeoutId);
    if (intervalId) clearInterval(intervalId);
  };

  return (
    <div className="p-3 sm:p-6">
      <div className="border border-black h-96 bg-black overflow-y-auto text-white text-xs px-3 overscroll-container">
        <ul>
          {logs.map((log, i) => (
            <li
              className={`${
                log === OPEN_CONNECTION_MSG
                  ? 'text-green-500'
                  : log === CLOSE_CONNECTION_MSG
                  ? 'text-red-500'
                  : ''
              }`}
              key={i}
            >
              {log.includes('second') && i === logs.length - 1 ? (
                <span>
                  {log}
                  {` `}
                  <button
                    type="button"
                    disabled={ws?.readyState === WebSocket.OPEN}
                    onClick={cancelConnect}
                    className={`underline hover:no-underline text-xs text-red-500 disabled:sr-only`}
                  >
                    Cancel
                  </button>
                </span>
              ) : (
                <span>{log}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Logging;

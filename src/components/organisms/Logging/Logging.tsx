import {
  useLogs,
  CLOSE_CONNECTION_MSG,
  OPEN_CONNECTION_MSG,
} from '@hooks/useLogs';

interface Props {
  wsUrl: string;
}

function Logging({ wsUrl }: Props) {
  const { logs, cancelConnect } = useLogs(wsUrl);

  return (
    <div className="p-3 sm:p-6">
      <div className="px-3 overflow-y-auto text-sm text-white bg-black border border-black h-96 overscroll-container">
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

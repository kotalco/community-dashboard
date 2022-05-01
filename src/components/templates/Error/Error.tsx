import Link from 'next/link';

interface Props {
  statusCode?: number;
  statusText?: string;
  message?: string;
}

const Error: React.FC<React.PropsWithChildren<Props>> = ({
  statusCode = 500,
  statusText = 'Something Wrong happened',
  message,
}) => {
  return (
    <div className="flex flex-col min-h-screen pt-16 pb-12 bg-white">
      <main className="flex flex-col justify-center w-full px-4 mx-auto grow max-w-7xl sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">
              {statusCode} error
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              {statusText}
            </h1>
            {message && (
              <p className="mt-2 text-base text-gray-500">{message}</p>
            )}
            <div className="mt-6">
              <Link href="/">
                <a className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                  Go back home<span aria-hidden="true"> &rarr;</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Error;

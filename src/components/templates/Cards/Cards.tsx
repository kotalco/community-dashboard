import { ExclamationIcon } from '@heroicons/react/outline';

interface Props {
  error?: string;
}

const Cards: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  error,
}) => {
  return (
    <div className="relative">
      <dl
        className={`grid grid-cols-1 gap-5 mb-5 sm:grid-cols-3 ${
          error ? 'blur-lg' : ''
        }`}
      >
        {children}
      </dl>
      {error && (
        <div className="absolute inset-0 flex items-center justify-center space-x-4">
          <ExclamationIcon
            className="w-10 h-10 leading-9 text-yellow-500"
            aria-hidden="true"
          />
          <p className="text-3xl text-gray-600">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Cards;

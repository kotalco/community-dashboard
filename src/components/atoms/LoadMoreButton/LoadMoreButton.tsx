import SpinnerIcon from '@components/Icons/SpinnerIcon/SpinnerIcon';

interface Props {
  onChange: () => void;
  isLoading: boolean | undefined;
}

function LoadMoreButton({ onChange, isLoading }: Props) {
  return (
    <div className="flex justify-center items-center py-4">
      <button
        onClick={onChange}
        disabled={isLoading}
        className="text-sm text-indigo-500 hover:text-indigo-600 disabled:hover:text-indigo-500 disabled:pointer-events-none"
      >
        {isLoading ? <SpinnerIcon className="h-4 w-4" /> : 'Load More...'}
      </button>
    </div>
  );
}

export default LoadMoreButton;

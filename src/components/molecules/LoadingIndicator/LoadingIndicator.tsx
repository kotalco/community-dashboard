import SpinnerIcon from '@components/Icons/SpinnerIcon/SpinnerIcon';

const LoadingIndicator: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <div
      data-testid="loading"
      className="w-screen h-screen flex justify-center items-center"
    >
      <SpinnerIcon className="w-10 h-10" />
    </div>
  );
};

export default LoadingIndicator;

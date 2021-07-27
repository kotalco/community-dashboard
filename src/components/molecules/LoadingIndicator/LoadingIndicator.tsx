import SpinnerIcon from '@components/Icons/SpinnerIcon/SpinnerIcon';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <SpinnerIcon className="w-10 h-10" />
    </div>
  );
};

export default LoadingIndicator;

interface Props {
  className: string;
}

const EthereumIcon: React.FC<React.PropsWithChildren<Props>> = ({
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth={2}
      stroke="#000"
      className={className}
    >
      <path d="M32 56L16 32 32 8l16 24-16 24z" />
      <path d="M16 32l16 8 16-8" />
      <path d="M32 8v48" />
    </svg>
  );
};

export default EthereumIcon;

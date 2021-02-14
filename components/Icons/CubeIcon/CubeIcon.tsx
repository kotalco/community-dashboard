interface Props {
  className?: string;
}

const CubeIcon: React.FC<Props> = ({ className }) => {
  return (
    // Heroicon name: cube
    <svg
      className={`${className} mr-4 h-6 w-6`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  );
};

export default CubeIcon;

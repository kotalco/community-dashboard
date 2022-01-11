interface Props {
  className: string;
}

const FilecoinIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth={3}
      strokeMiterlimit={5}
      stroke="#000"
      className={className}
    >
      <path d="M39.19 17.32a3.2 3.2 0 0 0-1.37-.57 3.24 3.24 0 0 0-3.72 2.66l-4.24 25.41a3 3 0 0 1-3.45 2.47 3 3 0 0 1-1.68-.89" />
      <path d="m39.4 36.27-15.78-2.63" />
      <path d="m24.6 27.73 15.78 2.63" />
      <circle cx="32" cy="32" r="24" />
    </svg>
  );
};

export default FilecoinIcon;

interface Props {
  className: string;
}

const ChainlinkIcon: React.FC<Props> = ({ className }) => {
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
      <path d="M56 20v24L32 56 8 44V20L32 8l24 12z" />
      <path d="M44 26v12l-12 6-12-6V26l12-6 12 6z" />
    </svg>
  );
};

export default ChainlinkIcon;

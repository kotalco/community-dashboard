import Link from 'next/link';
import SpinnerIcon from '@components/Icons/SpinnerIcon/SpinnerIcon';

interface Props {
  onClick?: () => void;
  alert?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  onClick,
  disabled,
  loading,
  className,
  href,
  type = 'button',
}) => {
  if (href) {
    return (
      <Link href={href}>
        <a className={className}>{children}</a>
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={className}
    >
      {loading && <SpinnerIcon className="-ml-1 mr-3 h-5 w-5 text-white" />}
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  loading: false,
};

export default Button;

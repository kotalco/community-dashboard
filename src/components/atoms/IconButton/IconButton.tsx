import { MouseEvent, ReactElement, forwardRef } from 'react';

interface Props {
  className?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactElement;
}

const IconButton = forwardRef<HTMLButtonElement, Props>(function IconButton(
  { className, onClick, children },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={`${
        className ? className : ''
      } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

export default IconButton;

import { MouseEvent, ReactElement, forwardRef } from 'react';

interface Props {
  srText: string;
  className?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactElement;
}

const IconButton = forwardRef<HTMLButtonElement, Props>(function IconButton(
  { srText, className, onClick, children },
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
      <span className="sr-only">{srText}</span>
      {children}
    </button>
  );
});

export default IconButton;

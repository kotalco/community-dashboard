import { LabelHTMLAttributes } from 'react';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  children: string;
  labelClassName?: string;
}

function InputLabel({ children, labelClassName, ...props }: Props) {
  return (
    <label
      htmlFor={props.htmlFor}
      className={`${
        labelClassName ? labelClassName : ''
      } block text-sm font-medium text-gray-700 mb-1`}
    >
      {children}
    </label>
  );
}

export default InputLabel;

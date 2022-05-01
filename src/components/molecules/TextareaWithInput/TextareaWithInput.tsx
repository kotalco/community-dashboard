import React, {
  useState,
  // useRef, useEffect,
} from 'react';
import { InformationCircleIcon } from '@heroicons/react/solid';
import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';

import Tooltip from '@components/atoms/Tooltip/Tooltip';

type Props = {
  name: string;
  label: string;
  value: string[] | undefined;
  multiple?: boolean;
  tooltip?: string;
  helperText?: string;
  onChange: (value: string[]) => void;
} & (
  | { errors?: never; error?: never }
  | { error: string | undefined; errors: FieldErrors }
);

const TextareaWithInput: React.FC<React.PropsWithChildren<Props>> = ({
  value,
  name,
  label,
  error,
  helperText,
  onChange,
  multiple,
  tooltip,
  errors,
}) => {
  const [text, setText] = useState(value?.join('\n') || '');
  // const isMounted = useRef(false);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     onChange([]);
  //     setText('');
  //   } else {
  //     isMounted.current = true;
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [multiple]);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = e.target;
    setText(value);
    onChange(value ? value.split('\n') : []);
  };

  return (
    <div className="max-w-xs mb-4 sm:col-span-6">
      <div className="flex items-center">
        <label
          htmlFor={name}
          className="relative text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        {tooltip && (
          <Tooltip title={tooltip}>
            <InformationCircleIcon className="w-4 h-4 text-indigo-400" />
          </Tooltip>
        )}
      </div>

      <div className="max-w-xs mt-1">
        {multiple ? (
          <textarea
            onChange={handleChange}
            id={name}
            name={name}
            value={text}
            rows={5}
            className="block w-full border-gray-300 rounded-md shadow-sm resize-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        ) : (
          <input
            onChange={handleChange}
            id={name}
            name={name}
            value={text}
            type="text"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
          />
        )}
      </div>
      {helperText && <p className="mt-2 text-sm text-gray-500">{helperText}</p>}
      {error && (
        <ErrorMessage
          errors={errors}
          name={error}
          as={<p className="mt-2 text-sm text-red-600" />}
        />
      )}
    </div>
  );
};
export default TextareaWithInput;

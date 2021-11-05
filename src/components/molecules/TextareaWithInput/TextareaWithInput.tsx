import React, {
  useState,
  // useRef, useEffect,
  ReactNode,
} from 'react';
import { InformationCircleIcon } from '@heroicons/react/solid';

interface Props {
  name: string;
  label: string;
  value: string[] | undefined;
  multiple?: boolean;
  tooltip?: string;
  helperText?: string;
  error?: ReactNode;
  onChange: (value: string[]) => void;
}

const TextareaWithInput: React.FC<Props> = ({
  value,
  name,
  label,
  error,
  helperText,
  onChange,
  multiple,
  tooltip,
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
    <div className="sm:col-span-6">
      <div className="flex items-center">
        <label
          htmlFor={name}
          className="relative text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        {tooltip && (
          <div className="inline-flex flex-col justify-center items-center relative group ml-1">
            <InformationCircleIcon className="h-4 w-4 text-indigo-400" />
            <div className="absolute bottom-0 group-hover:flex flex-col items-center hidden mb-6">
              <span className="relative z-10 p-2 text-xs rounded leading-none text-white whitespace-nowrap bg-gray-700 shadow-lg">
                {tooltip}
              </span>
              <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-700" />
            </div>
          </div>
        )}
      </div>

      <div className="mt-1 max-w-xs">
        {multiple ? (
          <textarea
            onChange={handleChange}
            id={name}
            name={name}
            value={text}
            rows={5}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          ></textarea>
        ) : (
          <input
            onChange={handleChange}
            id={name}
            name={name}
            value={text}
            type="text"
            className="shadow-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 disabled:bg-gray-100 disabled:text-gray-500"
          />
        )}
      </div>
      {helperText && <p className="mt-2 text-sm text-gray-500">{helperText}</p>}
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
};
export default TextareaWithInput;

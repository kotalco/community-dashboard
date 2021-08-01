import React, { useState } from 'react';

interface Props {
  name: string;
  label: string;
  value: string[] | undefined;
  multiple?: boolean;
  helperText?: string;
  error?: string;
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
  // }, [multiple]);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = e.target;
    setText(value);
    onChange(value.split('\n'));
  };

  return (
    <div className="sm:col-span-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
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

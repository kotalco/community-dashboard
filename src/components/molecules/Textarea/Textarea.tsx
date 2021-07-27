import React from 'react';
import InputLabel from '@components/atoms/InputLabel/InputLabel';

interface Props {
  label?: string;
  name: string;
  error?: string;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  { label, name, error, onChange, onBlur },
  ref
) {
  return (
    <div>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <div className="mt-1 max-w-xs">
        <textarea
          ref={ref}
          name={name}
          id={name}
          rows={5}
          onChange={onChange}
          onBlur={onBlur}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        ></textarea>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
});

export default Textarea;

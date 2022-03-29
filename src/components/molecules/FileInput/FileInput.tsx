import React, { useRef, useState } from 'react';
import { UploadIcon } from '@heroicons/react/outline';

import InputLabel from '@components/atoms/InputLabel/InputLabel';

interface Props {
  name: string;
  label: string;
  error?: string;
  onChange: (file: string) => void;
}

const FileInput = React.forwardRef<HTMLInputElement, Props>(function FileInput(
  { name, label, onChange, error },
  ref
) {
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string')
          onChange(e.target.result.split(',')[1]);
      };
      setFileName(files[0].name);
    }
  };

  return (
    <>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <div className="flex max-w-xs mb-4 rounded-md shadow-sm">
        <input
          ref={ref}
          type="text"
          disabled
          value={fileName}
          placeholder="Choose a file..."
          className="block w-full pl-3 text-gray-500 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md sm:text-sm"
        />
        <button
          type="button"
          onClick={() => {
            fileInputRef.current?.click();
          }}
          className="relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <UploadIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
          <span>Upload</span>
        </button>
      </div>

      <input
        type="file"
        onChange={handleChange}
        ref={fileInputRef}
        name={name}
        id={name}
        className="sr-only"
      />
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </>
  );
});

export default FileInput;

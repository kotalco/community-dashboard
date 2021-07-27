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
      <div className="flex rounded-md shadow-sm max-w-xs">
        <input
          ref={ref}
          type="text"
          disabled
          value={fileName}
          placeholder="Choose a file..."
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-3 sm:text-sm border-gray-300 text-gray-500"
        />
        <button
          type="button"
          onClick={() => {
            fileInputRef.current?.click();
          }}
          className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <UploadIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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

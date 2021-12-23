import { RadioGroup } from '@headlessui/react';

import { SelectOption } from '@interfaces/SelectOption';

interface Props {
  options: SelectOption[];
  value: string | undefined;
  onChange: (value: string) => void;
  error?: string;
}

const CustomRadioGroup: React.FC<Props> = ({
  options,
  value,
  onChange,
  error,
}) => {
  return (
    <RadioGroup value={value} onChange={onChange} className="mb-4">
      <RadioGroup.Label className="block mb-1 text-sm font-medium text-gray-700">
        Consensus
      </RadioGroup.Label>
      <div className="flex max-w-xs space-x-10 bg-white rounded-md">
        {options.map(({ label, value }) => (
          <RadioGroup.Option
            key={value}
            value={value}
            className={({ checked }) =>
              `${
                checked
                  ? 'bg-indigo-50 border-indigo-200 z-10'
                  : 'border-gray-200'
              } rounded-md relative border px-9 py-2 flex cursor-pointer focus:outline-none`
            }
          >
            {({ active, checked }) => (
              <div className="flex items-center">
                <span
                  className={`${
                    checked
                      ? 'bg-indigo-600 border-transparent'
                      : 'bg-white border-gray-300'
                  } ${
                    active ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
                  } h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center`}
                  aria-hidden="true"
                >
                  <span className="rounded-full bg-white w-1.5 h-1.5" />
                </span>
                <div className="flex flex-col ml-3">
                  <RadioGroup.Label
                    as="span"
                    className={`${checked ? 'text-indigo-900' : 'text-gray-900'}
                            block text-sm font-medium`}
                  >
                    {label}
                  </RadioGroup.Label>
                </div>
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </RadioGroup>
  );
};

export default CustomRadioGroup;

import { Switch } from '@headlessui/react';

interface Props {
  label: string;
  checked: boolean;
  helperText?: string;
  error?: string;
  onChange: (state: boolean) => void;
}

const Toggle: React.FC<Props> = ({
  label,
  checked,
  helperText,
  onChange,
  error,
}) => {
  return (
    <>
      <Switch.Group as="div" className="flex items-center mb-4">
        <Switch
          checked={checked}
          onChange={onChange}
          className={`${
            checked ? 'bg-indigo-600' : 'bg-gray-200'
          } relative inline-flex shrink-0  h-6 w-11 border-2 border-trasnparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${
              checked ? 'translate-x-5' : 'translate-x-0'
            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
          ></span>
        </Switch>
        <Switch.Label as="span" className="ml-3">
          <span className="text-sm font-medium text-gray-900">{label}</span>
          {helperText && (
            <span className="text-sm text-gray-500">{helperText}</span>
          )}
        </Switch.Label>
      </Switch.Group>
      {error && (
        <p role="error" className="text-sm text-red-600 mt-2">
          {error}
        </p>
      )}
    </>
  );
};

export default Toggle;

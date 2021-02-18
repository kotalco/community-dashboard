import InputLabel from '@components/atoms/InputLabel/InputLabel';

interface Props {
  label: string;
  name: string;
  id: string;
  value?: string;
  unit: string;
}

const UnitTextInput: React.FC<Props> = ({ label, name, id, value, unit }) => {
  return (
    <div className="w-48 mt-4">
      <div>
        <div>
          <InputLabel
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </InputLabel>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
              type="text"
              value={value}
              name={name}
              id={id}
              aria-describedby={name}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">{unit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitTextInput;

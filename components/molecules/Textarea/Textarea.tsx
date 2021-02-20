import Typography from '@components/atoms/Typgraphy/Typography';

interface Props {
  label: string;
  id: string;
  helperText: string;
}

const Textarea: React.FC<Props> = ({ id, label, helperText }) => {
  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          rows={4}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-96 sm:text-sm border-gray-300 rounded-md"
        ></textarea>
      </div>
      <Typography variant="p" className="mt-2 text-sm text-gray-500">
        {helperText}
      </Typography>
    </>
  );
};

export default Textarea;

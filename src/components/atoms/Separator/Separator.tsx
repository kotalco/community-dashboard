interface Props {
  label?: string;
}

const Separator: React.FC<Props> = ({ label }) => {
  return (
    <div className="relative my-6">
      <div className="inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-100"></div>
      </div>

      <div className="relative flex justify-center">
        <span className="px-2 bg-white text-sm text-gray-300">{label}</span>
      </div>
    </div>
  );
};

export default Separator;

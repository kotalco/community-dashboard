interface Props {
  dataList: { label: string; value: string }[];
}

const ProtocolDetails: React.FC<Props> = ({ dataList }) => {
  return (
    <div className="px-4 py-3 sm:px-6 sm:py-4">
      {dataList.map(({ label, value }) => (
        <dl key={value} className="mt-2">
          <dt className="block text-sm font-medium text-gray-700">{label}:</dt>
          <dd className="text-gray-500 text-sm">{value}</dd>
        </dl>
      ))}
    </div>
  );
};

export default ProtocolDetails;

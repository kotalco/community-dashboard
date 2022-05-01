import { DataList } from '@interfaces/DataList';

interface Props {
  dataList: DataList[];
}

const ProtocolDetails: React.FC<React.PropsWithChildren<Props>> = ({
  dataList,
}) => {
  return (
    <div className="px-4 py-3 sm:px-6 sm:py-4">
      {dataList.map(({ label, value, href }) => (
        <dl key={`${value}-${label}`} className="mt-3 first:mt-1">
          <dt className="block text-sm font-medium text-gray-700">{label}</dt>
          <dd className="mt-1 text-sm text-gray-500">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 underline hover:text-indigo-700"
              >
                {value}
              </a>
            ) : (
              value
            )}
          </dd>
        </dl>
      ))}
    </div>
  );
};

export default ProtocolDetails;

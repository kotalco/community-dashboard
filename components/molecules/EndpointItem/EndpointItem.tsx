import Link from 'next/link';

import Typography from '@components/atoms/Typgraphy/Typography';
import CubeIcon from '@components/Icons/CubeIcon/CubeIcon';

interface Props {
  name: string;
  nodeName: string;
}

const EndpointItem: React.FC<Props> = ({ name, nodeName }) => {
  return (
    <li>
      <Link href="/endpoint/id">
        <a className="block hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <Typography
                variant="p"
                className="text-sm font-medium text-indigo-600 truncate"
              >
                {name}
              </Typography>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <Typography
                  variant="p"
                  className="flex items-center text-sm text-gray-500"
                >
                  <CubeIcon />
                  {nodeName}
                </Typography>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default EndpointItem;

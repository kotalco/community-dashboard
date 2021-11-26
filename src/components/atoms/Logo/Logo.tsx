import Image from 'next/image';

const Logo: React.FC = () => {
  return (
    <div className="flex-shrink-0 flex items-center font-nunito">
      <Image src="/images/logo.svg" alt="logo" width={50} height={50} />
      <p className="ml-3 text-4xl font-bold">Kotal</p>
      <sup className="text-sm text-gray-500 font-normal inline-block -mt-2 ml-1">
        alpha
      </sup>
    </div>
  );
};

export default Logo;

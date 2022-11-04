import Image from 'next/image';

const Logo: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <div className="flex items-center shrink-0 font-nunito">
      <Image src="/images/logo.svg" alt="logo" width={50} height={50} />
      <p className="ml-3 text-4xl font-bold">Kotal</p>
    </div>
  );
};

export default Logo;

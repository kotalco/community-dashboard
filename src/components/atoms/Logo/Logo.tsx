import Image from 'next/image';

const Logo: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <div className="flex items-center space-x-3 shrink-0 font-nunito">
      <Image src="/images/logo.svg" alt="logo" width={50} height={50} />
      <p className="mt-5 text-4xl font-bold leading-4">
        Kotal <br />
        <span className="block mt-2 text-sm font-thin tracking-wider text-[#EF6b74] uppercase">
          community
        </span>
      </p>
    </div>
  );
};

export default Logo;

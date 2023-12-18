import Image from "next/image";
export const TaskmannLogo = () => {
  return (
    <Image
      lazy
      width={100}
      height={100}
      alt="logo"
      className="logo"
      src="/assets/trademarks/taskmann-logo.png"
    />
  );
};

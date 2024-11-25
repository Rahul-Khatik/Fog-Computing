import Image from "next/image";

export const Architecture = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[400px] h-[400px] sm:w-[450px] sm:h-[450px] md:w-[500px] md:h-[500px]">
          <Image
            src="/architecture.png"
            fill
            className="object-contain"
            alt="Documents"
          />
        </div>
        {/* hidden is for hide the images when rendering in mobile device. only one images will be shown.*/}
        <div className="hidden md:block relative w-[500px] h-[500px]">
          <Image
            src="/architecture2.png"
            fill
            className="object-contain"
            alt="Reading"
          />
        </div>
      </div>
    </div>
  );
};

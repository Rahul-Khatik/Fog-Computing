import { Architecture } from "./_components/architecture";
import { Description } from "./_components/description";
import { Footer } from "@/components/footer";
import { Heading } from "./_components/heading";

const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col dark:bg-[#1F1F1F]">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <Architecture />
        <Description />
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;

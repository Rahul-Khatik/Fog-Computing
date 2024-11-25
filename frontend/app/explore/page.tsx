import { Footer } from "@/components/footer";
import { Works } from "./_components/works";
import { ArchitectureButton } from "./_components/architectureButton";

const ExplorePage = () => {
  return (
    <div className="min-h-full flex flex-col dark:bg-[#1F1F1F]">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-0 flex-1 px-6 pb-10">
        <Works />
        <ArchitectureButton/>
      </div>
      <Footer />
    </div>
  );
};

export default ExplorePage;

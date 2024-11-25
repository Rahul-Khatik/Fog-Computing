import { Button } from "@/components/ui/button";
import Link from "next/link";

export const ArchitectureButton = () => {
  return (
    <>
      <div className="flex flex-col w-full space-y-1 p-6">
        <div className="flex items-center justify-center text-center text-3xl font-bold">
          Explore Architecture
        </div>
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-between w-full pt-4">
          <div className="flex justify-center md:justify-start w-full md:w-auto">
            <Link href="/client-server">
              <Button
                variant="destructive"
                size="lg"
                style={{ background: "#b4c917" }}
                className="text-1xl w-full md:w-auto"
              >
                Client-Server
              </Button>
            </Link>
          </div>
          <div className="flex justify-center md:justify-start w-full md:w-auto">
            <Link href="/client-fognode-server">
              <Button
                variant="destructive"
                size="lg"
                style={{ background: "#ef9e20" }}
                className="text-1xl w-full md:w-auto"
              >
                Client-Fog Node-Server
              </Button>
            </Link>
          </div>
          <div className="flex justify-center md:justify-start w-full md:w-auto">
            <Link href="/client-multiplefognode-server">
              <Button
                variant="destructive"
                size="lg"
                style={{ background: "#17c9b2" }}
                className="text-1xl w-full md:w-auto"
              >
                Client-Multiple Fog Node-Server
              </Button>
            </Link>
          </div>
          <div className="flex justify-center md:justify-start w-full md:w-auto">
            <Link href="">
              <Button
                variant="destructive"
                size="lg"
                style={{ background: "#4892bf" }}
                className="text-1xl w-full md:w-auto"
              >
                Multiple Client-Multiple Fog Node-Server
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

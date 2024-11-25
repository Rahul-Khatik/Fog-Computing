"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const scrolled = useScrollTop();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className={cn(
          "z-50 bg-background fixed top-0 flex items-center w-full p-6",
          scrolled && "border-b shadow-sm"
        )}
      >
        <span className="text-2xl font-bold">Fog Computing</span>

        <div className="ml-auto flex items-center md:hidden">
          <Button variant="ghost" size="sm" onClick={toggleMenu}>
            {isOpen ? <ChevronsLeft /> : <MenuIcon />}
          </Button>
        </div>

        <div
          className={cn(
            "md:ml-auto md:justify-end justify-between w-30 flex items-center gap-x-2",
            "hidden md:flex"
          )}
        >
          <Link href="/">
            <Button variant="ghost" size="sm">
              Home
            </Button>
          </Link>

          <Link href="/explore">
            <Button variant="ghost" size="sm">
              Explore
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger>Architecture</DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href="/client-server">
                <DropdownMenuItem>Client-Server</DropdownMenuItem>
              </Link>
              <Link href="/client-fognode-server">
                <DropdownMenuItem>Client-FogNode-Server</DropdownMenuItem>
              </Link>
              <Link href="/client-multiplefognode-server">
                <DropdownMenuItem>
                  Client-Multiple Fog Node-Server
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                Multiple Client-Multiple Fog Node-Server
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div
        className={cn(
          "fixed top-0 left-0 w-full h-full bg-background z-40 flex flex-col p-6 transition-transform duration-300 ease-in-out",
          isOpen ? "transform translate-x-0" : "transform -translate-x-full"
        )}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMenu}
          className="self-end"
        >
          <ChevronsLeft />
        </Button>
        <div
          className="flex flex-col items-center gap-y-4 mt-6"
          style={{ backgroundColor: "hsl(var(--secondary))" }}
        >
          <Button variant="ghost" size="sm" onClick={toggleMenu}>
            <Link href="/">Home</Link>
          </Button>

          <Button variant="ghost" size="sm" onClick={toggleMenu}>
            <Link href="/explore">Explore</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger>Architecture</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Client-Server</DropdownMenuItem>
              <DropdownMenuItem>Client-FogNode-Server</DropdownMenuItem>
              <DropdownMenuItem>
                Client-Multiple Fog Node-Server
              </DropdownMenuItem>
              <DropdownMenuItem>
                Multiple Client-Multiple Fog Node-Server
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

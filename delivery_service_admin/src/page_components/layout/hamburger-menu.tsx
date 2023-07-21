"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import SidebarMenu from "./sidebar-menu";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <>
      {open ? (
        <div ref={ref}>
          <X
            className="absolute visible md:invisible top-5 left-5 z-50 text-white"
            onClick={() => setOpen(false)}
          />
          <SidebarMenu className="w-1/2 sm:w-1/3 pt-12" />
        </div>
      ) : (
        <Menu
          className="absolute visible md:invisible top-5 left-5 z-50"
          onClick={() => setOpen(true)}
        />
      )}
    </>
  );
}

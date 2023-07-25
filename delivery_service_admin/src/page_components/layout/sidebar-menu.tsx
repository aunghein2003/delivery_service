"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Bike, Package, Store, Truck, UserCircle2 } from "lucide-react";
import Image from "next/image";

interface SidebarMenuProps extends React.AllHTMLAttributes<HTMLDivElement> {}

export default function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "h-screen py-7 [&>*]:px-7 fixed top-0 left-0 text-white bg-slate-800",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-x-5 py-5 pb-7">
        <UserCircle2 className="w-8 h-8 text-[#96f5f5]" />
        <div>
          <h1 className="text-lg text-[#96f5f5]">Admin</h1>
          <h3 className="text-sm text-slate-300">Admin</h3>
        </div>
      </div>
      <div className="pt-7 space-y-9 border-t-2 border-t-[#FFFFCC]">
        {navs.map((item, i) => (
          <div key={i}>
            <Link
              href={item.href}
              className={`flex gap-x-5 ${
                pathname.startsWith(item.href)
                  ? "text-[#FFD699]"
                  : "text-slate-200"
              }`}
            >
              {item.icon} {item.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const navs = [
  {
    title: "Biker",
    href: "/biker",
    icon: <Bike />,
  },
  {
    title: "Online Shop",
    href: "/online-shop",
    icon: <Store />,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: <Package />,
  },
  {
    title: "Delivery",
    href: "/delivery",
    icon: <Truck />,
  },
];

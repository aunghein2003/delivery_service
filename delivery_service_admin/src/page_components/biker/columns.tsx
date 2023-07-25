"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { toast } from "react-hot-toast";

export type Biker = {
  code: string;
  name: string;
  phone_number: string;
};

export const columns: ColumnDef<Biker>[] = [
  {
    accessorKey: "code",
    header: () => <div className="text-white">Code</div>,
  },
  {
    accessorKey: "name",
    header: () => <div className="text-white">Name</div>,
  },
  {
    accessorKey: "phone_number",
    header: () => <div className="text-white">Phone No.</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const biker = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-black/10">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="sr-only">Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(biker.phone_number);
                toast.success("Copied!", {
                  position: "bottom-center",
                });
              }}
            >
              Copy Phone No.
            </DropdownMenuItem>
            <DropdownMenuItem>View Biker</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

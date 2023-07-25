"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Session } from "next-auth";

import { Biker, columns } from "./columns";
import { AlertTriangle, Loader2 } from "lucide-react";
import DataTable from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

import { toast } from "react-hot-toast";

type ResponseType<T> = FailResponse | SuccessType<T>;

type FailResponse = {
  success: false;
  msg: string;
};

type SuccessType<T> = {
  success: true;
  data: T;
};

export default function BikerTable({ session }: { session: Session }) {
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-bikers"],
    queryFn: async () => {
      if (!session?.user?.accessToken) {
        return null;
      } else {
        const { data } = await axios.get<ResponseType<Biker[]>>(
          `${process.env.NEXT_PUBLIC_API_URL}/biker`,
          {
            headers: {
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
          }
        );

        return data;
      }
    },
  });

  if (isError && error instanceof AxiosError) {
    toast.error(error.message);
  }

  return (
    <>
      {isLoading ? (
        <div className="absolute top-1/2 left-0 right-0 flex justify-center">
          <Loader2 className="w-16 h-16 animate-spin text-slate-600/70" />
        </div>
      ) : null}

      {/* session expires. re-auth */}
      {isError &&
      error instanceof AxiosError &&
      error.response?.status === 403 ? (
        <div className="mt-[17vh] mx-auto max-w-md p-5 flex flex-col bg-[#85b7e9]">
          <div className="flex gap-x-5 mb-9">
            <AlertTriangle className="w-7 h-7 text-amber-300" />
            <h1>Your session expires. You need to login.</h1>
          </div>
          <Button
            className="max-w-max self-end"
            variant={"secondary"}
            onClick={() => router.push("/auth")}
          >
            Login
          </Button>
        </div>
      ) : null}

      {data?.success ? (
        <div className="mt-[10vh]">
          <DataTable columns={columns} data={data.data} />
        </div>
      ) : null}
    </>
  );
}

import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import BikerTable from "./biker-table";

export default async function BikerComponent() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full relative h-screen pt-16 px-5 md:p-10 overflow-y-scroll bg-[#c5dbf0]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold font-sans">Biker</h1>
        <Link href={"/biker/add"}>
          <Button className=" bg-slate-800">Add Biker</Button>
        </Link>
      </div>

      {session ? <BikerTable session={session} /> : null}
    </div>
  );
}

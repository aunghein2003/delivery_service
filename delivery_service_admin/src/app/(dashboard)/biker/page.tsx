import { loginIsRequired } from "@/lib/auth";
import BikerComponent from "@/page_components/biker";

export default async function Biker() {
  await loginIsRequired();

  return (
    <>
      <BikerComponent />
    </>
  );
}

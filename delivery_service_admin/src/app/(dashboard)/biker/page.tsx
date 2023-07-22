import { loginIsRequired } from "@/lib/auth";

export default async function Biker() {
  await loginIsRequired();

  return (
    <div>
      <h1>Biker</h1>
    </div>
  );
}

import { authOptions, loginIsRequired } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  await loginIsRequired();

  const session = await getServerSession(authOptions);
  return (
    <div>
      <h1>Home</h1>
      {JSON.stringify(session)}
    </div>
  );
}

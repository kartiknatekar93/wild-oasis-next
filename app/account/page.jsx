import { auth } from "@/app/_lib/auth";

export default async function Page() {
  const session = await auth();
  console.log(session);

  const username = session.user.name.split(" ").at(0);
  return <div>Welcome {username}</div>;
}

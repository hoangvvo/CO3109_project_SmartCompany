import { auth } from "@/backend/auth";

export default async function AdminPage() {
  const session = await auth();
  return <p>Hello {session?.user.name}</p>;
}

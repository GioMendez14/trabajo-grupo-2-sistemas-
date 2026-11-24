import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Navbar } from "@/components/Navbar";

// Protección de rutas: sin sesión, nadie ve nada de /dashboard ni /tasks
export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <>
      <Navbar name={session.user.name ?? "Usuario"} />
      <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
    </>
  );
}

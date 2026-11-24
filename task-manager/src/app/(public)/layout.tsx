import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Si ya hay sesión, las páginas públicas mandan directo al resumen
export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return <>{children}</>;
}

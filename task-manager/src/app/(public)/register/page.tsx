import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6 py-12">
      <Link href="/" className="mb-6 text-2xl font-bold text-brand">
        Hecho
      </Link>
      <h1 className="mb-6 text-2xl font-semibold">Crea tu cuenta</h1>
      <AuthForm mode="register" />
    </main>
  );
}

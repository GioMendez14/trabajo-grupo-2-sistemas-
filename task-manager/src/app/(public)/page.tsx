import Link from "next/link";

export default function Landing() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
      <h1 className="text-6xl font-bold tracking-tight text-brand sm:text-7xl">Hecho</h1>
      <p className="mt-6 max-w-xl text-xl leading-relaxed">
        Anota lo que tienes que hacer, ponle prioridad y fecha, y tacha lo que ya terminaste.
        Cada persona ve solo sus propias tareas.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/register"
          className="rounded-lg bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark"
        >
          Crear cuenta
        </Link>
        <Link
          href="/login"
          className="rounded-lg border border-line bg-white px-6 py-3 font-semibold hover:bg-page"
        >
          Iniciar sesión
        </Link>
      </div>
    </main>
  );
}

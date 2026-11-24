import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSummary } from "@/lib/tasks";
import { PRIORITY_LABEL, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic"; // los datos cambian: no cachear esta página

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const summary = await getSummary(session!.user.id); // el layout ya garantizó la sesión

  const stats = [
    { label: "Total", value: summary.total },
    { label: "Pendientes", value: summary.pending },
    { label: "Completadas", value: summary.completed },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Hola, {session!.user.name}</h1>

      <dl className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-line bg-white p-4">
            <dd className="text-3xl font-bold text-brand">{s.value}</dd>
            <dt className="text-sm text-muted">{s.label}</dt>
          </div>
        ))}
      </dl>

      <section aria-labelledby="upcoming">
        <h2 id="upcoming" className="mb-3 text-lg font-semibold">
          Próximas a vencer
        </h2>
        {summary.upcoming.length === 0 ? (
          <p className="rounded-lg border border-dashed border-line bg-white p-6 text-muted">
            Nada vence en los próximos 3 días.{" "}
            <Link href="/tasks" className="font-semibold text-brand underline">
              Ver mis tareas
            </Link>
          </p>
        ) : (
          <ul className="space-y-2">
            {summary.upcoming.map((t) => (
              <li key={t.id} className="flex justify-between rounded-lg border border-line bg-white p-3">
                <span className="font-medium">{t.title}</span>
                <span className="text-sm text-muted">
                  {PRIORITY_LABEL[t.priority]} · {formatDate(t.dueDate!)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

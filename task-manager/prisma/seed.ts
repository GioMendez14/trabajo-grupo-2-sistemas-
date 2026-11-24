import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
const day = (n: number) => new Date(Date.now() + n * 86400000);

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@hecho.app" },
    update: {},
    create: { name: "Usuario Demo", email: "demo@hecho.app", passwordHash: await bcrypt.hash("demo12345", 12) },
  });
  await prisma.task.deleteMany({ where: { userId: user.id } });
  await prisma.task.createMany({
    data: [
      { title: "Entregar informe de Sistemas", priority: "HIGH", dueDate: day(1), userId: user.id },
      { title: "Estudiar para el examen de SQL", priority: "MEDIUM", dueDate: day(5), userId: user.id },
      { title: "Comprar café", priority: "LOW", completed: true, userId: user.id },
    ],
  });
  console.log("Seed listo: demo@hecho.app / demo12345");
}

main().finally(() => prisma.$disconnect());

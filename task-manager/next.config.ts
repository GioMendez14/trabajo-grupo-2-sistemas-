import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pg usa módulos nativos de Node; se deja fuera del bundle del servidor
  serverExternalPackages: ["pg", "@prisma/adapter-pg"],
};

export default nextConfig;

import { PrismaClient } from "@prisma/client";

const normalizeDatabaseUrl = () => {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl || (!databaseUrl.includes("pooler.supabase.com") && !databaseUrl.includes("neon.tech"))) {
    return databaseUrl;
  }

  if (databaseUrl.includes("pgbouncer=true")) {
    return databaseUrl;
  }

  const separator = databaseUrl.includes("?") ? "&" : "?";
  return `${databaseUrl}${separator}pgbouncer=true&connection_limit=1`;
};

const prismaClientOptions = (() => {
  const normalizedUrl = normalizeDatabaseUrl();
  return normalizedUrl ? { datasources: { db: { url: normalizedUrl } } } : {};
})();

export const db = globalThis.prisma || new PrismaClient(prismaClientOptions);

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}


// globalThis.prisma: This global variable ensures that the Prisma client instance is
// reused across hot reloads during development. Without this, each time your application
// reloads, a new instance of the Prisma client would be created, potentially leading
// to connection issues

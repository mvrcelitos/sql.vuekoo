import { DatabaseType } from "@/interfaces/cookies/databases";
import { cookies } from "next/headers";
import "server-only";

type Errors = "not-found" | "parsing" | "no-databases";

type Optionals<T extends boolean> = {
   details?: T;
};

type GetDatabaseReturn<T extends boolean> = T extends true
   ? { ok: true; database: DatabaseType } | { ok: false; message: string; error: Errors }
   : DatabaseType | null;

export const getDatabase = function <T extends boolean = false>(
   uuid: string,
   optionals?: Optionals<T>,
): GetDatabaseReturn<T> {
   const details = (optionals?.details ?? false) as T;
   const c = cookies();

   let databases: DatabaseType[];
   const cookieDatabases = c.get("databases")?.value as string | undefined;
   if (!cookieDatabases) {
      if (!details) return null as GetDatabaseReturn<T>;
      return { ok: false, message: "No databases saved on cookies", error: "no-databases" } as GetDatabaseReturn<T>;
   }

   try {
      databases = JSON.parse(cookieDatabases!);
   } catch (err) {
      if (!details) return null as GetDatabaseReturn<T>;
      return { ok: false, message: "Error parsing databases", error: "parsing" } as GetDatabaseReturn<T>;
   }

   const database = databases.find((x) => x.uuid === uuid);
   if (!database) {
      if (!details) return null as GetDatabaseReturn<T>;
      return { ok: false, message: "Database not found in databases", error: "not-found" } as GetDatabaseReturn<T>;
   }

   return (details ? { ok: true, database } : database) as GetDatabaseReturn<T>;
};

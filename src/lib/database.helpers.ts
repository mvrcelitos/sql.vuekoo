import "server-only";
import { cookies } from "next/headers";

import { DatabaseType } from "@/interfaces/cookies/databases";
import { GetDatabaseDataReturn, GetDatabaseReturn, Optionals } from "@/lib/database/types";
import { DatabaseFactory } from "@/lib/database";

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

export const getDatabaseData = async function <T extends boolean = false>(
   database: DatabaseType,
   optionals?: Optionals<T>,
): Promise<GetDatabaseDataReturn<T>> {
   const details = (optionals?.details ?? false) as T;
   const connection = await DatabaseFactory(database.type)?.connect({
      host: database.host,
      port: database.port,
      database: database.database,
      user: database.username,
      password: database.password,
   });

   if (!connection) {
      if (!details) return null as GetDatabaseDataReturn<T>;
      return { ok: false, message: "Error connecting to the database" } as GetDatabaseDataReturn<T>;
   }

   try {
      const [tables, views] = await Promise.all([
         connection.query<{ table_name: string }>(
            "SELECT table_name FROM information_schema.tables as ist WHERE ist.table_schema = 'public' AND ist.table_type = 'BASE TABLE' ORDER BY table_name",
         ),
         connection.query<{ table_name: string }>(
            "SELECT table_name FROM information_schema.views as isv where isv.table_schema = 'public'",
         ),
      ]);

      const data = {
         tables: tables?.rows.map((row) => row.table_name),
         views: views?.rows.map((row) => row.table_name),
      };

      if (!details) return data as GetDatabaseDataReturn<T>;
      return { ok: true, message: "Sucessfully getted tables", data } as GetDatabaseDataReturn<T>;
   } catch (error) {
      console.error(error);
      if (!details) return null as GetDatabaseDataReturn<T>;
      return { ok: false, message: "Error getting database tables and views" } as GetDatabaseDataReturn<T>;
   }
};

// export const getDatabaseData = async <T extends { tables: any[]; views: any[] }>(
//    uuid: string,
// ): Promise<GetDatabaseTablesReturn<T>> => {
//    const c = cookies();
//    if (!c.has("databases")) return { ok: false, message: "No databases found!" };

//    const databases = c.get("databases")?.value;
//    if (!databases || databases === "[]") return { ok: false, message: "No databases found" };
//    let parsed: DatabasesReturn;
//    try {
//       parsed = JSON.parse(databases);
//    } catch (err) {
//       console.error(err);
//       return { ok: false, message: "Error parsing databases" };
//    }
//    const unique = parsed.find((x) => x.uuid === uuid);
//    if (!unique) return { ok: false, message: "Database not found" };

//    const connection = (await DatabaseFactory(unique.type)?.connect({
//       host: unique.host,
//       port: unique.port,
//       database: unique.database,
//       user: unique.username,
//       password: unique.password,
//    })) as PSQLDatabase;
//    if (!connection) return { ok: false, message: "Error connecting to the database" };

//    try {
//       const [tables, views] = await Promise.all([
//          connection.query<{ table_name: string }>(
//             "SELECT table_name FROM information_schema.tables as ist WHERE ist.table_schema = 'public' AND ist.table_type = 'BASE TABLE' ORDER BY table_name",
//          ),
//          connection.query<{ table_name: string }>(
//             "SELECT table_name FROM information_schema.views as isv where isv.table_schema = 'public'",
//          ),
//       ]);
//       return {
//          ok: true,
//          message: "Sucessfully getted tables",
//          data: {
//             tables: tables?.rows.map((row) => row.table_name),
//             views: views?.rows.map((row) => row.table_name),
//          } as T,
//       };
//    } catch (error) {
//       console.error(error);
//       return { ok: false, message: "Error getting database tables and views" };
//    }
// };

import { cookies } from "next/headers";

import { DatabaseType } from "@/interfaces/cookies/databases";
import { DatabaseFactory } from "@/lib/database";
import {
   GetDatabaseDataReturn,
   GetDatabaseReturn,
   GetDatabasesReturn,
   OptionalsProps,
   SetDatabasesReturn,
} from "@/lib/database/types";

import "server-only";

// TODO: create a zod schema to validate the return from the cookies
// export const getDatabases = function <T extends boolean = false>(optionals?: OptionalsProps<T>): GetDatabasesReturn<T> {
//    const details = (optionals?.details ?? false) as T;
//    const c = cookies();

//    const cookieDatabases = c.get("databases")?.value as string | undefined;
//    if (!cookieDatabases) {
//       if (!details) return [] as DatabaseType[] as GetDatabasesReturn<T>;
//       return { ok: true, databases: [] as DatabaseType[] } as GetDatabasesReturn<T>;
//    }

//    try {
//       const databases = JSON.parse(cookieDatabases!);
//       if (!details) return databases as GetDatabasesReturn<T>;
//       return { ok: true, databases } as GetDatabasesReturn<T>;
//    } catch (err) {
//       if (!details) return null as GetDatabasesReturn<T>;
//       return { ok: false, message: "Error parsing databases", error: "parsing" } as GetDatabasesReturn<T>;
//    }
// };

// export const getDatabase = function <T extends boolean = false>(
//    uuid: string,
//    optionals?: OptionalsProps<T>,
// ): GetDatabaseReturn<T> {
//    const details = (optionals?.details ?? false) as T;
//    const c = cookies();

//    let databases: DatabaseType[];
//    const cookieDatabases = c.get("databases")?.value as string | undefined;
//    if (!cookieDatabases) {
//       if (!details) return null as GetDatabaseReturn<T>;
//       return { ok: false, message: "No databases saved on cookies", error: "no-databases" } as GetDatabaseReturn<T>;
//    }

//    try {
//       databases = JSON.parse(cookieDatabases!);
//    } catch (err) {
//       if (!details) return null as GetDatabaseReturn<T>;
//       return { ok: false, message: "Error parsing databases", error: "parsing" } as GetDatabaseReturn<T>;
//    }

//    const database = databases.find((x) => x.uuid === uuid);
//    if (!database) {
//       if (!details) return null as GetDatabaseReturn<T>;
//       return { ok: false, message: "Database not found in databases", error: "not-found" } as GetDatabaseReturn<T>;
//    }

//    return (details ? { ok: true, database } : database) as GetDatabaseReturn<T>;
// };

export const getDatabaseData = async function <T extends boolean = false>(
   database: DatabaseType,
   optionals?: OptionalsProps<T>,
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

export const setDatabases = function <T extends boolean = false>(
   databases: DatabaseType[],
   optionals?: OptionalsProps<T>,
): SetDatabasesReturn<T> {
   const details = (optionals?.details ?? false) as T;
   const c = cookies();

   try {
      c.set("databases", JSON.stringify(databases), {
         maxAge: 60 * 60 * 24 * 30,
         httpOnly: process.env.NODE_ENV === "production",
         secure: process.env.NODE_ENV === "production",
      });
      if (!details) return true as SetDatabasesReturn<T>;
      return { ok: true } as SetDatabasesReturn<T>;
   } catch (err) {
      console.error(err);
      if (!details) return false as SetDatabasesReturn<T>;
      return {
         ok: false,
         message: (err as any)?.message || "Error saving databases on cookies",
      } as SetDatabasesReturn<T>;
   }
};

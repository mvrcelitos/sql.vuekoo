"use server";

import { cookies } from "next/headers";

import { DatabaseFactory, PSQLDatabase } from "@/lib/database";
import { findDatabase, getDatabases } from "@/lib/database/functions";

type GetDatabaseTablesReturn<T extends { tables: any[]; views: any[] }> =
   | { ok: false; message: string }
   | { ok: true; message: string; data: T };

export const getDatabaseData = async <T extends { tables: any[]; views: any[] }>(
   uuid: string,
): Promise<GetDatabaseTablesReturn<T>> => {
   const c = cookies();
   if (!c.has("databases")) return { ok: false, message: "No databases found!" };

   const database = await findDatabase(uuid);
   if (!database) return { ok: false, message: "Database not found" };

   const connection = (await DatabaseFactory(database.type)?.connect({
      host: database.host,
      port: database.port,
      database: database.database,
      user: database.username,
      password: database.password,
   })) as PSQLDatabase;
   if (!connection) return { ok: false, message: "Error connecting to the database" };

   try {
      const [tables, views] = await Promise.all([
         connection.query<{ table_name: string }>(
            "SELECT table_name FROM information_schema.tables as ist WHERE ist.table_schema = 'public' AND ist.table_type = 'BASE TABLE' ORDER BY table_name",
         ),
         connection.query<{ table_name: string }>(
            "SELECT table_name FROM information_schema.views as isv where isv.table_schema = 'public'",
         ),
      ]);
      return {
         ok: true,
         message: "Sucessfully getted tables",
         data: {
            tables: tables?.rows.map((row) => row.table_name),
            views: views?.rows.map((row) => row.table_name),
         } as T,
      };
   } catch (error) {
      console.error(error);
      return { ok: false, message: "Error getting database tables and views" };
   }
};

export const moveDatabase = async (uuid: string, direction: "up" | "down") => {
   const databases = await getDatabases();
   if (!databases?.length) return { ok: false, message: "No databases found" };

   const index = databases.findIndex((x) => x.uuid === uuid);
   if (index === -1) return { ok: false, message: "Database not found" };

   if (direction === "up" && index === 0) return { ok: false, message: "Can't move up" };
   if (direction === "down" && index === databases.length - 1) return { ok: false, message: "Can't move down" };

   const dir = { up: -1, down: 1 }[direction];
   const database = JSON.parse(JSON.stringify(databases[index]));
   databases[index] = databases[index + dir];
   databases[index + dir] = database;

   const c = cookies();
   c.set("databases", JSON.stringify(databases));

   return { ok: true, message: "Successfully swapped database position" };
};

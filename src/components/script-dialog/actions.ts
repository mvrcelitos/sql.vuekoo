"use server";

import { DatabaseFactory } from "@/lib/database";
import { findDatabase } from "@/lib/database/functions";

export const runScript = async (uuid: string, script: string) => {
   const database = await findDatabase(uuid);
   if (!database) return { ok: false, message: "Database not found" };

   const connection = await DatabaseFactory(database.type)?.connect({
      host: database.host,
      port: database.port,
      database: database.database,
      user: database.username,
      password: database.password,
   });
   if (!connection) return { ok: false, message: "Error connecting to the database" };

   try {
      await connection.query(script);
      return true;
   } catch (err) {
      console.error(err);
      return false;
   } finally {
      await connection.disconnect();
   }
};

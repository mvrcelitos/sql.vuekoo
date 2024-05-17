"use server";

import {
   CreateDatabaseFormReturn,
   DatabasesSchema,
} from "@/components/aside-new/_components/buttons/create-database/schema";
import { DatabaseFactory, PSQLDatabase } from "@/lib/database";
import { cookies } from "next/headers";

const COOKIES_KEY = "databases";

export const testConnection = async (data: CreateDatabaseFormReturn) => {
   if (!data.url || !data.type) {
      console.log("url", !data.url);
      console.log("type", !data.type);
      return { ok: false, message: "Invalid data!" };
   }

   // const db = PSQLDatabase.create(data.url);
   const db = DatabaseFactory(data.type);
   if (!db) return { ok: false, message: "Invalid database type!" };

   try {
      await db.connect(data.url);
   } catch (error) {
      console.error(error);
      return { ok: false, message: "Connection failed!" };
   } finally {
      await db?.disconnect();
   }
   return { ok: true, message: "Connection is fine!" };
};

export const createDatabase = async (data: CreateDatabaseFormReturn) => {
   const c = cookies();

   const databases = c?.get("databases")?.value;

   if (!databases || databases == "[]") {
      c.set(COOKIES_KEY, JSON.stringify([data]));
      return { ok: true, message: "Database sucessfully added!" };
   }

   try {
      const safeParsed = DatabasesSchema.safeParse(JSON.parse(databases));
      if (safeParsed.success !== true) {
         console.warn("ERROR: Database schema is invalid! overwriting...");
         c.set(COOKIES_KEY, JSON.stringify([data]));
         return { ok: true, message: "Database sucessfully added!" };
      }
      c.set(COOKIES_KEY, JSON.stringify([...safeParsed.data, data]));
      return { ok: true, message: "Database sucessfully added!" };
   } catch (error) {
      console.warn("ERROR: Trying to create a database");
      console.error(error);
      return { ok: false, message: "An unexpected error happened!" };
   }
};

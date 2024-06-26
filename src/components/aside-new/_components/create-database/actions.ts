"use server";

import { cookies } from "next/headers";

import {
   CreateDatabaseFormReturn,
   DatabaseConnectionParamsReturn,
   databaseConnectionParamsSchema,
   databaseSchema,
   databasesSchema,
} from "@/components/aside-new/_components/create-database/schema";
import { DatabaseFactory } from "@/lib/database";

const COOKIES_KEY = "databases";

export const testConnection = async (data: DatabaseConnectionParamsReturn) => {
   if (!data.type) {
      return { ok: false, message: "Invalid database type!" };
   }

   const dataSafe = databaseConnectionParamsSchema.safeParse(data);
   if (dataSafe.success !== true) {
      console.warn("ERROR: Database schema is invalid!");
      return { ok: false, message: "Invalid database schema!" };
   }

   // const db = PSQLDatabase.create(data.url);
   const db = DatabaseFactory(data.type);
   if (!db) {
      console.warn("ERROR: Database is invalid!");
      return { ok: false, message: "Invalid database type!" };
   }

   try {
      await db.connect({
         host: data.host,
         port: +data.port || 5432,
         database: data.database,
         user: data.username,
         password: data.password,
      });
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

   const dataSafe = databaseSchema.safeParse(data);
   if (dataSafe.success !== true) {
      console.warn("ERROR: Database schema is invalid");
      return { ok: false, message: "Invalid database schema!" };
   }

   const databases = c?.get("databases")?.value;
   if (!databases || databases == "[]") {
      c.set(COOKIES_KEY, JSON.stringify([dataSafe.data]));
      return { ok: true, message: "Database sucessfully added!" };
   }

   try {
      const databasesSafe = databasesSchema.safeParse(JSON.parse(databases));
      if (databasesSafe.success !== true) {
         c.set(COOKIES_KEY, JSON.stringify([dataSafe.data]));
         return { ok: true, message: "Database sucessfully added!" };
      }

      c.set(COOKIES_KEY, JSON.stringify([...databasesSafe.data, dataSafe.data]), {
         maxAge: 1000 * 60 * 60 * 24 * 7,
         httpOnly: process.env.NODE_ENV === "production",
         secure: process.env.NODE_ENV === "production",
      });
      return { ok: true, message: "Database sucessfully added!" };
   } catch (error) {
      console.warn("ERROR: Trying to create a database");
      console.error(error);
      console.log("return 4");
      return { ok: false, message: "An unexpected error happened!" };
   }
};

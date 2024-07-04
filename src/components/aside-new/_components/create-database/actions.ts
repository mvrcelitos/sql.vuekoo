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
import { getDatabases, createDatabase as serverCreateDatabase } from "@/lib/database/functions";

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
   const dataSafe = databaseSchema.safeParse(data);
   if (dataSafe.success !== true) {
      console.warn("ERROR: Database schema is invalid");
      return { ok: false, message: "Invalid database schema!" };
   }

   const response = await serverCreateDatabase(dataSafe.data, { details: true });
   if (!response.ok) return { ok: false, message: response.message };
   return { ok: true, message: "Database sucessfully added!" };
};

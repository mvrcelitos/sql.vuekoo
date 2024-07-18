"use server";
import { cookies } from "next/headers";

import { DatabaseType } from "@/interfaces/cookies/databases";
import { setDatabases } from "@/lib/database/server-only";

interface OptionalsProps<T extends boolean> {
   details?: T;
}
// TODO: create a zod schema to validate the return from the cookies
type GetDatabasesReturn<T extends boolean> = T extends true
   ? { ok: true; databases: DatabaseType[] } | { ok: false; message: string }
   : DatabaseType[] | null;
export const getDatabases = async function <T extends boolean = false>(
   optionals?: OptionalsProps<T>,
): Promise<GetDatabasesReturn<T>> {
   const details = (optionals?.details ?? false) as T;
   const c = cookies();

   const cookieDatabases = c.get("databases")?.value as string | undefined;
   if (!cookieDatabases) {
      if (!details) return [] as DatabaseType[] as GetDatabasesReturn<T>;
      return { ok: true, databases: [] as DatabaseType[] } as GetDatabasesReturn<T>;
   }

   try {
      const databases = JSON.parse(cookieDatabases!);

      const isArray = Array.isArray(databases);
      if (!isArray) {
         if (!details) return [] as DatabaseType[] as GetDatabasesReturn<T>;
         return { ok: true, databases: [] as DatabaseType[] } as GetDatabasesReturn<T>;
      }

      if (!details) return databases as GetDatabasesReturn<T>;
      return { ok: true, databases } as GetDatabasesReturn<T>;
   } catch (err) {
      if (!details) return null as GetDatabasesReturn<T>;
      return { ok: false, message: "Error parsing databases" } as GetDatabasesReturn<T>;
   }
};

// CRUD

interface FindDatabaseErrorReturn<TErrors extends string = "not-found" | "parsing" | "no-databases"> {
   ok: false;
   message: string;
   error: TErrors;
}
type FindDatabaseReturn<T extends boolean> = T extends true
   ? { ok: true; database: DatabaseType } | FindDatabaseErrorReturn
   : DatabaseType | null;
export const findDatabase = async function <T extends boolean = false>(
   uuid: string,
   optionals?: OptionalsProps<T>,
): Promise<FindDatabaseReturn<T>> {
   const details = (optionals?.details ?? false) as T;
   const c = cookies();

   let databases: DatabaseType[];
   const cookieDatabases = c.get("databases")?.value as string | undefined;
   if (!cookieDatabases) {
      if (!details) return null as FindDatabaseReturn<T>;
      return { ok: false, message: "No databases saved on cookies", error: "no-databases" } as FindDatabaseReturn<T>;
   }

   try {
      databases = JSON.parse(cookieDatabases!);
   } catch (err) {
      if (!details) return null as FindDatabaseReturn<T>;
      return { ok: false, message: "Error parsing databases", error: "parsing" } as FindDatabaseReturn<T>;
   }

   const database = databases.find((x) => x.uuid === uuid);
   if (!database) {
      if (!details) return null as FindDatabaseReturn<T>;
      return { ok: false, message: "Database not found in databases", error: "not-found" } as FindDatabaseReturn<T>;
   }

   return (details ? { ok: true, database } : database) as FindDatabaseReturn<T>;
};

type CreateDatabaseReturn<T extends boolean> = T extends true ? { ok: true } | { ok: false; message: string } : boolean;
export const createDatabase = async function <T extends boolean = false>(
   database: DatabaseType,
   optionals?: OptionalsProps<T>,
): Promise<CreateDatabaseReturn<T>> {
   const details = (optionals?.details ?? false) as T;
   const databases = await getDatabases({ details: true });
   if (!databases?.ok) {
      if (!details) return false as CreateDatabaseReturn<T>;
      return { ok: false, message: databases.message } as CreateDatabaseReturn<T>;
   }

   const response = setDatabases([...databases.databases, database], { details: true });
   if (!response.ok) {
      if (!details) return false as CreateDatabaseReturn<T>;
      return { ok: false, message: response.message } as CreateDatabaseReturn<T>;
   }
   if (!details) return true as CreateDatabaseReturn<T>;
   return { ok: true } as CreateDatabaseReturn<T>;
};

type UpdateDatabaseReturn<T extends boolean> = T extends true ? { ok: true } | { ok: false; message: string } : boolean;
export const updateDatabase = async function <T extends boolean = false>(
   database: DatabaseType,
   optionals?: OptionalsProps<T>,
): Promise<UpdateDatabaseReturn<T>> {
   const details = (optionals?.details ?? false) as T;
   const databases = await getDatabases({ details: true });
   if (!databases?.ok) {
      if (!details) return false as UpdateDatabaseReturn<T>;
      return { ok: false, message: databases.message } as UpdateDatabaseReturn<T>;
   }

   const databaseIndex = databases.databases.findIndex((x) => x.uuid === database.uuid);
   if (databaseIndex === -1) {
      if (!details) return false as UpdateDatabaseReturn<T>;
      return { ok: false, message: "Database not found" } as UpdateDatabaseReturn<T>;
   }

   databases.databases[databaseIndex] = database;
   const response = setDatabases(databases.databases, { details: true });
   if (!response.ok) {
      if (!details) return false as UpdateDatabaseReturn<T>;
      return { ok: false, message: response.message } as UpdateDatabaseReturn<T>;
   }
   if (!details) return true as UpdateDatabaseReturn<T>;
   return { ok: true } as UpdateDatabaseReturn<T>;
};

type DeleteDatabaseReturn<T extends boolean> = T extends true ? { ok: true } | { ok: false; message: string } : boolean;
export const deleteDatabase = async function <T extends boolean = false>(
   uuid: string,
   optionals?: OptionalsProps<T>,
): Promise<DeleteDatabaseReturn<T>> {
   const details = (optionals?.details ?? false) as T;

   const databases = await getDatabases();
   if (!databases) {
      if (!details) return false as DeleteDatabaseReturn<T>;
      return { ok: false, message: "No databases saved on cookies" } as DeleteDatabaseReturn<T>;
   }

   const databaseIndex = databases.findIndex((x) => x.uuid === uuid);
   databases.splice(databaseIndex, 1);
   const response = setDatabases(databases);

   if (!details) return response as DeleteDatabaseReturn<T>;
   if (!response) return { ok: false, message: "Error saving databases on cookies" } as DeleteDatabaseReturn<T>;
   return { ok: true } as DeleteDatabaseReturn<T>;
};

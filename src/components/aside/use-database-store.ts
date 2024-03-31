import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

import { addDatabase } from "@/components/aside/schema";

interface Database {
   uuid: string;
   name: string;
   url: string;
   status: "connected" | "disconnected" | "connecting" | "refreshing" | "error";
   // connected: boolean;

   tables?: string[];
   views?: string[];
   indexes?: string[];
   functions?: string[];
   triggers?: string[];
   created_at: string;
   updated_at: string;
}

export interface DatabaseStore {
   databases: Record<string, Database>;
   get: () => Promise<void>;
   add: ({ name, url }: { name: string; url: string }) => Promise<void>;
   connect: (uuid: string) => Promise<boolean>;
   disconnect: (uuid: string) => void;
   refresh: (uuid: string) => Promise<boolean>;
   delete: (uuid: string) => Promise<void>;
   rename: (uuid: string, name: string) => Promise<void>;

   swap: (from: number, to: number) => void;
}

export const useDatabaseStore = create<DatabaseStore>((set, get) => ({
   databases: {},
   get: async () => {
      try {
         const res = await fetch(`/api/v1/databases`);
         const data = await res.json();
         const formatted = Object.values(data).reduce((acc: Record<string, Database>, cur: any) => {
            acc[cur.uuid] = { ...cur, status: "disconnected" };
            return acc;
         }, {});
         set((state) => ({ databases: formatted }));
      } catch (err) {
         console.error(err);
      }
   },
   add: async (data) => {
      if (!addDatabase.safeParse(data).success) console.error("Invalid data");
      try {
         // fetches the tables
         const uuid = uuidv4();
         const at = new Date().toISOString();
         await fetch(`/api/v1/databases`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uuid, ...data, created_at: at, updated_at: at }),
         });

         set((state) => ({
            databases: {
               ...state.databases,
               [uuid]: { uuid, ...data, tables: [], status: "disconnected", created_at: at, updated_at: at },
            },
         }));
      } catch (err) {
         console.error(err);
      }
   },

   connect: async (uuid: string) => {
      try {
         // updates the status to connecting
         set((state) => ({
            databases: {
               ...state.databases,
               [uuid]: { ...state.databases[uuid], status: "connecting" },
            },
         }));

         // fetches the tables
         const res = await fetch(`/api/v1/databases/${uuid}`);
         const data = await res.json();

         // updates the status to connected
         set((state) => ({
            databases: {
               ...state.databases,
               [uuid]: {
                  ...state.databases[uuid],
                  status: "connected",
                  tables: data?.data?.tables,
                  views: data?.data?.views,
               },
            },
         }));
      } catch (err) {
         set((state) => ({
            databases: {
               ...state.databases,
               [uuid]: { ...state.databases[uuid], status: "error" },
            },
         }));
         return false;
      }
      return true;
   },

   refresh: async (uuid: string) => {
      try {
         // updates the status to refreshing
         set((state) => ({
            databases: {
               ...state.databases,
               [uuid]: { ...state.databases[uuid], status: "refreshing" },
            },
         }));

         // fetches the tables
         const res = await fetch(`/api/v1/databases/${uuid}`);
         const data = await res.json();

         // updates the status to connected and updates the tables
         set((state) => ({
            databases: {
               ...state.databases,
               [uuid]: {
                  ...state.databases[uuid],
                  status: "connected",
                  tables: data?.data?.tables,
                  views: data?.data?.views,
               },
            },
         }));
      } catch (err) {
         set((state) => ({
            databases: {
               ...state.databases,
               [uuid]: { ...state.databases[uuid], status: "error" },
            },
         }));
         return false;
      }
      return true;
   },
   swap: async (from: number, to: number) => {
      const entries = Object.entries(get().databases);
      const temp = entries[from];
      try {
         const res = await fetch(`/api/v1/databases/swap`, {
            method: "PUT",
            body: JSON.stringify({ from, to }),
         });
         if (!res.ok) {
            return console.error("Error trying to swap positions");
         }
         entries[from] = entries[to];
         entries[to] = temp;
         set(() => ({ databases: Object.fromEntries(entries) }));
      } catch (err) {
         console.error(err);
      }
   },

   disconnect: (uuid: string) => {
      set((state) => ({
         databases: { ...state.databases, [uuid]: { ...state.databases[uuid], status: "disconnected", tables: [] } },
      }));
   },

   delete: async (uuid: string) => {
      try {
         // deletes the database from the cookies
         await fetch(`/api/v1/databases/${uuid}`, {
            method: "DELETE",
         });

         // delete the database from the zustand
         set((state) => {
            const databases = { ...state.databases };
            delete databases[uuid];
            return { databases };
         });
      } catch (err) {
         console.error(err);
      }
   },

   rename: async (uuid: string, name: string) => {
      try {
         // renames the database from the cookies
         const res = await fetch(`/api/v1/databases/${uuid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, updated_at: new Date().toISOString() }),
         });

         set((state) => ({
            databases: {
               ...state.databases,
               [uuid]: { ...state.databases[uuid], name, updated_at: new Date().toISOString() },
            },
         }));
      } catch (err) {
         console.error(err);
      }
   },
}));

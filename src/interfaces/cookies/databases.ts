import type { AvailableDatabaseIds } from "@/constants/available-databases";

export type DatabaseType = {
   uuid: string;
   name: string;
   readOnly: boolean;
   created_at: string;
   updated_at: string;
   type: AvailableDatabaseIds;
   host: string;
   port: number;
   database: string;
   username: string;
   password: string;
};

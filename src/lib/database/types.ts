import { DatabaseType } from "@/interfaces/cookies/databases";

export interface Optionals<T extends boolean> {
   details?: T;
}

//#region GetDatabaseReturnInnerInterfaces
interface GetDatabaseReturnSuccess {
   ok: true;
   database: DatabaseType;
}
interface GetDatabaseReturnError<TErrors = "not-found" | "parsing" | "no-databases"> {
   ok: false;
   message: string;
   error: TErrors;
}
//#endregion
export type GetDatabaseReturn<T extends boolean> = T extends true
   ? GetDatabaseReturnSuccess | GetDatabaseReturnError
   : DatabaseType | null;

interface GetDatabaseDataType {
   tables: any[];
   views: any[];
}
export type GetDatabaseDataReturn<T extends boolean> = T extends true
   ? { ok: false; message: string } | { ok: true; message: string; data: GetDatabaseDataType }
   : GetDatabaseDataType | null;

import { DatabaseType } from "@/interfaces/cookies/databases";

export interface OptionalsProps<T extends boolean> {
   details?: T;
}

interface GetDatabasesSucessReturn {
   ok: true;
   databases: DatabaseType[];
}
interface GetDatabasesErrorReturn<TErrors extends string = "parsing"> {
   ok: false;
   message: string;
   error: TErrors;
}
export type GetDatabasesReturn<T extends boolean> = T extends true
   ? GetDatabasesSucessReturn | GetDatabasesErrorReturn
   : DatabaseType[] | null;

//#region GetDatabaseReturnInnerInterfaces
interface GetDatabaseSuccessReturn {
   ok: true;
   database: DatabaseType;
}
interface GetDatabaseErrorReturn<TErrors extends string = "not-found" | "parsing" | "no-databases"> {
   ok: false;
   message: string;
   error: TErrors;
}
//#endregion
export type GetDatabaseReturn<T extends boolean> = T extends true
   ? GetDatabaseSuccessReturn | GetDatabaseErrorReturn
   : DatabaseType | null;

interface GetDatabaseDataType {
   tables: any[];
   views: any[];
}
export type GetDatabaseDataReturn<T extends boolean> = T extends true
   ? { ok: false; message: string } | { ok: true; message: string; data: GetDatabaseDataType }
   : GetDatabaseDataType | null;

export type SetDatabasesReturn<T extends boolean> = T extends true
   ? { ok: true } | { ok: false; message: string }
   : boolean;

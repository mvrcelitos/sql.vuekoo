import "server-only";

import { DatabaseType } from "@/interfaces/cookies/databases";
import mysql from "mysql2/promise";
import pg from "pg";

export interface DatabaseQueryReturn<T extends any = unknown, K extends any = unknown> {
   rowsCount: number;
   rows: Array<T>;
   fields: Array<K>;
}

interface DatabasePSQLQueryFieldsReturn {
   name: string;
   tableID: number;
   columnID: number;
   dataTypeID: number;
   dataTypeSize: number;
   dataTypeModifier: number;
   format: string;
}

interface DatabaseConfigProps {
   host: string;
   database: string;
   user: string;
   password: string;
   port: number;
}

export abstract class Database {
   protected declare client: unknown;
   protected declare connectionMethod: "url" | "config";

   public abstract connect(credentials: DatabaseConfigProps): Promise<this>;
   public abstract connectWithDatabase(database: DatabaseType): Promise<this>;

   public abstract disconnect(): Promise<this>;
   public abstract query<Row extends unknown = unknown, Field extends unknown = unknown>(
      sql: string,
      values?: string[],
   ): Promise<DatabaseQueryReturn<Row, Field>>;
}

export class MySQLDatabase extends Database {
   protected declare client: mysql.Connection;

   // public static create(url: string): MySQLDatabase;
   // public static create(credentials: DatabaseConfigProps): MySQLDatabase;
   // public static create(props: string | DatabaseConfigProps) {
   //    if (typeof props == "string") {
   //       const [username, password, host, port, database] = props?.replace("mysql://", "").split(/\:|\@|:\/|\?/g);
   //       return new this({ user: username, password, host, port: +port, database });
   //    }
   //    return new this(props);
   // }

   public async connect(credentials: DatabaseConfigProps) {
      try {
         this.client = await mysql.createConnection({
            ...credentials,
            connectTimeout: 30000,
            rowsAsArray: true,
         });
         this.client.connect();
      } catch (error) {
         console.warn("ERROR: Trying to connect to the database");
         throw error;
      }
      return this;
   }

   public async connectWithDatabase(database: DatabaseType) {
      this.connect({
         host: database.host,
         database: database.database,
         user: database.username,
         password: database.password,
         port: database.port,
      });
      return this;
   }

   public async disconnect() {
      if (!this?.client) {
         console.warn("Database is already disconnected");
         return this;
      }
      try {
         await this.client?.end();
      } catch (error) {
         console.warn("ERROR: Trying to disconnect from the database");
         throw error;
      }
      return this;
   }

   public async query<Row extends unknown, Field extends unknown = unknown>(
      sql: string,
      values?: string[],
   ): Promise<DatabaseQueryReturn<Row, Field>> {
      try {
         const [rows, fields] = await this.client.query<any[]>({
            sql,
            values,
            rowsAsArray: true,
         });
         return { rowsCount: rows?.length || 0, rows, fields: fields as Field[] };
      } catch (error) {
         console.warn("ERROR: Trying to query the database");
         throw error;
      }
   }
}

export class PSQLDatabase extends Database {
   protected declare client: pg.Client;

   // public static create(url: string): PSQLDatabase;
   // public static create(credentials: DatabaseConfigProps): PSQLDatabase;
   // public static create(props: string | DatabaseConfigProps) {
   //    if (typeof props == "string") {
   //       const [username, password, host, port, database] = props?.replace("postgresql://", "").split(/\:|\@|:\/|\?/g);
   //       return new this({ user: username, password, host, port: +port, database });
   //    }
   //    return new this(props);
   // }

   public async connect(credentials: DatabaseConfigProps) {
      try {
         this.client = new pg.Client({
            ...credentials,
            application_name: "vuekoo/sql",
            connectionTimeoutMillis: 30000,
         });
         await this.client.connect();
      } catch (error) {
         console.warn("ERROR: Trying to connect to the database");
         throw error;
      }
      return this;
   }

   public async connectWithDatabase(database: DatabaseType) {
      this.connect({
         host: database.host,
         database: database.database,
         user: database.username,
         password: database.password,
         port: database.port,
      });
      return this;
   }

   public async disconnect() {
      if (!this?.client) {
         console.warn("Database is already disconnected");
         return this;
      }
      try {
         await this.client?.end();
      } catch (error) {
         console.warn("ERROR: Trying to disconnect from the database");
         throw error;
      }
      return this;
   }

   public async query<Row extends unknown, Field extends unknown = DatabasePSQLQueryFieldsReturn>(
      sql: string,
      values?: string[],
   ): Promise<DatabaseQueryReturn<Row, Field>> {
      try {
         const res = await this.client.query(sql, values);
         return { rowsCount: res?.rowCount || 0, rows: res.rows, fields: res.fields as Field[] };
      } catch (error) {
         console.warn("ERROR: Trying to query the database");
         throw error;
      }
   }
}

const availableDatabases = ["mysql", "psql"] as const;
export const DatabaseFactory = (type: (typeof availableDatabases)[number]) => {
   if (!availableDatabases.includes(type)) {
      return undefined;
   }
   return new {
      mysql: MySQLDatabase,
      psql: PSQLDatabase,
   }[type]();
};

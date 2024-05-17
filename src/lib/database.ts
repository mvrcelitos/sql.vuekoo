import mysql from "mysql2/promise";
import pg from "pg";

interface DatabaseConfigProps {
   host: string;
   database: string;
   user: string;
   password: string;
   port: number;
}

abstract class Database {
   protected declare client: unknown;
   protected declare connectionMethod: "url" | "config";

   public abstract connect(url: string): Promise<void>;
   public abstract connect(credentials: DatabaseConfigProps): Promise<void>;

   public abstract disconnect(): Promise<void>;
   public abstract query(sql: string): Promise<{ rowsCount: number; rows: unknown[]; fields: unknown[] } | void>;
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

   public async connect(props: string | DatabaseConfigProps) {
      let credentials: DatabaseConfigProps;
      if (typeof props == "string") {
         const [username, password, host, port, database] = props?.replace("mysql://", "").split(/\:|\@|:\/|\?/g);
         credentials = { user: username, password, host, port: +port, database };
      } else {
         credentials = props;
      }
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
   }

   public async disconnect() {
      if (!this?.client) {
         console.warn("Database is already disconnected");
         return;
      }
      try {
         await this.client?.end();
      } catch (error) {
         console.warn("ERROR: Trying to disconnect from the database");
         throw error;
      }
   }

   public async query(sql: string) {
      try {
         const [rows, fields] = await this.client.query<any[]>({
            sql,
            rowsAsArray: true,
         });
         // return { rows, fields, rowsCount: rows?.length || 0! };
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

   public async connect(props: string | DatabaseConfigProps) {
      let credentials: DatabaseConfigProps;
      if (typeof props == "string") {
         const [username, password, host, port, database] = props?.replace("postgresql://", "").split(/\:|\@|\/|\?/g);
         credentials = { user: username, password, host, port: +port, database };
      } else {
         credentials = props;
      }
      console.log(credentials);
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
   }

   public async disconnect() {
      if (!this?.client) {
         console.warn("Database is already disconnected");
         return;
      }
      try {
         await this.client?.end();
      } catch (error) {
         console.warn("ERROR: Trying to disconnect from the database");
         throw error;
      }
   }

   public async query(sql: string) {
      try {
         const res = await this.client.query(sql);
         // return { rowsCount: res?.rowCount || 0, rows: res.rows, fields: res.fields };
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

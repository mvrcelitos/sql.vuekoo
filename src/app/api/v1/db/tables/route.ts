import { NextResponse } from "next/server";
import * as pg from "pg";

export const POST = async (request: Request) => {
   let client;
   try {
      const body = await request.json();
      client = new pg.Client({
         application_name: "vuekoo/sql",
         connectionTimeoutMillis: 30000,
         connectionString: body.url,
      });

      await client.connect();
      const res = await client.query(
         "SELECT table_name FROM information_schema.tables as ist WHERE ist.table_schema = 'public' AND ist.table_type = 'BASE TABLE' ",
      );

      return NextResponse.json(res?.rows);
   } catch (err) {
      console.log("ERROR on", request.url);
      if (err instanceof Error) {
         return new Response(err.message, { status: 400 });
      }
      if (err instanceof pg.DatabaseError) {
         return new Response(err.message, { status: 400 });
      }
   } finally {
      await client?.end();
   }
};

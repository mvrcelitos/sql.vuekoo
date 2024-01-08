import { NextResponse } from "next/server";
import * as pg from "pg";

export const POST = async (request: Request) => {
   try {
      const body = await request.json();
      const client = new pg.Client({ connectionString: body.url });

      await client.connect();
      const res = await client.query(
         "SELECT table_name FROM information_schema.tables as ist WHERE ist.table_schema = 'public' AND ist.table_type = 'BASE TABLE' ",
      );
      await client.end();

      return NextResponse.json(res?.rows);
   } catch (err) {
      console.log("ERROR on", request.url);
      if (err instanceof Error) {
         return new Response(err.message, { status: 400 });
      }
      if (err instanceof pg.DatabaseError) {
         return new Response(err.message, { status: 400 });
      }
   }
};

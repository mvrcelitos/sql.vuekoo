import { NextResponse } from "next/server";
import * as pg from "pg";

export const POST = async (request: Request) => {
   try {
      const body = await request.json();
      console.log("request body", body);
      const client = new pg.Client({ connectionString: body.url });

      await client.connect();
      const res = await client.query(`SELECT * FROM ${body.table}`);
      await client.end();

      return NextResponse.json(res);
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

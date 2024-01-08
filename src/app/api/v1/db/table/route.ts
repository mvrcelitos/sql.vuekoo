import { NextResponse } from "next/server";
import * as pg from "pg";

export const POST = async (request: Request) => {
   let client;
   try {
      const body = await request.json();
      console.log("request body", body);
      client = new pg.Client({ connectionString: body.url });

      await client.connect();
      const res = await client.query(`SELECT * FROM ${body.table}`);

      return NextResponse.json(res);
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

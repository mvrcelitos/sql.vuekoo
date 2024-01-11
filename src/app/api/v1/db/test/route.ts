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
      return new Response("OK", { status: 200 });
   } catch (err) {
      console.log("ERROR on", request.url);

      if (err instanceof Error) return new Response(err.message, { status: 400 });
      if (err instanceof pg.DatabaseError) return new Response(err.message, { status: 400 });
   } finally {
      await client?.end();
   }
};

import * as pg from "pg";

export const POST = async (request: Request) => {
   try {
      const body = await request.json();
      const client = new pg.Client({ connectionString: body.url });

      await client.connect();
      await client.end();

      return new Response("OK", { status: 200 });
   } catch (err) {
      console.log("ERROR on", request.url);

      if (err instanceof Error) return new Response(err.message, { status: 400 });
      if (err instanceof pg.DatabaseError) return new Response(err.message, { status: 400 });
   }
};

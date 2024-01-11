import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import * as pg from "pg";

import { putSchema, type putSchemaReturn } from "./schema";

export const GET = async (request: Request, context: { params: { uuid: string } }) => {
   let client;
   try {
      const c = cookies();
      if (!c.has("databases")) return new Response("Not found", { status: 404 });
      const databases = JSON.parse(c.get("databases")?.value || "{}");

      client = new pg.Client({ connectionString: databases?.[context.params.uuid]?.url });
      await client.connect();

      const [tables, views] = await Promise.all([
         client.query(
            "SELECT table_name FROM information_schema.tables as ist WHERE ist.table_schema = 'public' AND ist.table_type = 'BASE TABLE' ORDER BY table_name ",
         ),
         client.query("SELECT table_name FROM information_schema.views as isv where isv.table_schema = 'public'"),
      ]);

      return NextResponse.json(
         {
            data: {
               tables: tables.rows.map((row) => row.table_name),
               views: views.rows.map((row) => row.table_name),
            },
         },
         { status: 200 },
      );
   } catch (err) {
      console.error(err);
      return new Response("Internal server error", { status: 500 });
   } finally {
      await client?.end();
   }
};

export const POST = async (request: Request, context: { params: { uuid: string } }) => {
   let client;
   try {
      const body = await request.text();
      const c = cookies();

      const databases = c.has("databases") ? JSON.parse(c.get("databases")?.value || "{}") : {};
      const database = databases?.[context?.params?.uuid];
      if (!database) {
         return new Response("Not found", { status: 404 });
      }

      client = new pg.Client({ connectionString: database.url });
      client.connect();

      const res = await client.query(body);

      return NextResponse.json({
         meta: { count: res.rowCount },
         data: { oid: res.oid, fields: res.fields, rows: res?.rows },
      });
   } catch (err) {
      console.error(err);
      return new Response("Internal server error", { status: 500 });
   } finally {
      await client?.end();
   }
};

export const PUT = async (request: Request, context: { params: { uuid: string } }) => {
   try {
      const body: putSchemaReturn = await request.json();
      if (!putSchema.safeParse(body).success) {
         return new Response("Invalid body", { status: 400 });
      }

      const c = cookies();

      const databases = c.has("databases") ? JSON.parse(c.get("databases")?.value || "{}") : {};
      if (!databases?.[context.params.uuid]) {
         return new Response("Not found", { status: 404 });
      }
      databases[context.params.uuid] = body;

      c.set("databases", JSON.stringify(databases), {
         path: "/",
         expires: 2147483647,
         httpOnly: process.env.NODE_ENV === "production",
         secure: process.env.NODE_ENV === "production",
      });

      return NextResponse.json(databases, { status: 200 });
   } catch (err) {
      console.error(err);
      return new Response("Internal server error", { status: 500 });
   }
};

export const DELETE = async (request: Request, context: { params: { uuid: string } }) => {
   try {
      const c = cookies();

      const databases = c.has("databases") ? JSON.parse(c.get("databases")?.value || "{}") : {};
      if (!databases?.[context.params.uuid]) {
         return new Response("Not found", { status: 404 });
      }

      delete databases[context.params.uuid];

      c.set("databases", JSON.stringify(databases), {
         path: "/",
         expires: 2147483647,
         httpOnly: process.env.NODE_ENV === "production",
         secure: process.env.NODE_ENV === "production",
      });

      return NextResponse.json(databases, { status: 200 });
   } catch (err) {
      console.error(err);
      return new Response("Internal server error", { status: 500 });
   }
};

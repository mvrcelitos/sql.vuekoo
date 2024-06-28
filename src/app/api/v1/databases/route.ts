import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { postSchema, type postSchemaReturn } from "./schema";

export const GET = async (request: Request) => {
   try {
      const c = cookies();
      if (!c.has("databases")) return NextResponse.json({}, { status: 200 });
      const databases = JSON.parse(c.get("databases")?.value || "{}");
      return NextResponse.json(databases, { status: 200 });
   } catch (err) {
      console.error(err);
      return new Response("Internal server error", { status: 500 });
   }
};

export const POST = async (request: Request) => {
   try {
      const body: postSchemaReturn = await request.json();
      if (!postSchema.safeParse(body).success) {
         return new Response("Invalid body", { status: 400 });
      }

      const c = cookies();

      const databases = c.has("databases") ? JSON.parse(c.get("databases")?.value || "{}") : {};
      databases[body.uuid] = body;

      c.set("databases", JSON.stringify(databases), {
         path: "/",
         maxAge: 2147483647,
         httpOnly: process.env.NODE_ENV === "production",
         secure: process.env.NODE_ENV === "production",
      });

      return NextResponse.json(databases, { status: 201 });
   } catch (err) {
      console.error(err);
      return new Response("Internal server error", { status: 500 });
   }
};

import { cookies } from "next/headers";

import { DatabaseType } from "@/interfaces/cookies/databases";

import { swapSchema } from "./schema";

export const PUT = async (request: Request) => {
   try {
      const body = await request.json();
      const safeBody = swapSchema.safeParse(body);
      if (!safeBody.success) {
         return new Response(safeBody.error?.message || "Invalid body", { status: 400 });
      }

      const c = cookies();
      if (!c.has("databases")) return new Response("Not found", { status: 404 });
      const databases: DatabaseType[] = JSON.parse(c.get("databases")?.value || "{}");

      const { from, to } = safeBody.data;

      const entries = Object.entries(databases);
      const temp = entries[from];
      entries[from] = entries[to];
      entries[to] = temp;

      c.set("databases", JSON.stringify(Object.fromEntries(entries)));

      return new Response(undefined, { status: 200 });
   } catch (err) {
      console.error(err);
      return new Response("Internal server error", { status: 500 });
   }
};

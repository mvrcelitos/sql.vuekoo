import { DatabasesType } from "@/interfaces/cookies/databases";
import { cookies } from "next/headers";
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
      const databases: DatabasesType = JSON.parse(c.get("databases")?.value || "{}");

      const entries = Object.entries(databases);
      const temp = entries[safeBody.data.from];
      entries[safeBody.data.from] = entries[safeBody.data.to];
      entries[safeBody.data.to] = temp;

      c.set("databases", JSON.stringify(Object.fromEntries(entries)));

      return new Response(undefined, { status: 200 });
   } catch (err) {
      console.error(err);
      return new Response("Internal server error", { status: 500 });
   }
};

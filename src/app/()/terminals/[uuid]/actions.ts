"use server";

import { z } from "zod";

import { connectDatabase, findDatabase } from "@/lib/database/functions";

const runScriptBodySchema = z.object({
   uuid: z.string().uuid("Invalid database UUID"),
   sql: z.string().min(1, "SQL must be at least 1 character long"),
});
type RunScriptProps = z.infer<typeof runScriptBodySchema>;

export const runScript = async (props: RunScriptProps) => {
   try {
      const parse = runScriptBodySchema.safeParse(props);
      if (!parse.success) return { ok: false, message: "Invalid props", error: parse.error };

      console.log(`Running script ${parse?.data?.sql} for ${parse.data.uuid}`);

      const database = await findDatabase(parse.data.uuid);
      if (!database) return { ok: false, message: "Database not found" };

      const connection = await connectDatabase(database);
      if (!connection) return { ok: false, message: "Error connecting to the database" };

      try {
         const response = await connection.query(parse.data.sql);
         console.log("sucessfully fetched data", Object.assign(response.fields));
         return {
            ok: true,
            message: "Script ran successfully",
            result: { fields: JSON.parse(JSON.stringify(response.fields)), rows: response?.rows },
            // result: { fields: Array.from(response.fields), rows: response?.rows },
         };
      } catch (error) {
         return { ok: false, message: "Error running script" };
      }

      return { ok: true, message: "Script ran successfully" };
   } catch (error) {
      console.error(error);
      return { ok: false, message: "Internal server error" };
   }
};

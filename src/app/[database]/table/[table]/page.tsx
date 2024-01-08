import React from "react";
import { cookies } from "next/headers";
import { Check, X } from "lucide-react";
import * as pg from "pg";

const getTable = async (uuid: string, table: string) => {
   let client;
   try {
      const c = cookies();

      const databases = c.get("databases")?.value;
      if (!databases) return;

      const database = JSON.parse(databases);
      client = new pg.Client({ connectionString: database?.[uuid]?.url });

      await client.connect();
      const res = await client.query(`SELECT * FROM ${table}`);

      return { ...res };
   } catch (err) {
      console.error(err);
   } finally {
      await client?.end();
   }
};

export default async function Page({ params }: { params: { database: string; table: string } }) {
   const table = await getTable(params.database, params.table);

   // const [table, setTable] = React.useState<any | null>();

   return (
      <div className="modern-scroll w-full overflow-x-auto">
         <table className="h-fit w-full overflow-auto text-sm">
            <thead className="sticky left-0 top-0 h-9 border-b border-b-zinc-200 bg-zinc-100 text-zinc-700 dark:border-b-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
               <tr className="px-2">
                  {table?.fields?.map((field: any) => <th key={field.columnID}>{field.name}</th>)}
               </tr>
            </thead>
            <tbody className="text-zinc-800 dark:text-zinc-200">
               {table?.rows?.map((row: any, index: number) => (
                  <tr
                     className="h-10 border-b border-b-zinc-200 hover:bg-zinc-100 hover:text-zinc-950 dark:border-b-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                     key={index}>
                     {Object?.values?.(row)?.map((cell: any) => (
                        <td
                           className="truncate border-r border-r-zinc-200 px-2 last:border-r-0 dark:border-r-zinc-800"
                           key={cell}>
                           {typeof cell === "boolean" &&
                              (cell ? (
                                 <Check className="mx-auto h-5 w-5 shrink-0" size={20} />
                              ) : (
                                 <X className="mx-auto h-5 w-5 shrink-0" size={20} />
                              ))}
                           {typeof cell == "object" &&
                              (cell?.constructor?.name === "Date"
                                 ? (cell as Date).toLocaleString(undefined, { dateStyle: "short" })
                                 : JSON.stringify(cell))}
                           {["string", "number"].includes(typeof cell) ? cell : ""}
                        </td>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

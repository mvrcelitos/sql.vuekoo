import React from "react";
import { cookies } from "next/headers";
import { Check, X } from "lucide-react";
import * as pg from "pg";

import { TableColumnHeader } from "@/components/table-column-header";
import { Td } from "@/components/ui/table";

import { Toolbar } from "./_components/toolbar";

// export const revalidate = 60;

interface paramsProps {
   database: string;
   table: string;
}
interface searchParamsProps {
   sort?: string;
   sortType?: string;
   hide?: string;
}

const getTable = async (uuid: string, table: string, params: searchParamsProps) => {
   let client;
   try {
      const c = cookies();

      const databases = c.get("databases")?.value;
      if (!databases) return;

      const database = JSON.parse(databases);
      client = new pg.Client({ connectionString: database?.[uuid]?.url });

      await client.connect();
      const ordenation = params.sortType?.toLowerCase() === "desc" ? "DESC" : "ASC";
      const res = await client.query(
         `SELECT * FROM ${table} as t ORDER BY ${params?.sort ? `t."${params?.sort}"` : 1} ${ordenation}`,
      );

      const hiddenColumns = params?.hide?.split(",") ?? [];
      res.fields = res.fields.filter((field: any) => !hiddenColumns.includes(field.name));
      return res;
   } catch (err) {
      console.error(err);
   } finally {
      await client?.end();
   }
};

export default async function Page({ params, searchParams }: { params: paramsProps; searchParams: searchParamsProps }) {
   const table = await getTable(params.database, params.table, searchParams);

   return (
      <div className="grid w-full grid-cols-1">
         <div className="modern-scroll h-[calc(100dvh-37px-40px)] max-h-[calc(100dvh-37px-40px)] w-full overflow-x-auto">
            <table className="h-fit w-full overflow-auto text-sm">
               <thead className="sticky left-0 top-0 h-9 border-b border-b-zinc-200 bg-zinc-100 text-zinc-700 dark:border-b-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                  <tr>
                     {table?.fields?.map((field: any) => (
                        <TableColumnHeader key={field.columnID} id={field.name}>
                           {field.name}
                        </TableColumnHeader>
                     ))}
                  </tr>
               </thead>
               <tbody className="text-zinc-800 dark:text-zinc-200">
                  {table?.rows?.map((row: any, index: number) => (
                     <tr
                        className="h-7 border-b border-b-zinc-200 hover:bg-zinc-100 hover:text-zinc-950 dark:border-b-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                        key={index}>
                        {table?.fields?.map((field: any, index: number) => {
                           const cell = row[field.name];
                           switch (cell?.constructor?.name) {
                              case "Date":
                                 return (
                                    <Td key={field.columnID} className="text-right">
                                       {(cell as Date).toLocaleString()}
                                    </Td>
                                 );
                              case "Number":
                                 return (
                                    <Td key={field.columnID} className="text-right">
                                       {(cell as Date).toLocaleString()}
                                    </Td>
                                 );
                              case "String":
                                 return <Td key={field.columnID}>{cell}</Td>;
                              case "Boolean":
                                 const Icon = cell ? Check : X;
                                 return (
                                    <Td key={field.columnID}>
                                       <Icon className="mx-auto size-5 shrink-0" size={20} />
                                    </Td>
                                 );
                              default:
                                 if (cell === null)
                                    return (
                                       <Td key={field.columnID} className="text-center opacity-50">
                                          {"[NULL]"}
                                       </Td>
                                    );
                                 return <Td key={field.columnID}>{cell}</Td>;
                           }
                        })}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <Toolbar rows={table?.rowCount ?? undefined} />
      </div>
   );
}

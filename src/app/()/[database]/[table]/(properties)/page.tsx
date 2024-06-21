import type { Metadata } from "next";
import { cookies } from "next/headers";
import * as pg from "pg";

import { PropertiesDataTableToolbar } from "@/app/()/[database]/[table]/(properties)/toolbar";
import { TableColumnHeader } from "@/components/table-column-header";
import { Table, TableWrapper, TBody, Td, Th, THead, TRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TableCellFormatter } from "@/lib/table-cell-formatter";
import { cn } from "@/lib/utils";
import { DatabaseType } from "@/interfaces/cookies/databases";
import { getDatabase } from "@/lib/database.helpers";

interface paramsProps {
   database: string;
   table: string;
}
interface searchParamsProps {
   sort?: string;
   sortType?: string;
   hide?: string;
}

export const generateMetadata = async ({ params }: { params: paramsProps }): Promise<Metadata> => {
   return { title: `${params?.table}` };
};

export interface GetTableQueryReturn {
   "Column": string;
   "Position": number;
   "Type": string;
   "Null?": boolean;
   "Default": string | number;
   "Comment": string;
}
export type GetTableReturn = Omit<pg.QueryResult<any>, "fields" | "rows"> & {
   fields: {
      columnID: number;
      dataTypeID: number;
      dataTypeModifier: number;
      dataTypeSize: number;
      format: string;
      name: keyof GetTableQueryReturn;
      tableID: number;
   }[];
   rows: Record<keyof GetTableQueryReturn, any>[];
};

const getTable = async (uuid: string, table: string, params: searchParamsProps) => {
   let client;
   try {
      const database = getDatabase(uuid);
      if (!database) return;

      client = new pg.Client({
         application_name: "vuekoo/sql",
         connectionTimeoutMillis: 30000,
         database: database.database,
         host: database.host,
         password: database.password,
         port: database.port,
         user: database.username,
      });

      await client.connect();
      const res = await client.query(
         `SELECT c.column_name as "Column", c.ordinal_position as "Position", case when c.character_maximum_length > 0 then concat(c.udt_name,'(',c.character_maximum_length,')') else c.udt_name end as "Type", c.is_nullable as "Null?", c.column_default as "Default", replace(pgd.description,'
','\n') as "Comment"
         FROM pg_catalog.pg_statio_all_tables as st
         INNER JOIN pg_catalog.pg_description pgd on pgd.objoid = st.relid
         RIGHT JOIN information_schema.columns c on pgd.objsubid = c.ordinal_position and c.table_schema = st.schemaname and c.table_name = st.relname
         WHERE c.table_schema = 'public' and c.table_name = $1
         ORDER BY c.ordinal_position`,
         [table],
      );

      const hiddenColumns = params?.hide?.split(",") ?? [];
      res.fields = res.fields.filter((field: any) => !hiddenColumns.includes(field.name));

      return res as unknown as GetTableReturn;
   } catch (err) {
      console.error(err);
   } finally {
      await client?.end();
   }
};

export default async function Page({ params, searchParams }: { params: paramsProps; searchParams: searchParamsProps }) {
   const table = await getTable(params.database, params.table, searchParams);

   return (
      <main className="flex h-full flex-initial grow flex-col overflow-hidden">
         {/* <Flex child="div" orientation="vertical" className="grow"> */}
         <TableWrapper className="border-t border-t-zinc-200 dark:border-t-zinc-800">
            <Table>
               <THead>
                  <TRow>
                     {!!table?.fields?.length && (
                        <Th className="sticky left-0 top-0 z-20 w-0 border-zinc-300 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800">
                           #
                        </Th>
                     )}
                     {table?.fields?.map((field, index) => (
                        <TableColumnHeader
                           key={index}
                           id={field?.name}
                           className={cn(field.name === "Comment" && "w-[35%]")}>
                           {field.name}
                        </TableColumnHeader>
                     ))}
                  </TRow>
               </THead>
               <TBody>
                  {table?.rows?.map((row, index) => (
                     <TRow
                        className="group/tr h-7 border-b-zinc-200 hover:bg-zinc-100 hover:text-zinc-950 dark:border-b-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                        key={index}>
                        {table?.fields?.length && (
                           <Td className="sticky left-0 z-10 w-0 bg-zinc-100 text-end group-hover/tr:bg-zinc-200 dark:bg-zinc-900 dark:group-hover/tr:bg-zinc-800">
                              {index + 1}
                           </Td>
                        )}
                        {table?.fields?.map((field, index) => {
                           const cell = row[field.name];
                           const config = TableCellFormatter(row[field.name]);

                           return (
                              <Td
                                 key={index}
                                 className={cn(config.className, field?.name === "Comment" && "relative w-[35%]")}>
                                 {field?.name !== "Comment" || cell == null ? (
                                    config?.format?.(cell) ?? cell
                                 ) : (
                                    <Tooltip key={index}>
                                       <TooltipTrigger asChild>
                                          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-2">
                                             <p className="w-full truncate">
                                                {config?.format?.(cell)?.replace("\n", "1") ?? cell}
                                             </p>
                                          </div>
                                       </TooltipTrigger>
                                       <TooltipContent className="whitespace-pre-line">
                                          {config?.format?.(cell) ?? cell}
                                       </TooltipContent>
                                    </Tooltip>
                                 )}
                              </Td>
                           );
                        })}
                     </TRow>
                  ))}
               </TBody>
            </Table>
         </TableWrapper>
         <PropertiesDataTableToolbar rows={table?.rows!} />
         {/* </Flex> */}
      </main>
   );
}

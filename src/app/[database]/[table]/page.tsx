import type { Metadata } from "next";
import { cookies } from "next/headers";
import * as pg from "pg";

import { TableColumnHeader } from "@/components/table-column-header";
import { Flex } from "@/components/ui/layout";
import { Table, TableWrapper, TBody, Td, Th, THead, TRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TableCellFormatter } from "@/lib/table-cell-formatter";
import { cn } from "@/lib/utils";

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

const getTable = async (uuid: string, table: string, params: searchParamsProps) => {
   let client;
   try {
      const c = cookies();

      const databases = c.get("databases")?.value;
      if (!databases) return;

      const database = JSON.parse(databases);
      client = new pg.Client({
         application_name: "vuekoo/sql",
         connectionTimeoutMillis: 30000,
         connectionString: database?.[uuid]?.url,
      });

      //       select
      //     c.table_schema,
      //     c.table_name,
      //     c.column_name,
      //     pgd.description
      // from pg_catalog.pg_statio_all_tables as st
      // inner join pg_catalog.pg_description pgd on (
      //     pgd.objoid = st.relid
      // )
      // right join information_schema.columns c on (
      //     pgd.objsubid   = c.ordinal_position and
      //     c.table_schema = st.schemaname and
      //     c.table_name   = st.relname
      // )
      // where c.table_schema = 'public'

      await client.connect();
      const res = await client.query(
         `SELECT c.column_name as "Column", c.ordinal_position as "Position", c.udt_name as "Type", c.is_nullable as "Null?", c.column_default as "Default", replace(pgd.description,'
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
      <Flex child="main" orientation="vertical" className="grow">
         <TableWrapper className="border-t border-t-zinc-200 dark:border-t-zinc-800">
            {/* <DataTable fields={table?.fields as any} rows={table?.rows} /> */}
            <Table>
               <THead>
                  <TRow>
                     {!!table?.fields?.length && (
                        <Th className="sticky left-0 top-0 z-20 w-0 border-zinc-300 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800">
                           #
                        </Th>
                     )}
                     {table?.fields?.map((field) => (
                        <TableColumnHeader
                           key={field.columnID}
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
                        className="h-7 border-b-zinc-200 hover:bg-zinc-100 hover:text-zinc-950 dark:border-b-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                        key={index}>
                        {table?.fields?.length && (
                           <Td className="sticky left-0 z-10 w-0 bg-zinc-100 text-end dark:bg-zinc-900">{index + 1}</Td>
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
                                    <Tooltip>
                                       <TooltipTrigger asChild>
                                          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-2">
                                             <p className="w-fit truncate">
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
         {/* <DataTableToolbar rows={table?.rowCount} /> */}
         {/* <Toolbar rows={table?.rowCount ?? undefined} /> */}
      </Flex>
   );
}

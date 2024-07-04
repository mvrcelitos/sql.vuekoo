import { PropertiesDataTableToolbar } from "@/app/()/[database]/[table]/(properties)/toolbar";
import { TableColumnHeader } from "@/components/table-column-header";
import { Table, TableWrapper, TBody, Td, Th, THead, TRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DatabaseFactory } from "@/lib/database";
import { findDatabase } from "@/lib/database/functions";
import { TableCellFormatter } from "@/lib/table-cell-formatter";
import { cn } from "@/lib/utils";

import { getProperties } from "./actions";
import { paramsProps, searchParamsProps } from "./types";

export const generateMetadata = async ({ params }: { params: paramsProps }) => ({
   title: params?.table,
});

const getData = async (uuid: string, table: string) => {
   "use server";
   const database = await findDatabase(uuid);
   if (!database) return;

   const connection = await DatabaseFactory(database.type)?.connectWithDatabase(database);
   if (!connection) return;

   const properties = await getProperties(connection, table);
   if (!properties) return;

   return properties;
};

export default async function Page({ params }: { params: paramsProps; searchParams: searchParamsProps }) {
   const data = await getData(params.uuid, params.table);
   return (
      <main className="flex h-full flex-initial grow flex-col overflow-hidden">
         <TableWrapper className="border-t border-t-zinc-200 dark:border-t-zinc-800">
            <Table>
               <THead>
                  <TRow>
                     {!!data?.fields?.length && (
                        <Th className="sticky left-0 top-0 z-[2] w-0 border-zinc-300 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800">
                           #
                        </Th>
                     )}
                     {data?.fields?.map((field, index) => (
                        <TableColumnHeader
                           key={index}
                           id={field?.name}
                           className={cn(field.name === "Comment" && "max-w-[35vw]")}>
                           {field.name}
                        </TableColumnHeader>
                     ))}
                  </TRow>
               </THead>
               <TBody>
                  {data?.rows?.map((row, index) => (
                     <TRow
                        className="group/tr h-7 border-b-zinc-200 hover:bg-zinc-100 hover:text-zinc-950 dark:border-b-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                        key={index}>
                        {data?.fields?.length && (
                           <Td className="sticky left-0 z-[1] w-0 bg-zinc-100 text-end group-hover/tr:bg-zinc-200 dark:bg-zinc-900 dark:group-hover/tr:bg-zinc-800">
                              {index + 1}
                           </Td>
                        )}
                        {data?.fields?.map((field, index) => {
                           const cell = row[field.name];
                           const config = TableCellFormatter(row[field.name]);

                           return (
                              <Td
                                 key={index}
                                 className={cn(config.className, field?.name === "Comment" && "relative max-w-[35vw]")}>
                                 {field?.name !== "Comment" || cell == null ? (
                                    config?.format?.(cell) ?? cell
                                 ) : (
                                    <Tooltip key={index}>
                                       <TooltipTrigger asChild>
                                          <p className="truncate">
                                             {config?.format?.(cell)?.replace("\n", "1") ?? cell}
                                          </p>
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
         <PropertiesDataTableToolbar rows={data?.rows!} />
         {/* </Flex> */}
      </main>
   );
}

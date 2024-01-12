"use client";

import { Check, ChevronDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/layout";
import { Table, TableWrapper, TBody, Td, Th, THead, TRow } from "@/components/ui/table";

import { ScriptResultToolbar } from "./script-result-toolbar";
import { useScriptStore } from "./use-script-store";

export const ScriptResult = () => {
   const { result } = useScriptStore();

   if (!result) return null;

   return (
      <Flex orientation="vertical" className="max-h-full w-full overflow-hidden">
         <TableWrapper className="border-t border-t-zinc-200 dark:border-t-zinc-800">
            <Table>
               <THead>
                  <TRow>
                     <Th className="sticky left-0 top-0 z-20 w-0 border-zinc-300 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800">
                        #
                     </Th>
                     {result?.data?.fields?.map((field: any) => (
                        <Th key={field.columnID}>
                           <div className="flex items-center justify-between gap-2">
                              <span>{field.name}</span>
                              <Button size="icon-custom" intent="ghost" className="-mr-2 size-7">
                                 <ChevronDown className="size-4 shrink-0" />
                              </Button>
                           </div>
                        </Th>
                     ))}
                  </TRow>
               </THead>
               <TBody>
                  {result?.data?.rows?.map((row: any, index: number) => (
                     <TRow
                        className="h-7 border-b border-b-zinc-200 hover:bg-zinc-100 hover:text-zinc-950 dark:border-b-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                        key={index}>
                        <Td className="sticky left-0 z-10 w-0 bg-zinc-100 dark:bg-zinc-900">{index + 1}</Td>

                        {result?.data?.fields?.map((field: any, index: number) => {
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
                     </TRow>
                  ))}
               </TBody>
            </Table>
         </TableWrapper>
         <ScriptResultToolbar rows={result?.data?.rows?.length || 0} />
      </Flex>
   );
};

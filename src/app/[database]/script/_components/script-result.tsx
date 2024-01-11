"use client";

import { Check, ChevronDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Table, TBody, Td, Th, THead, TRow } from "@/components/ui/table";

import { Toolbar } from "./toolbar";
import { useScriptStore } from "./use-script-store";

export const ScriptResult = () => {
   const { result } = useScriptStore();

   if (!result) return null;

   return (
      <div className="-mx-6 -mb-6 flex h-full max-h-[calc(100%+1.5rem)] w-[calc(100%+3rem)] flex-col overflow-hidden">
         <div className="modern-scroll h-auto w-full overflow-x-auto border-t border-t-zinc-200 dark:border-t-zinc-800">
            <Table className="h-fit w-full overflow-auto text-sm ">
               <THead>
                  <TRow>
                     <Th className="sticky left-0 top-0 z-20 border-zinc-300 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800">
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
                        <Td className="sticky left-0 z-10 bg-zinc-100 dark:bg-zinc-900">{index + 1}</Td>

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
         </div>
         <Toolbar rows={result?.data?.rows?.length || 0} />
      </div>
   );
};

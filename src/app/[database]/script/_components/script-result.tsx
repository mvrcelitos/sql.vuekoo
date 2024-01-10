"use client";

import { Check, ChevronDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useScriptStore } from "./use-script-store";

export const ScriptResult = () => {
   const { result } = useScriptStore();

   if (!result) return null;

   return (
      <div className="modern-scroll -mx-6 -mb-6 h-[calc(100%+1.5rem)] w-[calc(100%+3rem)] overflow-x-auto">
         <table className="h-fit w-full overflow-auto border-t border-t-zinc-200 text-sm dark:border-t-zinc-800">
            <thead className="sticky left-0 top-0 h-9 border-b border-b-zinc-200 bg-zinc-100 text-zinc-700 dark:border-b-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
               <tr>
                  {result?.data?.fields?.map((field: any) => (
                     <th
                        key={field.columnID}
                        className="border-r border-r-zinc-200 px-3 font-normal last:border-r-0 dark:border-r-zinc-800">
                        <div className="flex items-center justify-between gap-2">
                           <span>{field.name}</span>
                           <Button size="icon-custom" intent="ghost" className="-mr-2 size-7">
                              <ChevronDown className="size-4 shrink-0" />
                           </Button>
                        </div>
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody className="text-zinc-800 dark:text-zinc-200">
               {result?.data?.rows?.map((row: any, index: number) => (
                  <tr
                     className="h-7 border-b border-b-zinc-200 hover:bg-zinc-100 hover:text-zinc-950 dark:border-b-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                     key={index}>
                     {result?.data?.fields.map((field: any, index: number) => {
                        const cell = row[field.name];
                        return (
                           <td
                              className={cn(
                                 "truncate border-r border-r-zinc-200 px-2 last:border-r-0 dark:border-r-zinc-800",
                                 typeof cell == "number" && "text-right",
                                 typeof cell == "object" && cell?.constructor?.name === "Date" && "text-right",
                              )}
                              key={field.columnID}>
                              {typeof cell === "boolean" &&
                                 (cell ? (
                                    <Check className="mx-auto h-5 w-5 shrink-0" size={20} />
                                 ) : (
                                    <X className="mx-auto h-5 w-5 shrink-0" size={20} />
                                 ))}
                              {typeof cell == "object" &&
                                 (cell?.constructor?.name === "Date"
                                    ? (cell as Date).toLocaleString()
                                    : JSON.stringify(cell))}
                              {["string", "number"].includes(typeof cell) ? cell : ""}
                           </td>
                        );
                     })}
                     {/* {Object?.values?.(row)?.map((cell: any, index) => (
                        <td
                           className={cn(
                              "truncate border-r border-r-zinc-200 px-2 last:border-r-0 dark:border-r-zinc-800",
                              typeof cell == "number" && "text-right",
                              typeof cell == "object" && cell?.constructor?.name === "Date" && "text-right",
                           )}
                           key={index}>
                           {typeof cell === "boolean" &&
                              (cell ? (
                                 <Check className="mx-auto h-5 w-5 shrink-0" size={20} />
                              ) : (
                                 <X className="mx-auto h-5 w-5 shrink-0" size={20} />
                              ))}
                           {typeof cell == "object" &&
                              (cell?.constructor?.name === "Date"
                                 ? (cell as Date).toLocaleString()
                                 : JSON.stringify(cell))}
                           {["string", "number"].includes(typeof cell) ? cell : ""}
                        </td>
                     ))} */}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

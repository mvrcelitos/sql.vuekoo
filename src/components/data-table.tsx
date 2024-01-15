import { Check, X } from "lucide-react";

import { TBody, THead, TRow, Table, Td, Th } from "@/components/ui/table";
import { TableColumnHeader } from "@/components/table-column-header";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export interface GenericFieldProps {
   columnID: number;
   dataTypeID: 25;
   dataTypeSize: number;
   format: string;
   name: string;
   tableID: number;
}

export interface DataTableProps {
   fields?: GenericFieldProps[];
   rows?: Record<string, any>[];
   defaultHeader?: boolean;
}

const formatter = (cell: any) => {
   if (cell === null) return { className: "text-center opacity-50", format: () => "[NULL]" };
   const types = {
      Date: { className: "text-right", format: (cell: Date) => cell.toLocaleString() },
      Number: { className: "text-right" },
      String: {},
      Boolean: {
         format: (cell: boolean) => {
            const Icon = cell ? Check : X;
            return <Icon className={"mx-auto size-5 shrink-0"} size={20} />;
         },
      },
      Array: { format: (cell: Array<any>) => JSON.stringify(cell) },
      Object: { format: (cell: Object) => JSON.stringify(cell) },
   };

   if (cell?.constructor?.name in types) return (types as any)[cell?.constructor?.name];
   if (cell === null) return { className: "text-center opacity-50", format: () => "[NULL]" };
   return { className: "text-red-500", format: (cell: any) => JSON.stringify(cell) };
};

export const DataTable = ({ fields, rows, defaultHeader }: DataTableProps) => {
   return (
      <Table>
         <THead>
            <TRow>
               {!!fields?.length && (
                  <Th className="sticky left-0 top-0 z-20 w-0 border-zinc-300 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800">
                     #
                  </Th>
               )}
               {fields?.map((field) => {
                  const Comp = defaultHeader ? Th : TableColumnHeader;
                  {
                     return (
                        <Comp key={field.columnID} id={defaultHeader ? (undefined as any) : field?.name}>
                           {field.name}
                        </Comp>
                     );
                  }
               })}
            </TRow>
         </THead>
         <TBody>
            {rows?.map((row, index) => (
               <TRow
                  className="h-7 border-b-zinc-200 hover:bg-zinc-100 hover:text-zinc-950 dark:border-b-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                  key={index}>
                  {fields?.length && (
                     <Td className="sticky left-0 z-10 w-0 bg-zinc-100 text-end dark:bg-zinc-900">{index + 1}</Td>
                  )}
                  {fields?.map((field, index) => {
                     const cell = row[field.name];
                     const config = formatter(row[field.name]);

                     return (
                        <Td key={index} className={config.className}>
                           {config?.format?.(cell) ?? cell}
                        </Td>
                     );
                  })}
               </TRow>
            ))}
         </TBody>
      </Table>
   );
};

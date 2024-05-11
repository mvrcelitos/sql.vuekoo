import { TableColumnHeader } from "@/components/table-column-header";
import { Table, TBody, Td, Th, THead, TRow } from "@/components/ui/table";
import { TableCellFormatter } from "@/lib/table-cell-formatter";

export interface GenericFieldProps {
   columnID: number;
   dataTypeID: number;
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
                  className="group/tr h-7 border-b-zinc-200 hover:bg-zinc-100 hover:text-zinc-950 dark:border-b-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                  key={index}>
                  {fields?.length && (
                     <Td className="sticky left-0 z-10 w-0 bg-zinc-100 text-end group-hover/tr:bg-zinc-200 dark:bg-zinc-900 dark:group-hover/tr:bg-zinc-800">
                        {index + 1}
                     </Td>
                  )}
                  {fields?.map((field, index) => {
                     const cell = row[field.name];
                     const config = TableCellFormatter(row[field.name]);

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

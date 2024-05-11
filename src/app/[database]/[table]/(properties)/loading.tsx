import { Table, TableWrapper, TBody, Td, Th, THead, TRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function Loading() {
   const fields = ["Column", "Position", "Data type", "Null?", "Default", "Comment"];
   return (
      <main className="flex shrink-0 grow overflow-hidden">
         <TableWrapper className="border-t border-t-zinc-200 dark:border-t-zinc-800">
            {/* <DataTable fields={table?.fields as any} rows={table?.rows} /> */}
            <Table>
               <THead>
                  <TRow>
                     <Th className="sticky left-0 top-0 z-20 w-0 border-zinc-300 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800">
                        #
                     </Th>
                     {fields?.map((field, index) => (
                        <Th key={index} id={field} className={cn(field === "Comment" && "w-[35%]")}>
                           {field}
                        </Th>
                     ))}
                  </TRow>
               </THead>
               <TBody>
                  {new Array(6).fill(null).map((_, index) => (
                     <TRow
                        className="h-7 border-b-zinc-200 hover:bg-zinc-100 hover:text-zinc-950 dark:border-b-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                        key={index}>
                        {fields?.length && (
                           <Td className="sticky left-0 z-10 w-0 bg-zinc-100 text-end dark:bg-zinc-900">{index + 1}</Td>
                        )}
                        {fields?.map((field, index) => {
                           return (
                              <Td key={index} className={cn(field === "Comment" && "relative w-[35%]")}>
                                 <div
                                    className={cn(
                                       "h-4 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800",
                                       ["w-2/4", "w-3/5", "w-4/6", "w-3/4"][Math.round(Math.random() * 3) % 4],
                                    )}
                                 />
                              </Td>
                           );
                        })}
                     </TRow>
                  ))}
               </TBody>
            </Table>
         </TableWrapper>
      </main>
   );
}

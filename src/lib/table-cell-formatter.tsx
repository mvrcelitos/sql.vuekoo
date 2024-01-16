import { Check, X } from "lucide-react";

export const TableCellFormatter = (cell: any) => {
   if (cell === null) return { className: "text-center dark:text-zinc-500 text-zinc-400", format: () => "[NULL]" };
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
   return { className: "text-red-500", format: (cell: any) => JSON.stringify(cell) };
};

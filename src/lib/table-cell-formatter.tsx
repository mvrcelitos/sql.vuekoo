import { Check, X } from "lucide-react";

const types = ["null", "string", "number", "boolean", "date", "array", "object"];

type Types = (typeof types)[number];

export interface TableCellFormatterPropsReturn<T extends unknown> {
   type: Types;
   format?: (cell?: T) => any;
   className?: string;
}

export const TableCellFormatter = <T extends unknown = unknown>(cell: T): TableCellFormatterPropsReturn<T> => {
   if (cell === null)
      return {
         type: "null",
         className: "text-center dark:text-zinc-500 text-zinc-400",
         format: () => "[NULL]",
      } as const;
   const types: { [k in Types]: TableCellFormatterPropsReturn<T> } = {
      Date: { type: "date", className: "text-end", format: (cell) => cell?.toLocaleString() } as const,
      Number: { type: "number", className: "text-end" } as const,
      String: { type: "string" } as const,
      Boolean: {
         type: "boolean",
         format: (cell) => {
            const Icon = cell ? Check : X;
            return <Icon className={"mx-auto size-5 shrink-0"} size={20} />;
         },
      } as const,
      Array: { type: "array", format: (cell) => JSON.stringify(cell) } as const,
      Object: { type: "object", format: (cell) => JSON.stringify(cell) } as const,
   } satisfies Record<string, TableCellFormatterPropsReturn<T>>;

   const constructorName = cell?.constructor?.name as Types | undefined;
   if (constructorName) return types[constructorName];

   return { type: "object", className: "text-red-500", format: (cell: any) => JSON.stringify(cell) } as const;
};

const a = TableCellFormatter(123321312);
a.type;

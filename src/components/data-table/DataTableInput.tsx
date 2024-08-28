"use client";

import { TableCellFormatterPropsReturn } from "@/lib/table-cell-formatter";
import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";

export interface DataTableInputProps extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
   type: "null" | "string" | "number" | "boolean" | "date" | "array" | "object";
   config?: TableCellFormatterPropsReturn<unknown>;
   defaultValue?: string | number;
}

export const DataTableInput = forwardRef<HTMLDivElement, DataTableInputProps>(
   ({ className, defaultValue, ...props }, ref) => {
      let newValue = defaultValue;
      const [changed, setChanged] = useState<string | null>(null);

      return (
         <div
            {...props}
            contentEditable
            data-changed={!!changed}
            className={cn(
               "h z-[1] h-full bg-transparent px-2 leading-7 outline-none focus-within:z-[1] focus-within:bg-accent focus-within:ring-1 focus-within:ring-c400 [&:not(:focus)]:cursor-default",
               !!changed ? "text-primary" : null,
               className,
            )}
            onKeyDown={(ev) => {
               if (ev.key === "Escape") {
                  ev.currentTarget.innerText = changed ?? defaultValue?.toString()!;
                  return ev.currentTarget.blur();
               }
               if (ev.key === "Enter") return ev.currentTarget.blur();
            }}
            onBlur={(ev) => {
               const value = ev.currentTarget.innerText;
               if (value == defaultValue) return setChanged(null);
               setChanged(value);
            }}
            ref={ref}>
            {defaultValue}
         </div>
      );
   },
);
DataTableInput.displayName = "DataTableInput";

import React from "react";

import { cn } from "@/lib/utils";

export const TableWrapper = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
   ({ className, ...props }, ref) => {
      return <div ref={ref} {...props} className={cn("modern-scroll w-full grow overflow-x-auto")}></div>;
   },
);
TableWrapper.displayName = "TableWrapper";

export const Table = React.forwardRef<HTMLTableElement, React.ComponentPropsWithoutRef<"table">>(
   ({ className, ...props }, ref) => {
      return (
         <table
            ref={ref}
            className={cn(
               "w-full border-separate border-spacing-0 overflow-x-auto text-sm text-zinc-800 dark:text-zinc-200",
               className,
            )}
            {...props}
         />
      );
   },
);
Table.displayName = "Table";

export const THead = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<"thead">>(
   ({ className, ...props }, ref) => {
      return (
         <thead
            ref={ref}
            className={cn(
               "sticky left-0 top-0 z-20 h-9 border-b border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900",
               className,
            )}
            {...props}
         />
      );
   },
);
THead.displayName = "Thead";

export const TBody = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<"tbody">>(
   ({ className, ...props }, ref) => {
      return <tbody ref={ref} className={cn(className)} {...props} />;
   },
);
TBody.displayName = "Tbody";

export const TRow = React.forwardRef<HTMLTableRowElement, React.ComponentPropsWithoutRef<"tr">>(
   ({ className, ...props }, ref) => {
      return <tr ref={ref} className={cn("[&:last>td]:border-b-0 [&>td]:border-b", className)} {...props} />;
   },
);
TRow.displayName = "TRow";

export const Th = React.forwardRef<HTMLTableHeaderCellElement, React.ComponentPropsWithoutRef<"th">>(
   ({ className, ...props }, ref) => {
      return (
         <th
            ref={ref}
            className={cn(
               "border-b border-r border-zinc-200 bg-zinc-100 px-3 font-medium last:border-r-0 dark:border-zinc-800 dark:bg-zinc-900",
               className,
            )}
            {...props}
         />
      );
   },
);
Th.displayName = "Th";

export const Td = React.forwardRef<HTMLTableDataCellElement, React.ComponentPropsWithoutRef<"td">>(
   ({ className, ...props }, ref) => {
      return (
         <td
            ref={ref}
            className={cn("truncate border-r border-zinc-200 px-2 last:border-r-0 dark:border-zinc-800", className)}
            {...props}
         />
      );
   },
);
Td.displayName = "Td";

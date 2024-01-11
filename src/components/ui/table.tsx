import { cn } from "@/lib/utils";
import React from "react";

export const Table = React.forwardRef<HTMLTableElement, React.ComponentPropsWithoutRef<"table">>(
   ({ className, ...props }, ref) => {
      return (
         <table
            ref={ref}
            className={cn("modern-scroll w-full overflow-x-auto text-zinc-800 dark:text-zinc-200", className)}
            {...props}
         />
      );
   },
);

export const THead = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<"thead">>(
   ({ className, ...props }, ref) => {
      return (
         <thead
            ref={ref}
            className={cn(
               "sticky left-0 top-0 h-9 border-b border-b-zinc-200 bg-zinc-100 dark:border-b-zinc-800 dark:bg-zinc-900",
               className,
            )}
            {...props}
         />
      );
   },
);

export const TBody = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<"tbody">>(
   ({ className, ...props }, ref) => {
      return <tbody ref={ref} className={cn(className)} {...props} />;
   },
);

export const TRow = React.forwardRef<HTMLTableRowElement, React.ComponentPropsWithoutRef<"tr">>(
   ({ className, ...props }, ref) => {
      return <tr ref={ref} className={cn(className)} {...props} />;
   },
);

export const Th = React.forwardRef<HTMLTableHeaderCellElement, React.ComponentPropsWithoutRef<"th">>(
   ({ className, ...props }, ref) => {
      return (
         <th
            ref={ref}
            className={cn(
               "border-r border-r-zinc-200 px-3 font-medium last:border-r-0 dark:border-r-zinc-800",
               className,
            )}
            {...props}
         />
      );
   },
);

export const Td = React.forwardRef<HTMLTableDataCellElement, React.ComponentPropsWithoutRef<"td">>(
   ({ className, ...props }, ref) => {
      return (
         <td
            ref={ref}
            className={cn("truncate border-r border-r-zinc-200 px-2 last:border-r-0 dark:border-r-zinc-800", className)}
            {...props}
         />
      );
   },
);

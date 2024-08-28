"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { ChevronDown, Eraser } from "lucide-react";

import { useTerminalContext } from "@/app/()/terminals/[uuid]/context";
import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TableWrapper } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const TerminalResults = ({}) => {
   const height = useRef<number | null>(null);
   const { result, clearResults } = useTerminalContext();
   const [isDragging, setIsDragging] = useState<boolean>(false);

   const [open, setOpen] = useState<boolean>(true);

   const resizeHeight = useCallback(
      (ev: React.PointerEvent<HTMLButtonElement>) => {
         if (!open) return;
         const parent = ev.currentTarget.parentElement! as HTMLDivElement;
         const minHeight = 2 * parseFloat(getComputedStyle(document.documentElement).fontSize.replace(/\D/g, ""));
         const maxHeight = Array.from(parent?.parentElement?.children!).reduce(
            (acc, cur) => {
               if (cur !== parent) {
                  const computedStyle = window.getComputedStyle(cur, null);
                  const height =
                     +computedStyle.minHeight?.replace(/\D/g, "") || +computedStyle.height?.replace(/\D/g, "") || 0;
                  acc -= height;
               }
               return acc;
            },
            parent.parentElement?.offsetHeight ?? 0,
         );
         const initialY = ev.clientY;
         const initialHeight = parent.offsetHeight;
         height.current = initialHeight;

         const recalculate = (ev: PointerEvent) => {
            const y = ev.clientY;
            const diff = initialY - y;
            parent.style.maxHeight = `${Math.max(Math.min(initialHeight + diff, maxHeight), minHeight)}px`;
         };

         const signal = new AbortController();
         window.addEventListener("pointermove", recalculate, { signal: signal.signal });

         // When mouse ups, remove the event listener
         window.addEventListener(
            "pointerup",
            () => {
               setIsDragging(false);
               if (parent.style.maxHeight === `${minHeight}px`) {
                  setOpen(false);
               } else {
                  height.current = parseFloat(parent.style.maxHeight) || minHeight;
               }
               signal.abort();
            },
            { once: true },
         );

         return () => {};
      },
      [open],
   );

   return useMemo(() => {
      if (!result?.fields) return null;
      return (
         <div
            style={{ maxHeight: open ? (height?.current ? `${height.current}px` : "60%") : "2rem" }}
            className={cn("z-[1] flex flex-1 basis-full flex-col will-change-auto", open ? null : "overflow-hidden")}>
            <button
               className={cn(
                  "z-[1] block w-full",
                  open
                     ? isDragging
                        ? "-my-[0.3125rem] cursor-ns-resize py-1"
                        : "-my-1 cursor-ns-resize py-1"
                     : "cursor-default",
               )}
               onPointerDown={(ev) => {
                  setIsDragging(true);
                  resizeHeight(ev);
               }}>
               <Separator
                  className={cn(
                     "shrink-0",
                     isDragging
                        ? "h-[0.1875rem] max-h-[0.1875rem] !border-y border-primary bg-primaryActive"
                        : "bg-300",
                  )}
               />
            </button>
            <div className="flex h-8 items-center justify-between bg-muted">
               <div className="px-2 text-[0.8125rem] text-700">Fetched {result?.rows?.length} rows</div>
               <div className="flex h-full items-center">
                  <Separator orientation="vertical" className="shrink-0" />
                  <Button
                     intent="ghost"
                     size="icon-xs"
                     className="ml-auto rounded-none hocus:bg-300 hocus:shadow-inner"
                     onClick={() => clearResults()}>
                     <span className="sr-only">Clear results</span>
                     <Eraser className="size-4 shrink-0" />
                  </Button>
                  <Separator orientation="vertical" className="shrink-0 bg-300" />
                  <Button
                     intent="ghost"
                     size="icon-xs"
                     className="ml-auto rounded-none hocus:bg-300 hocus:shadow-inner"
                     onClick={() => {
                        setOpen((prev) => !prev);
                     }}>
                     <span className="sr-only">Toggle results</span>
                     <ChevronDown
                        className={cn(
                           "size-4 shrink-0 transition-transform will-change-transform",
                           !open ? "rotate-180" : null,
                        )}
                     />
                  </Button>
               </div>
            </div>
            <Separator className="shrink-0 bg-300" />
            {isDragging ? (
               <div className="w-full grow bg-accent" />
            ) : (
               <TableWrapper>
                  {/* @ts-expect-error */}
                  <DataTable fields={result?.fields!} rows={result?.rows!} defaultHeader />
               </TableWrapper>
            )}
         </div>
      );
   }, [open, result, isDragging]);
};

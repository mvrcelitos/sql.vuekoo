"use client";

import React from "react";
import { ChevronRight, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface AsideGroupProps {
   children?: React.ReactNode;
   className?: string;
   disabled?: boolean;

   title: string | React.ReactNode;
   description?: string | React.ReactNode;
   status?: "ok" | "loading" | "error";

   open?: boolean;

   onSelect?: (ev?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void> | void;
   onOpenChange?: (open: boolean) => void;
   forceMount?: boolean;
}

export const AsideGroup = ({
   children,
   title,
   description,
   disabled,
   status = "ok",
   onSelect,
   ...props
}: AsideGroupProps) => {
   const [open, setOpen] = React.useState(props?.open ?? false);

   return (
      <div aria-orientation="vertical" className={cn("flex flex-col gap-1", props.className)}>
         <div className={"flex items-center justify-start gap-2 rounded-md p-1 dark:hover:bg-zinc-800"}>
            <Button
               type="button"
               intent="ghost"
               className="relative h-6 w-6 shrink-0 p-0 dark:hover:bg-zinc-700 dark:focus-visible:bg-zinc-700"
               disabled={["loading", "error"].includes(status) || disabled}
               onClick={async (ev) => {
                  await onSelect?.(ev);
                  if (status == "ok") {
                     setOpen((x) => !x);
                     props?.onOpenChange?.(!open);
                  }
               }}>
               {status == "loading" && <Loader2 className="h-4 w-4 shrink-0 animate-spin" />}
               {status == "error" && <X className="h-4 w-4 shrink-0" />}
               {status == "ok" && (
                  <ChevronRight
                     className={cn("h-4 w-4 shrink-0 duration-100", open && "rotate-90")}
                     height={16}
                     width={16}
                  />
               )}
            </Button>
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 overflow-hidden">
               <p className="grow truncate text-sm font-medium text-zinc-700 dark:text-zinc-200">{title}</p>
               <p className="truncate text-xs text-zinc-400 empty:w-0 dark:text-zinc-500">{description}</p>
            </div>
         </div>
         {props.forceMount !== true && open && children}
         {props.forceMount === true && <Slot className={cn(!open && "hidden")} children={children} />}
      </div>
   );
};

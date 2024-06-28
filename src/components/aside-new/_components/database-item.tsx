"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
   ChevronRight,
   Copy,
   Loader2,
   MoreVertical,
   Pencil,
   RefreshCcw,
   Table2,
   Trash,
   Unplug,
   X,
   Zap,
} from "lucide-react";

import { DatabaseReturn } from "@/components/aside-new/_components/create-database/schema";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { availableDatabases } from "@/constants/available-databases";
import { cn } from "@/lib/utils";

import { getDatabaseData } from "./actions";

interface DatabaseItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
   database: DatabaseReturn;
   hover: boolean;
}

const availableStates = ["idle", "pending", "connected", "error", "loading"] as const;
type AvailableStates = (typeof availableStates)[number];

export const DatabaseItem = React.forwardRef<any, DatabaseItemProps>(({ database, hover, ...props }, ref) => {
   // Data control hooks
   const pathname = usePathname();
   const pathnameType: "properties" | "data" =
      pathname?.replace(/\/databases\/(.+?)\/(\w+?)\//, "") === "data" ? "data" : "properties";

   // Animation useStates
   const [open, setOpen] = useState<boolean>(false);
   const [state, setState] = useState<AvailableStates>(
      pathname?.startsWith(`/databases/${database.uuid}`) ? "loading" : "idle",
   );
   const [optionsOpen, setOptionsOpen] = useState<boolean>(false);

   // Data useStates
   const [data, setData] = useState<{ tables: string[]; views: string[] } | null>();

   const getData = useCallback(async () => {
      const res = await getDatabaseData(database.uuid);
      return res;
   }, []);

   const onButtonClick = useCallback(async () => {
      switch (state) {
         case "pending":
            break;
         case "loading":
         case "idle": {
            setState("pending");
            const response = await getData();
            if (!response.ok) {
               setState("error");
               return;
            }
            setData(response.data);
            setState("connected");
            break;
         }
         case "connected": {
            setOpen((x) => !x);
            break;
         }
         case "error": {
            setState("pending");
            const response = await getData();
            if (!response.ok) {
               setState("error");
               return;
            }
            setData(response.data);
            setState("connected");
            break;
         }
      }
   }, [state]);

   const Icon = useMemo(() => {
      switch (state) {
         case "idle":
            return <Zap key={state} className="size-4" />;
         case "loading":
         case "pending":
            return <Loader2 key={state} className="size-4 animate-spin" />;
         case "connected":
            return <ChevronRight key={state} className="size-4" />;
         case "error":
            return <X key={state} className="size-4" />;
      }
   }, [state]);

   const DropdownOptions = useMemo(() => {
      let content: React.ReactNode;
      if (state === "pending" || state === "loading") return null;
      switch (state) {
         case "idle":
            content = (
               <>
                  <DropdownMenuItem
                     intent="warning"
                     onSelect={async (ev) => {
                        onButtonClick();
                     }}>
                     <Zap className="mr-2 size-4 shrink-0" />
                     Connect
                  </DropdownMenuItem>
               </>
            );
            break;
         case "error":
            content = (
               <>
                  <DropdownMenuItem
                     intent="warning"
                     onSelect={async (ev) => {
                        onButtonClick();
                     }}>
                     <RefreshCcw className="mr-2 size-4 shrink-0" />
                     Try again
                  </DropdownMenuItem>
               </>
            );
            break;
         case "connected":
            content = (
               <>
                  <DropdownMenuItem
                     intent="danger"
                     onSelect={async () => {
                        setData(null);
                        setOpen(false);
                        setState("idle");
                     }}>
                     <Unplug className="mr-2 size-4 shrink-0" />
                     Disconnect
                  </DropdownMenuItem>
               </>
            );
            break;
      }
      return (
         <DropdownMenu onOpenChange={(open) => setOptionsOpen(open)}>
            <DropdownMenuTrigger asChild>
               <Button
                  intent="ghost"
                  size="none"
                  className={cn(
                     "absolute right-2 z-[1] size-6 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-[:not(:hover)]:pointer-events-none aria-expanded:!text-foreground aria-expanded:opacity-100 dark:aria-expanded:highlight-5",
                     open
                        ? "aria-expanded:bg-muted hocus:bg-muted"
                        : "aria-expanded:bg-zinc-300 hocus:bg-zinc-300 dark:aria-expanded:bg-zinc-700 dark:hocus:bg-zinc-700",
                  )}>
                  <MoreVertical className="size-4" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
               {content}
               <DropdownMenuSeparator />
               <DropdownMenuItem
                  intent="default"
                  onSelect={async (ev) => {
                     const protocol = availableDatabases.find((x) => x.id === database.type)?.protocol;
                     const url = `${protocol}://${database.username}:${database.password}@${database.host}:${database.port}/${database.database}`;
                     navigator.clipboard.writeText(url);
                  }}>
                  <Copy className="mr-2 size-4 shrink-0" />
                  Copy URL
               </DropdownMenuItem>
               <DropdownMenuSeparator />
               <DropdownMenuItem
                  intent="default"
                  onSelect={async (ev) => {
                     const protocol = availableDatabases.find((x) => x.id === database.type)?.protocol;
                     const url = `${protocol}://${database.username}:${database.password}@${database.host}:${database.port}/${database.database}`;
                     navigator.clipboard.writeText(url);
                  }}>
                  <Pencil className="mr-2 size-4 shrink-0" />
                  Rename
               </DropdownMenuItem>
               <DropdownMenuItem
                  intent="danger"
                  onSelect={async (ev) => {
                     const protocol = availableDatabases.find((x) => x.id === database.type)?.protocol;
                     const url = `${protocol}://${database.username}:${database.password}@${database.host}:${database.port}/${database.database}`;
                     navigator.clipboard.writeText(url);
                  }}>
                  <Trash className="mr-2 size-4 shrink-0" />
                  Delete
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      );
   }, [state, open, optionsOpen]);

   useEffect(() => {
      if (pathname?.startsWith(`/databases/${database.uuid}`) && ["idle", "loading"].includes(state)) {
         onButtonClick();
      }
   }, [pathname]);

   return (
      <div {...props} className="relative text-sm text-zinc-800 dark:text-zinc-200" ref={ref}>
         <div className="group relative flex items-center justify-start gap-2 px-2 py-1.5">
            <AnimatePresence>
               {(hover || optionsOpen === true) && open == false && (
                  <motion.div
                     layoutId="aside-hover-database"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ type: "spring", duration: 0.2, bounce: 0.1 }}
                     className="pointer-events-none absolute inset-0 w-full bg-muted"
                  />
               )}
            </AnimatePresence>
            <Button
               intent="ghost"
               size="none"
               className={cn(
                  "relative z-[1] size-6 shrink-0 hocus:bg-zinc-300 dark:hocus:bg-zinc-700",
                  (state === "pending" || state === "loading") && "pointer-events-none",
               )}
               onClick={() => onButtonClick()}>
               <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                     initial={{ filter: "blur(3px)", scale: 0.5, opacity: 0 }}
                     animate={{
                        filter: "blur(0px)",
                        scale: 1,
                        opacity: 1,
                        rotate: state === "connected" && open === true ? 90 : 0,
                     }}
                     exit={{ filter: "blur(3px)", scale: 0.5, opacity: 0 }}
                     transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                     key={state}
                     className={cn("size-4")}>
                     {Icon}
                  </motion.span>
               </AnimatePresence>
            </Button>
            <Link
               href={`/databases/${database.uuid}`}
               className="dark:light dark relative z-[1] cursor-pointer truncate text-sm text-muted underline-offset-2 hover:underline">
               {database.name}
            </Link>
            {DropdownOptions}
         </div>
         {state === "connected" && open && (
            <div className="flex flex-col bg-muted p-1 text-zinc-800 dark:text-zinc-200">
               <Separator className="-mt-1 mb-1 bg-zinc-300 dark:bg-zinc-700" />
               {data?.tables?.map((table) => {
                  const isSelected = !!pathname?.match(
                     new RegExp(`^/databases/${database.uuid}/${table}/(\\w+)(/.*)?$`),
                  );
                  return (
                     <Link
                        aria-selected={isSelected || undefined}
                        key={table}
                        href={`/databases/${database.uuid}/${table}/${pathnameType}`}
                        className={cn(
                           "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hocus:bg-zinc-300 hocus:text-foreground hocus:dark:bg-zinc-700",
                        )}>
                        <Table2
                           className={cn(
                              "size-4 shrink-0",
                              isSelected ? "text-primary" : "text-zinc-400 dark:text-zinc-500",
                           )}
                        />
                        <span className="relative z-[1] max-w-full truncate text-sm">{table}</span>
                     </Link>
                  );
               })}
            </div>
         )}
      </div>
   );
});
DatabaseItem.displayName = "DatabaseItem";

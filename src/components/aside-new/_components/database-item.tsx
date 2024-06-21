"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
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

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DatabaseReturn } from "@/components/aside-new/_components/create-database/schema";
import { Separator } from "@/components/ui/separator";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { availableDatabases } from "@/constants/available-databases";

import { getDatabaseData } from "./actions";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DatabaseItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
   database: DatabaseReturn;
   hover: boolean;
}

const availableStates = ["idle", "pending", "connected", "error"] as const;
type AvailableStates = (typeof availableStates)[number];

export const DatabaseItem = React.forwardRef<any, DatabaseItemProps>(({ database, hover, ...props }, ref) => {
   // Animation useStates
   const [open, setOpen] = useState<boolean>(false);
   const [state, setState] = useState<AvailableStates>("idle");

   // Data useStates
   const [data, setData] = useState<{ tables: string[]; views: string[] } | null>();

   const pathname = usePathname();
   const pathnameType: "properties" | "data" =
      pathname?.replace(/\/databases\/(.+?)\/(\w+?)\//, "") === "data" ? "data" : "properties";

   const getData = useCallback(async () => {
      const res = await getDatabaseData(database.uuid);
      return res;
   }, [database]);

   const onButtonClick = useCallback(async () => {
      switch (state) {
         case "pending":
            break;
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

   const optionsButton = useMemo(() => {
      let content: React.ReactNode;
      if (state === "pending") return null;
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
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button
                  intent="ghost"
                  size="none"
                  className="absolute right-2 z-[1] size-6 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-[:not(:hover)]:pointer-events-none aria-expanded:bg-zinc-300 aria-expanded:text-zinc-800 aria-expanded:opacity-100 hocus:bg-zinc-300 dark:aria-expanded:bg-zinc-700 dark:aria-expanded:text-zinc-200 dark:aria-expanded:highlight-5 dark:hocus:bg-zinc-700">
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
   }, [state]);

   const Icon = function () {
      switch (state) {
         case "idle":
            return <Zap className="size-4" />;
         case "pending":
            return <Loader2 className="size-4 animate-spin" />;
         case "connected":
            return <ChevronRight className="size-4" />;
         case "error":
            return <X className="size-4" />;
      }
   };

   useEffect(() => {
      if (pathname?.startsWith(`/databases/${database.uuid}`)) {
         onButtonClick();
      }
   }, []);

   return (
      <div {...props} className="relative text-sm text-zinc-800 dark:text-zinc-200" ref={ref}>
         <div className="group relative flex items-center justify-start gap-2 px-2 py-1.5">
            <AnimatePresence>
               {hover && open == false && (
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
               className="relative z-[1] size-6 shrink-0 hocus:bg-zinc-300 dark:hocus:bg-zinc-700"
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
                     <Icon />
                  </motion.span>
               </AnimatePresence>
            </Button>
            <span className="dark:light dark relative z-[1] cursor-pointer truncate text-sm text-muted">
               {database.name}
            </span>
            {optionsButton}
         </div>
         {state === "connected" && open && (
            <div className="flex flex-col bg-muted p-1">
               <Separator className="-mt-1 mb-1 bg-zinc-300 dark:bg-zinc-700" />
               {data?.tables?.map((table) => (
                  <Link
                     key={table}
                     href={`/databases/${database.uuid}/${table}/${pathnameType}`}
                     className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hocus:bg-zinc-300 hocus:text-foreground hocus:dark:bg-zinc-700 dark:hocus:highlight-5">
                     <Table2 className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
                     <span className="relative z-[1] text-sm">{table}</span>
                  </Link>
               ))}
            </div>
         )}
      </div>
   );
});

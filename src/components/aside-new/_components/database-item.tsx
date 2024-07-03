"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
   AlertTriangle,
   ArrowDown,
   ArrowUp,
   Check,
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

import { getDatabaseData, moveDatabase } from "./actions";
import { toast } from "sonner";
import { DeleteDatabaseMenuItem } from "@/components/aside-new/_components/delete-database/delete-database-menu-item";

interface DatabaseItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
   database: DatabaseReturn;
   hover: boolean;
   index: number;
   count: number;
}

const availableStates = ["idle", "pending", "connected", "error", "loading"] as const;
type AvailableStates = (typeof availableStates)[number];

export const DatabaseItem = React.forwardRef<any, DatabaseItemProps>(({ database, hover, ...props }, ref) => {
   // Data control hooks
   const router = useRouter();
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
   const [moving, setMoving] = useState<"up" | "down" | null>(null);

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

   const onMoveDatabase = useCallback(
      async (direction: "up" | "down") => {
         setMoving(direction);
         const res = await moveDatabase(database.uuid, direction);
         setMoving(null);
         if (!res.ok) return toast.error(res.message);
         router.refresh();
         setOptionsOpen(false);
      },
      [database],
   );

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

   const [copied, setCopied] = useState<boolean>(false);
   const timeout = useRef<NodeJS.Timeout | null>(null);

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
         <DropdownMenu open={optionsOpen} onOpenChange={(open) => setOptionsOpen(open)}>
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
                     ev.preventDefault();
                     const protocol = availableDatabases.find((x) => x.id === database.type)?.protocol;
                     const url = `${protocol}://${database.username}:${database.password}@${database.host}:${database.port}/${database.database}`;
                     navigator.clipboard.writeText(url);
                     if (timeout.current) clearTimeout(timeout.current);
                     timeout.current = setTimeout(() => setCopied(false), 3000);
                     setCopied(true);
                     // toast.success("URL copied to clipboard");
                  }}>
                  <AnimatePresence initial={false} mode="popLayout">
                     <motion.span
                        key={copied ? "check" : "copy"}
                        className="mr-2 size-4 shrink-0"
                        initial={{ opacity: 0, transform: "scale(0)" }}
                        animate={{ opacity: 1, transform: "scale(1)" }}
                        exit={{ opacity: 0, transform: "scale(0)" }}
                        transition={{ type: "spring", duration: 0.3, bounce: 0 }}>
                        {copied ? <Check className="size-full" /> : <Copy className="size-full" />}
                     </motion.span>
                  </AnimatePresence>
                  Copy URL
               </DropdownMenuItem>
               {props.index > 0 ? (
                  <DropdownMenuItem
                     intent="default"
                     disabled={moving === "up"}
                     onSelect={async (ev) => {
                        ev.preventDefault();
                        await onMoveDatabase("up");
                     }}>
                     {moving === "up" ? (
                        <Loader2 className="mr-2 size-4 shrink-0 animate-spin" />
                     ) : (
                        <ArrowUp className="mr-2 size-4 shrink-0" />
                     )}
                     Move up
                  </DropdownMenuItem>
               ) : null}
               {props.index < props.count - 1 ? (
                  <DropdownMenuItem
                     intent="default"
                     disabled={moving === "down"}
                     onSelect={async (ev) => {
                        ev.preventDefault();
                        onMoveDatabase("down");
                     }}>
                     {moving === "down" ? (
                        <Loader2 className="mr-2 size-4 shrink-0 animate-spin" />
                     ) : (
                        <ArrowDown className="mr-2 size-4 shrink-0" />
                     )}
                     Move down
                  </DropdownMenuItem>
               ) : null}
               <DropdownMenuSeparator />
               <DropdownMenuItem intent="default" disabled={true}>
                  <Pencil className="mr-2 size-4 shrink-0" />
                  Rename
               </DropdownMenuItem>
               <DeleteDatabaseMenuItem database={database} />
            </DropdownMenuContent>
         </DropdownMenu>
      );
   }, [database, state, open, optionsOpen, moving, copied, timeout]);

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

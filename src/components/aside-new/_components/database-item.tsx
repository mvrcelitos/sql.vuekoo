"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
   ArrowDown,
   ArrowUp,
   ChevronRight,
   Copy,
   Loader2,
   LucideIcon,
   MoreVertical,
   Pencil,
   RefreshCcw,
   Table2,
   Terminal,
   Trash2,
   Unplug,
   View,
   X,
   Zap,
} from "lucide-react";
import { toast } from "sonner";

import { ChangeDatabaseForm } from "@/components/aside-new/_components/change-database/form";
import { DatabaseReturn } from "@/components/aside-new/_components/create-database/schema";
import { DeleteDatabaseMenuItem } from "@/components/aside-new/_components/delete-database/delete-database";
import { Button } from "@/components/ui/button";
import {
   ContextMenu,
   ContextMenuContent,
   ContextMenuItem,
   ContextMenuSeparator,
   ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
   Dialog,
   DialogBody,
   DialogClose,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { availableDatabases } from "@/constants/available-databases";
import { cn } from "@/lib/utils";

import { getDatabaseData, moveDatabase } from "./actions";

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
                     "z-[1] ml-auto size-7 shrink-0 opacity-100 transition-colors aria-expanded:bg-muted aria-expanded:!text-foreground aria-expanded:shadow-vercel-md hocus:bg-muted hocus:text-c800 hocus:shadow-vercel-md dark:aria-expanded:highlight-5",
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
                     try {
                        navigator.clipboard.writeText(url);
                     } catch (err) {
                        return toast.error("Failed to copy URL");
                     }
                  }}>
                  <Copy className="mr-2 size-4" />
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
   }, [database, state, optionsOpen, open, moving]);

   useEffect(() => {
      if (pathname?.startsWith(`/databases/${database.uuid}`) && ["idle", "loading"].includes(state)) {
         onButtonClick();
      }
   }, [pathname]);

   return (
      <div {...props} className="relative text-sm text-zinc-800 dark:text-zinc-200" ref={ref}>
         <div
            className={cn(
               "group relative flex h-[37px] items-center justify-start gap-2 border-b border-muted px-1",
               open ? "bg-background" : "",
            )}>
            <AnimatePresence>
               {(hover || optionsOpen === true) && open == false && (
                  <motion.div
                     layoutId="aside-hover-database"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 0.5 }}
                     exit={{ opacity: 0 }}
                     transition={{ type: "spring", duration: 0.2, bounce: 0.1 }}
                     className="pointer-events-none absolute inset-0 w-full bg-accent"
                  />
               )}
            </AnimatePresence>
            <div className="flex h-fit w-full items-center">
               <Button
                  intent="ghost"
                  size="none"
                  className={cn(
                     "relative z-[1] size-7 shrink-0",
                     (state === "pending" || state === "loading") && "pointer-events-none",
                  )}
                  onClick={() => onButtonClick()}>
                  <AnimatePresence mode="popLayout" initial={false}>
                     <motion.span
                        initial={{ filter: "blur(3px)", scale: 0.5, opacity: 0 }}
                        animate={{
                           filter: "blur(0px)",
                           // rotate: state === "connected" && open === true ? 90 : 0,
                           scale: 1,
                           opacity: 1,
                        }}
                        exit={{ filter: "blur(3px)", scale: 0.5, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                        key={state}
                        className="size-4">
                        <span
                           className={cn(
                              "block size-[inherit] duration-100",
                              state === "connected" && open ? "rotate-90" : "",
                           )}>
                           {Icon}
                        </span>
                     </motion.span>
                  </AnimatePresence>
               </Button>
               {/* <Separator className="mx-0 my-0 h-5" orientation="vertical" /> */}
               <Link
                  href={`/databases/${database.uuid}`}
                  className="group/link mr relative z-[1] grid cursor-pointer overflow-hidden rounded-md px-2 py-1 text-sm text-800 underline-offset-2 duration-150 hocus:bg-muted">
                  <p className="truncate">{database.name}</p>
               </Link>
               {DropdownOptions}
            </div>
         </div>
         {state === "connected" && open && (
            <div className="flex flex-col bg-muted text-zinc-800 dark:text-zinc-200">
               <ContentSection
                  name="Tables"
                  onNameChange={() => {}}
                  data={
                     data?.tables?.map((table) => ({
                        name: table,
                        href: `/databases/${database.uuid}/${table}/${pathnameType}`,
                        icon: Table2,
                     })) ?? []
                  }
               />
               <ContentSection
                  name="Views"
                  data={
                     data?.views?.map((view) => ({
                        name: view,
                        href: `/databases/${database.uuid}/${view}/${pathnameType}`,
                        icon: View,
                     })) ?? []
                  }
               />
            </div>
         )}
      </div>
   );
});
DatabaseItem.displayName = "DatabaseItem";

interface ContentSectionProps {
   name: string;
   data: { name: string; href: string; icon?: LucideIcon }[];
   onNameChange?: (name: string) => void;
}

const ContentSection = ({ name, data }: ContentSectionProps) => {
   const [open, setOpen] = useState(false);
   const [rename, setRename] = useState<null | { name: string }>(null);
   const pathname = usePathname();

   return (
      <div className={cn("group/section", open ? "border-b border-muted" : "last:border-b last:border-muted")}>
         <div
            className={cn(
               "group relative flex h-[37px] items-center justify-start gap-2 border-b border-muted px-1 pl-2",
               open ? "bg-background" : " bg-accent group-last/section:!border-0 ",
            )}>
            <Button
               intent="ghost"
               size="none"
               className={cn("relative z-[1] size-7 shrink-0")}
               onClick={() => setOpen((x) => !x)}>
               <ChevronRight className={cn("size-4 transition-transform", open ? "rotate-90" : "rotate-0")} />
            </Button>
            <p className="dark:light dark relative z-[1] truncate text-sm text-muted">{name}</p>
         </div>
         {open ? (
            <div className="flex flex-col bg-accent p-1 text-800">
               {data?.map((item) => {
                  const isCurrent = pathname == item.href;
                  return (
                     <ContextMenu key={item.name}>
                        <ContextMenuTrigger asChild>
                           <Link
                              aria-selected={isCurrent || undefined}
                              href={item.href}
                              className={cn(
                                 "group/item flex cursor-pointer items-center gap-2 rounded-md px-2 py-1",
                                 rename === null ? "hocus:bg-muted hocus:text-foreground" : "",
                              )}>
                              {item?.icon ? (
                                 <item.icon
                                    className={cn("size-4 shrink-0", isCurrent ? "text-primary" : "text-400")}
                                 />
                              ) : null}
                              <span className="relative z-[1] max-w-full truncate text-sm">{item.name}</span>
                           </Link>
                        </ContextMenuTrigger>
                        <ContextMenuContent
                           onCloseAutoFocus={(ev) => {
                              ev.preventDefault();
                           }}>
                           <ContextMenuItem disabled>
                              <Terminal className="mr-2 size-4 shrink-0" />
                              Run SQL
                           </ContextMenuItem>
                           <ContextMenuItem onSelect={() => setRename({ name: item.name })}>
                              <Pencil className="mr-2 size-4 shrink-0" />
                              Rename
                           </ContextMenuItem>
                           <ContextMenuSeparator />
                           <ContextMenuItem>
                              <Trash2 className="mr-2 size-4 shrink-0" />
                              Delete
                           </ContextMenuItem>
                        </ContextMenuContent>
                     </ContextMenu>
                  );
               })}
            </div>
         ) : null}
         <Dialog open={rename !== null} onOpenChange={(open) => (open ? undefined : setRename(null))}>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Change table settings</DialogTitle>
               </DialogHeader>
               <DialogBody>
                  <ChangeDatabaseForm data={rename ?? {}} />
               </DialogBody>
               <DialogFooter>
                  <DialogClose asChild>
                     <Button intent="ghost">Cancel</Button>
                  </DialogClose>
                  <Button intent="primary">Rename</Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>
   );
};

class AutoFocusInput extends React.Component {
   declare input: HTMLInputElement | null;

   override componentDidMount(): void {
      console.log("testing", document.activeElement);
      if (!this?.input) return;
      this?.input?.focus();
      console.log("focused", document.activeElement);
   }

   override render() {
      return (
         <Input
            onClick={(ev) => {
               ev.stopPropagation();
            }}
            autoFocus={true}
            ref={(input) => {
               this.input = input;
            }}
         />
      );
   }
}

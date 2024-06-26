"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
   ArrowDown,
   ArrowUp,
   ChevronRight,
   Copy,
   Info,
   Loader2,
   Pencil,
   Plug,
   RefreshCw,
   Scroll,
   Table2,
   Trash2,
   Unplug,
   View,
   X,
} from "lucide-react";

import { AsideSeeDatabase } from "@/components/aside/aside-see-database";
import { useDatabaseStore } from "@/components/aside/use-database-store";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion-2";
import { Button, buttonVariants } from "@/components/ui/button";
import {
   ContextMenu,
   ContextMenuContent,
   ContextMenuItem,
   ContextMenuSeparator,
   ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Flex } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

import { AsideDeleteDatabase } from "./aside-delete-database";
import { AsideRenameDatabase } from "./aside-rename-database";

export const AsideList = ({ databases: serverDatabases }: { databases?: string[] }) => {
   const pathname = usePathname()?.split("?")?.[0];

   // aside context menus
   const [openModal, setOpenModal] = useState<string | null>(null);
   const [indexModal, setIndexModal] = useState<string | null>(null);

   const [hover, setHover] = useState<number | null>(null);

   const { databases, get, connect, disconnect, refresh, delete: deleteDb, rename, swap } = useDatabaseStore();

   useEffect(() => {
      get();
   }, []);

   if (Object.values(databases).length == 0) {
      if (!serverDatabases || serverDatabases?.length === 0) {
         return (
            <div className="mx-auto flex h-full flex-col items-center justify-center gap-2 px-3 py-3">
               <p className="text-sm text-zinc-700 dark:text-zinc-200">No databases found</p>
               <Button
                  size="xs"
                  intent="opaque"
                  className="group/button h-7 px-2.5"
                  onClick={async (ev) => {
                     console.log("teste");
                     const target = ev.currentTarget;
                     target.disabled = true;
                     await get();
                     target.disabled = false;
                  }}>
                  <RefreshCw className="mr-1 size-4 shrink-0 duration-200 group-hover/button:rotate-90" size={16} />
                  Refresh
               </Button>
            </div>
         );
      }
      return (
         <ul className="flex w-full flex-col gap-1 pb-3" onMouseLeave={() => setHover(null)}>
            {serverDatabases.map((databaseName, index) => (
               <li
                  key={index}
                  className="relative flex items-center gap-2 overflow-hidden px-2 py-1"
                  onMouseEnter={() => setHover(index)}>
                  <Button
                     disabled
                     intent="ghost"
                     size="none"
                     className="relative z-10 size-6 hocus:bg-zinc-300 dark:hocus:bg-zinc-700 [&[data-state=open]>svg]:rotate-90">
                     <Loader2 className="size-4 shrink-0 animate-spin" height={16} width={16} />
                  </Button>
                  <Flex className="pointer-events-none relative z-10 items-center gap-2">
                     <p className="shrink-0 grow truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
                        {databaseName}
                     </p>
                  </Flex>
               </li>
            ))}
         </ul>
      );
   }

   return (
      <ul className="flex w-full flex-col gap-1 pb-3" onMouseLeave={() => setHover(null)}>
         {Object.values(databases)?.map((db: DatabaseType, index: number) => (
            <Dialog
               key={db.uuid}
               open={db.uuid == indexModal && openModal != null}
               onOpenChange={(x) => setIndexModal(x ? db.uuid : null)}>
               <Accordion>
                  <ContextMenu>
                     <li aria-orientation="vertical" className="flex flex-col gap-1">
                        <AccordionItem
                           value={db.uuid}
                           onMouseEnter={() => setHover(index)}
                           open={["connected", "refreshing"].includes(db.status) ? undefined : false}>
                           <ContextMenuTrigger asChild>
                              <motion.div layout className="relative flex items-center gap-2 overflow-hidden px-2 py-1">
                                 <AnimatePresence>
                                    {hover === index && (
                                       <motion.div
                                          key={index}
                                          initial={{ opacity: 0, x: "-100%" }}
                                          animate={{ opacity: 1, x: 0 }}
                                          exit={{ opacity: 0, x: "100%" }}
                                          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                                          layoutId="aside-list-accordion-trigger-hover"
                                          className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800"
                                       />
                                    )}
                                 </AnimatePresence>
                                 {/* <Link href={`/${db.uuid}`} className="absolute inset-0" /> */}
                                 <AccordionTrigger
                                    disabled={["connecting", "refreshing"].includes(db.status)}
                                    onSelect={async (ev) => {
                                       if (db.status == "disconnected" || db.status == "error") {
                                          const res = await connect(db.uuid);
                                          if (!res) {
                                             ev.preventDefault();
                                             console.log("res failed!");
                                          }
                                       }
                                    }}
                                    className={cn(
                                       buttonVariants({ intent: "ghost", size: "none" }),
                                       "relative z-10 size-6 hocus:bg-zinc-300 dark:hocus:bg-zinc-700 [&[data-state=open]>svg]:rotate-90",
                                    )}>
                                    {["connecting", "refreshing"].includes(db.status) && (
                                       <Loader2 className="size-4 shrink-0 animate-spin" height={16} width={16} />
                                    )}
                                    {["error"].includes(db.status) && (
                                       <X className="size-4 shrink-0" height={16} width={16} />
                                    )}
                                    {["connected", "disconnected"].includes(db.status) && (
                                       <ChevronRight
                                          className={cn("size-4 shrink-0 duration-150", false && "rotate-90")}
                                          height={16}
                                          width={16}
                                       />
                                    )}
                                 </AccordionTrigger>

                                 <Flex className="pointer-events-none relative z-10 items-center gap-2">
                                    <p className="shrink-0 grow truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                       {db.name}
                                    </p>
                                    {/* <p className="truncate text-xs text-zinc-400 empty:w-0 dark:text-zinc-500">
                                       {db.url}
                                    </p> */}
                                 </Flex>
                              </motion.div>
                           </ContextMenuTrigger>
                           <AccordionContent forceMount className="bg-zinc-200 dark:bg-zinc-800">
                              <AccordionItem value="tables">
                                 <div className="flex items-center gap-2 overflow-hidden px-2 py-1">
                                    <AccordionTrigger
                                       className={cn(
                                          " [&[data-state=open]>svg]:rotate-90",
                                          buttonVariants({
                                             intent: "ghost",
                                             size: "none",
                                          }),
                                          "size-6 hover:bg-zinc-300 focus-visible:bg-zinc-300 dark:hover:bg-zinc-700 dark:focus-visible:bg-zinc-700",
                                       )}>
                                       <ChevronRight
                                          className={cn("size-4 shrink-0 duration-150", false && "rotate-90")}
                                          height={16}
                                          width={16}
                                       />
                                    </AccordionTrigger>
                                    <p className="grow truncate text-sm font-medium text-zinc-700 dark:text-zinc-200">
                                       Tables
                                       <span className="select-none text-xs font-normal opacity-70">
                                          {" "}
                                          {`(${db?.tables?.length})`}
                                       </span>
                                    </p>
                                    {/* <Table2 className="ml-auto mr-1 size-4 shrink-0 opacity-50" size={16} /> */}
                                 </div>
                                 <AccordionContent>
                                    <ul aria-orientation="vertical" className="grid grid-cols-1 gap-1 px-2 py-1">
                                       {!db?.tables?.length && (
                                          <li className="-mt-1 truncate rounded-md px-2 py-1 text-xs text-zinc-500 dark:text-zinc-400">
                                             No tables found
                                          </li>
                                       )}
                                       {db?.tables?.map((table, index: number) => (
                                          <li key={index}>
                                             <Link
                                                href={`/${db.uuid}/${table}`}
                                                aria-selected={
                                                   pathname?.split("/")?.[1] == db.uuid &&
                                                   pathname?.split("/")?.[2] === table
                                                }
                                                data-state={
                                                   pathname?.split("/")?.[1] == db.uuid &&
                                                   pathname?.split("/")?.[2] === table
                                                      ? "selected"
                                                      : "idle"
                                                }
                                                className="flex items-center gap-2 overflow-hidden rounded px-2 py-1 text-zinc-600 hover:bg-zinc-300 aria-selected:font-medium aria-selected:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:aria-selected:text-zinc-50">
                                                <Table2
                                                   className={cn(
                                                      "size-4 shrink-0",
                                                      pathname?.split("/")?.[1] == db.uuid &&
                                                         pathname?.split("/")?.[2] === table
                                                         ? "text-primary"
                                                         : "opacity-70",
                                                   )}
                                                   height={16}
                                                   width={16}
                                                />
                                                <p className="truncate text-sm">{table}</p>
                                             </Link>
                                          </li>
                                       ))}
                                    </ul>
                                 </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="views" className="flex flex-col gap-1 overflow-hidden">
                                 <div className="flex items-center gap-2 overflow-hidden rounded-md px-2 py-1">
                                    <AccordionTrigger
                                       className={cn(
                                          " [&[data-state=open]>svg]:rotate-90",
                                          buttonVariants({
                                             intent: "ghost",
                                             size: "none",
                                          }),
                                          "size-6 hover:bg-zinc-300 focus-visible:bg-zinc-300 dark:hover:bg-zinc-700 dark:focus-visible:bg-zinc-700",
                                       )}>
                                       <ChevronRight
                                          className={cn("size-4 shrink-0 duration-150", false && "rotate-90")}
                                          height={16}
                                          width={16}
                                       />
                                    </AccordionTrigger>
                                    <p className="grow truncate text-sm font-medium text-zinc-700 dark:text-zinc-200">
                                       Views{" "}
                                       <span className="text-xs font-normal opacity-70">{`(${db?.views?.length})`}</span>
                                    </p>
                                    {/* <View className="ml-auto mr-1 size-4 shrink-0 opacity-50" size={16} /> */}
                                 </div>
                                 <AccordionContent>
                                    <ul aria-orientation="vertical" className="grid grid-cols-1 gap-1 px-2 py-1">
                                       {!db?.views?.length && (
                                          <li className="-mt-1 truncate rounded-md px-2 py-1 text-xs text-zinc-500 dark:text-zinc-400">
                                             No views found
                                          </li>
                                       )}
                                       {db?.views?.map((view, index: number) => (
                                          <li key={index}>
                                             <Link
                                                href={`/${db.uuid}/${view}`}
                                                aria-selected={
                                                   pathname?.split("/")?.[1] == db.uuid &&
                                                   pathname?.split("/")?.[2] === view
                                                }
                                                data-state={
                                                   pathname?.split("/")?.[1] == db.uuid &&
                                                   pathname?.split("/")?.[2] === view
                                                      ? "selected"
                                                      : "idle"
                                                }
                                                className="flex items-center gap-2 overflow-hidden rounded px-2 py-1 text-zinc-600 hover:bg-zinc-300 aria-selected:font-medium aria-selected:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:aria-selected:text-zinc-50">
                                                <View
                                                   className={cn(
                                                      "size-4 shrink-0",
                                                      pathname?.split("/")?.[1] == db.uuid &&
                                                         pathname?.split("/")?.[2] === view
                                                         ? "text-primary"
                                                         : "opacity-70",
                                                   )}
                                                   size={16}
                                                />
                                                <p className="truncate text-sm">{view}</p>
                                             </Link>
                                          </li>
                                       ))}
                                    </ul>
                                 </AccordionContent>
                              </AccordionItem>
                           </AccordionContent>
                        </AccordionItem>
                     </li>
                     <ContextMenuContent>
                        <ContextMenuItem
                           disabled={db.status !== "disconnected"}
                           onSelect={async (ev) => {
                              if (db.status == "disconnected") {
                                 const res = await connect(db.uuid);
                                 if (!res) ev.preventDefault();
                              }
                           }}>
                           <Plug className="mr-2 size-4 shrink-0" height={16} width={16} />
                           Connect
                        </ContextMenuItem>
                        <ContextMenuItem
                           disabled={db.status !== "connected"}
                           onSelect={() => {
                              disconnect(db.uuid);
                           }}>
                           <Unplug className="mr-2 size-4 shrink-0" height={16} width={16} />
                           Disconnect
                        </ContextMenuItem>
                        <ContextMenuItem
                           disabled={db.status !== "connected" && db.status !== "refreshing" && db.status != "error"}
                           onSelect={async (ev) => {
                              if (db.status == "connected") {
                                 const res = await refresh(db.uuid);
                                 if (!res) ev.preventDefault();
                              }
                           }}>
                           <RefreshCw className="mr-2 size-4 shrink-0" height={16} width={16} />
                           Refresh
                        </ContextMenuItem>

                        <ContextMenuSeparator />
                        <ContextMenuItem
                           disabled={index == 0}
                           onSelect={() => {
                              swap(index, index - 1);
                           }}>
                           <ArrowUp className="mr-2 size-4 shrink-0" height={16} width={16} />
                           Move up
                        </ContextMenuItem>
                        <ContextMenuItem
                           disabled={index == Object.values(databases).length - 1}
                           onSelect={() => {
                              swap(index, index + 1);
                           }}>
                           <ArrowDown className="mr-2 size-4 shrink-0" height={16} width={16} />
                           Move down
                        </ContextMenuItem>
                        <ContextMenuSeparator />

                        <ContextMenuItem asChild>
                           <Link href={`/${db.uuid}/script`}>
                              <Scroll className="mr-2 size-4 shrink-0" height={16} width={16} />
                              SQL Script
                           </Link>
                        </ContextMenuItem>
                        <ContextMenuItem
                           onSelect={() => {
                              setIndexModal(db.uuid);
                              setOpenModal("see");
                           }}>
                           <Info className="mr-2 size-4 shrink-0" height={16} width={16} />
                           See connection
                        </ContextMenuItem>
                        <ContextMenuItem
                           onSelect={() => {
                              navigator.clipboard.writeText(db.url);
                           }}>
                           <Copy className="mr-2 size-4 shrink-0" height={16} width={16} />
                           Copy URL
                        </ContextMenuItem>
                        <ContextMenuSeparator />

                        <ContextMenuItem
                           onSelect={() => {
                              setIndexModal(db.uuid);
                              setOpenModal("rename");
                           }}>
                           <Pencil className="mr-2 size-4 shrink-0" height={16} width={16} />
                           Rename
                        </ContextMenuItem>
                        <ContextMenuItem
                           className="text-red-500 focus:bg-red-100 focus:text-rose-600 dark:text-red-400 dark:focus:bg-red-900 dark:focus:text-rose-100"
                           onSelect={() => {
                              setIndexModal(db.uuid);
                              setOpenModal("delete");
                           }}>
                           <Trash2 className="mr-2 size-4 shrink-0" height={16} width={16} />
                           Delete
                        </ContextMenuItem>
                     </ContextMenuContent>
                  </ContextMenu>
               </Accordion>
               <DialogContent>
                  {openModal === "see" && (
                     <AsideSeeDatabase
                        values={{ database: "postgresql", uuid: db?.uuid, name: db?.name, url: db.url }}
                        onClose={() => {
                           setOpenModal(null);
                           setIndexModal(null);
                        }}
                     />
                  )}
                  {openModal === "rename" && (
                     <AsideRenameDatabase
                        defaultValues={{ name: db?.name }}
                        onRename={async (d) => {
                           await rename(db.uuid, d.name);
                           setOpenModal(null);
                           setIndexModal(null);
                        }}
                     />
                  )}
                  {openModal === "delete" && (
                     <AsideDeleteDatabase
                        onDelete={async (v) => {
                           if (v) await deleteDb(db.uuid);
                           setOpenModal(null);
                           setIndexModal(null);
                        }}
                     />
                  )}
               </DialogContent>
            </Dialog>
         ))}
      </ul>
   );
};

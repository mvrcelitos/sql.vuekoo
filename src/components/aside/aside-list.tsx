"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
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

export const AsideList = () => {
   const pathname = usePathname()?.split("?")?.[0];

   // aside context menus
   const [openModal, setOpenModal] = React.useState<string | null>(null);
   const [indexModal, setIndexModal] = React.useState<string | null>(null);

   const { databases, get, connect, disconnect, refresh, delete: deleteDb, rename } = useDatabaseStore();

   React.useEffect(() => {
      get();
   }, []);

   if (Object.values(databases).length == 0)
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

   return (
      <ul className="flex w-full flex-col px-3 pb-3">
         {Object.values(databases)?.map((db: DatabaseType, index: number) => (
            <Dialog
               key={db.uuid}
               open={db.uuid == indexModal && openModal != null}
               onOpenChange={(x) => setIndexModal(x ? db.uuid : null)}>
               <Accordion>
                  <ContextMenu>
                     <li aria-orientation="vertical" className="flex flex-col gap-1 rounded-lg">
                        <AccordionItem value={db.uuid}>
                           <ContextMenuTrigger asChild>
                              <div className="flex items-center gap-2 overflow-hidden rounded-md p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800">
                                 <AccordionTrigger
                                    disabled={["connecting", "refreshing"].includes(db.status)}
                                    className={cn(
                                       " [&[data-state=open]>svg]:rotate-90",
                                       buttonVariants({
                                          intent: "ghost",
                                          size: "icon-custom",
                                       }),
                                       "size-6 hover:bg-zinc-300 focus-visible:bg-zinc-300 dark:hover:bg-zinc-700 dark:focus-visible:bg-zinc-700",
                                    )}
                                    onSelect={async (ev) => {
                                       const target = ev.target;
                                       if (db.status == "disconnected") {
                                          const res = await connect(db.uuid);
                                          if (!res) ev.preventDefault();
                                       }
                                    }}>
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

                                 <Flex className="items-center gap-2">
                                    <p className="shrink-0 grow truncate text-sm font-medium text-zinc-700 dark:text-zinc-200">
                                       {db.name}
                                    </p>
                                    <p className="truncate text-xs text-zinc-400 empty:w-0 dark:text-zinc-500">
                                       {db.url}
                                    </p>
                                 </Flex>
                              </div>
                           </ContextMenuTrigger>
                           <AccordionContent forceMount>
                              <AccordionItem value="tables" className="pl-4">
                                 <div className="flex items-center gap-2 overflow-hidden rounded-md p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800">
                                    <AccordionTrigger
                                       className={cn(
                                          " [&[data-state=open]>svg]:rotate-90",
                                          buttonVariants({
                                             intent: "ghost",
                                             size: "icon-custom",
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
                                       Tables{" "}
                                       <span className="text-xs font-normal opacity-70">{`(${db?.tables?.length})`}</span>
                                    </p>
                                    {/* <Table2 className="ml-auto mr-1 size-4 shrink-0 opacity-50" size={16} /> */}
                                 </div>
                                 <AccordionContent>
                                    <ul aria-orientation="vertical" className="grid grid-cols-1 gap-1 pl-4">
                                       {!db?.tables?.length && (
                                          <li className="-mt-1 truncate rounded-md px-3 py-1 text-xs text-zinc-500 dark:text-zinc-400">
                                             No tables found
                                          </li>
                                       )}
                                       {db?.tables?.map((table, index: number) => (
                                          <li key={index}>
                                             <Link
                                                href={`/${db.uuid}/table/${table}`}
                                                aria-selected={pathname == `/${db.uuid}/table/${table}`}
                                                data-state={
                                                   pathname == `/${db.uuid}/table/${table}` ? "selected" : "idle"
                                                }
                                                className="flex items-center gap-2 overflow-hidden rounded-md p-1 text-zinc-600 aria-selected:font-medium aria-selected:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:aria-selected:text-zinc-50">
                                                <Table2
                                                   className={cn(
                                                      "size-4 shrink-0",
                                                      pathname == `/${db.uuid}/table/${table}`
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
                              <AccordionItem value="tables" className="flex flex-col gap-1 overflow-hidden pl-4">
                                 <div className="flex items-center gap-2 overflow-hidden rounded-md p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800">
                                    <AccordionTrigger
                                       className={cn(
                                          " [&[data-state=open]>svg]:rotate-90",
                                          buttonVariants({
                                             intent: "ghost",
                                             size: "icon-custom",
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
                                    <ul aria-orientation="vertical" className="grid grid-cols-1 gap-1 pl-4">
                                       {!db?.views?.length && (
                                          <li className="-mt-1 truncate rounded-md px-3 py-1 text-xs text-zinc-500 dark:text-zinc-400">
                                             No views found
                                          </li>
                                       )}
                                       {db?.views?.map((view, index: number) => (
                                          <li key={index}>
                                             <Link
                                                href={`/${db.uuid}/table/${view}`}
                                                aria-selected={pathname == `/${db.uuid}/table/${view}`}
                                                data-state={
                                                   pathname == `/${db.uuid}/table/${view}` ? "selected" : "idle"
                                                }
                                                className="flex items-center gap-2 overflow-hidden rounded-md p-1 text-zinc-600 hover:bg-zinc-200 aria-selected:font-medium aria-selected:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:aria-selected:text-zinc-50">
                                                <View
                                                   className={cn(
                                                      "size-4 shrink-0",
                                                      pathname == `/${db.uuid}/table/${view}`
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
                        <ContextMenuItem disabled={db.status !== "disconnected"} onSelect={() => connect(db.uuid)}>
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
                        <ContextMenuItem disabled={db.status !== "connected"} onSelect={() => refresh(db.uuid)}>
                           <RefreshCw className="mr-2 size-4 shrink-0" height={16} width={16} />
                           Refresh
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
                           className="text-red-500 focus:bg-red-200 focus:text-rose-600 dark:text-red-400 dark:focus:bg-red-700 dark:focus:text-rose-100"
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

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
   Table,
   Trash2,
   Unplug,
   X,
} from "lucide-react";

import { AsideGroup } from "@/components/aside/aside-group";
import { AsideSeeDatabase } from "@/components/aside/aside-see-database";
import { useDatabaseStore } from "@/components/aside/use-database-store";
import { Button, buttonVariants } from "@/components/ui/button";
import {
   ContextMenu,
   ContextMenuContent,
   ContextMenuItem,
   ContextMenuSeparator,
   ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion-2";

import { AsideDeleteDatabase } from "./aside-delete-database";
import { AsideRenameDatabase } from "./aside-rename-database";
import { cn } from "@/lib/utils";

export const AsideList = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(() => {
   const pathname = usePathname()?.split("?")?.[0];

   // aside context menus
   const [openModal, setOpenModal] = React.useState<string | null>(null);
   const [indexModal, setIndexModal] = React.useState<string | null>(null);

   const { databases, get, connect, close, refresh, delete: deleteDb, rename } = useDatabaseStore();

   React.useEffect(() => {
      get();
   }, []);

   const [dbsOpened, setDbsOpened] = React.useState<string[]>([]);

   if (Object.values(databases).length == 0)
      return (
         <div className="mx-auto flex h-full flex-col items-center justify-center gap-2 py-4">
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
      <ul className="modern-scroll rounded-scroll -mr-4 grid grid-cols-1 gap-1 overflow-y-auto">
         {Object.values(databases)?.map((db: DatabaseType, index: number) => (
            <Dialog
               key={db.uuid}
               open={db.uuid == indexModal && openModal != null}
               onOpenChange={(x) => setIndexModal(x ? db.uuid : null)}>
               <Accordion>
                  <ContextMenu>
                     <li aria-orientation="vertical" className="flex flex-col gap-1 rounded-lg pr-4">
                        <AccordionItem value={db.uuid}>
                           <ContextMenuTrigger>
                              <div className="flex gap-2 rounded-md p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800">
                                 <AccordionTrigger
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
                                 <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 overflow-hidden">
                                    <p className="grow truncate text-sm font-medium text-zinc-700 dark:text-zinc-200">
                                       {db.name}
                                    </p>
                                    <p className="truncate text-xs text-zinc-400 empty:w-0 dark:text-zinc-500">
                                       {db.url}
                                    </p>
                                 </div>
                              </div>
                           </ContextMenuTrigger>
                           <AccordionContent>
                              <AsideGroup title={"Tables"} className="pl-4">
                                 <ul
                                    aria-orientation="vertical"
                                    data-state={dbsOpened.includes(db.uuid) ? "open" : "closed"}
                                    aria-expanded={dbsOpened.includes(db.uuid)}
                                    className="grid grid-cols-1 gap-1 pl-4">
                                    {["connecting", "refreshing"].includes(db.status) ? (
                                       <>
                                          <li className="h-7 animate-pulse rounded-md dark:bg-zinc-800" />
                                          <li className="h-7 animate-pulse rounded-md dark:bg-zinc-800" />
                                          <li className="h-7 animate-pulse rounded-md dark:bg-zinc-800" />
                                       </>
                                    ) : (
                                       db.tables?.map((table, index: number) => (
                                          <li key={index}>
                                             <Link
                                                href={`/${db.uuid}/table/${table}`}
                                                aria-selected={pathname == `/${db.uuid}/table/${table}`}
                                                data-state={
                                                   pathname == `/${db.uuid}/table/${table}` ? "selected" : "idle"
                                                }
                                                className="flex items-center gap-2 overflow-hidden rounded-md p-1 text-zinc-600 aria-selected:text-zinc-900 aria-selected:underline aria-selected:underline-offset-2 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:aria-selected:text-zinc-50">
                                                <Table
                                                   className="size-4 shrink-0 text-zinc-600 opacity-70 dark:text-zinc-300"
                                                   height={16}
                                                   width={16}
                                                />
                                                <p className="truncate text-sm">{table}</p>
                                             </Link>
                                          </li>
                                       ))
                                    )}
                                 </ul>
                              </AsideGroup>
                           </AccordionContent>
                        </AccordionItem>
                        {/* <AsideGroup
                           title={db.name}
                           description={db?.url}
                           forceMount
                           renderOutside
                           status={
                              ["connecting", "refreshing"].includes(db.status)
                                 ? "loading"
                                 : db.status === "error"
                                   ? "error"
                                   : "ok"
                           }
                           onSelect={async (ev) => {
                              if (db.status == "disconnected") await connect(db.uuid);
                           }}>
                           <AsideGroup title={"Tables"} className="pl-4">
                              <ul
                                 aria-orientation="vertical"
                                 data-state={dbsOpened.includes(db.uuid) ? "open" : "closed"}
                                 aria-expanded={dbsOpened.includes(db.uuid)}
                                 className="grid grid-cols-1 gap-1 pl-4">
                                 {["connecting", "refreshing"].includes(db.status) ? (
                                    <>
                                       <li className="h-7 animate-pulse rounded-md dark:bg-zinc-800" />
                                       <li className="h-7 animate-pulse rounded-md dark:bg-zinc-800" />
                                       <li className="h-7 animate-pulse rounded-md dark:bg-zinc-800" />
                                    </>
                                 ) : (
                                    db.tables?.map((table, index: number) => (
                                       <li key={index}>
                                          <Link
                                             href={`/${db.uuid}/table/${table}`}
                                             aria-selected={pathname == `/${db.uuid}/table/${table}`}
                                             data-state={pathname == `/${db.uuid}/table/${table}` ? "selected" : "idle"}
                                             className="flex items-center gap-2 overflow-hidden rounded-md p-1 text-zinc-600 aria-selected:text-zinc-900 aria-selected:underline aria-selected:underline-offset-2 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:aria-selected:text-zinc-50">
                                             <Table
                                                className="size-4 shrink-0 text-zinc-600 opacity-70 dark:text-zinc-300"
                                                height={16}
                                                width={16}
                                             />
                                             <p className="truncate text-sm">{table}</p>
                                          </Link>
                                       </li>
                                    ))
                                 )}
                              </ul>
                           </AsideGroup>
                        </AsideGroup> */}
                     </li>
                     <ContextMenuContent>
                        <ContextMenuItem disabled={db.status !== "disconnected"} onSelect={() => connect(db.uuid)}>
                           <Plug className="mr-2 size-4 shrink-0" height={16} width={16} />
                           Connect
                        </ContextMenuItem>
                        <ContextMenuItem
                           disabled={db.status !== "connected"}
                           onSelect={() => {
                              close(db.uuid);
                              setDbsOpened((x) => x.filter((y) => y !== db.uuid));
                           }}>
                           <Unplug className="mr-2 size-4 shrink-0" height={16} width={16} />
                           Close
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
});
AsideList.displayName = "AsideList";

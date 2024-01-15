"use client";

// import { appWindow } from "@tauri-apps/api/window";
import * as React from "react";
import Link from "next/link";
import { ScrollText } from "lucide-react";

import { useDatabaseStore } from "@/components/aside/use-database-store";
import { buttonVariants } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const ScriptButton = () => {
   const pathname = usePathname()?.split("?")?.[0];
   const [open, setOpen] = React.useState<boolean>(false);

   const { databases } = useDatabaseStore();
   const currentDatabase = databases?.[pathname?.split("/")?.[1]];

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <Tooltip>
            <TooltipTrigger asChild>
               <DialogTrigger
                  onClick={() => {
                     setOpen(true);
                  }}
                  className={cn(buttonVariants({ intent: "ghost", size: "icon-sm" }), "rounded-none")}>
                  <ScrollText className="size-4 shrink-0" />
               </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>New script</TooltipContent>
         </Tooltip>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Access database script</DialogTitle>
               <DialogDescription>Select an database or the current one</DialogDescription>
            </DialogHeader>
            <ul aria-orientation="vertical" className="list- flex flex-col gap-2 overflow-hidden">
               {currentDatabase && (
                  <>
                     <li
                        key={currentDatabase.uuid}
                        className="relative rounded-md px-2 py-1.5 after:absolute after:inset-x-1 after:top-[calc(100%+0.25rem)] after:border-b after:border-b-zinc-300 after:last:border-0 hover:bg-zinc-200 dark:after:border-b-zinc-700 dark:hover:bg-zinc-800">
                        <Link
                           href={`/${currentDatabase.uuid}/script`}
                           className="text-foreground"
                           onClick={() => {
                              setOpen(false);
                           }}>
                           <h2 className="text-sm font-semibold">
                              {currentDatabase?.name}{" "}
                              <span className="rounded-full bg-primary px-1.5 py-0.5 text-xs font-medium text-foreground">
                                 {"Current"}
                              </span>
                           </h2>
                           <p className="mt-1 truncate text-xs opacity-70">{currentDatabase?.url}</p>
                        </Link>
                     </li>
                  </>
               )}
               {Object.values(databases)
                  ?.filter((x) => x.uuid != currentDatabase?.uuid)
                  ?.map((database) => (
                     <li
                        key={database.uuid}
                        className="relative rounded-md px-2 py-1.5 after:absolute after:inset-x-1 after:top-[calc(100%+0.25rem)] after:border-b after:border-b-zinc-300 after:last:border-0 hover:bg-zinc-200 dark:after:border-b-zinc-700 dark:hover:bg-zinc-800">
                        <Link
                           href={`/${database.uuid}/script`}
                           className="text-foreground"
                           onClick={() => {
                              setOpen(false);
                           }}>
                           <h2 className="text-sm font-semibold">{database?.name}</h2>
                           <p className="truncate text-xs opacity-70">{database?.url}</p>
                        </Link>
                     </li>
                  ))}
            </ul>
         </DialogContent>
      </Dialog>
   );
};

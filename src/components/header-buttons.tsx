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

export const ScriptButton = () => {
   const { databases } = useDatabaseStore();
   const [open, setOpen] = React.useState<boolean>(false);

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
            <TooltipContent>New script1</TooltipContent>
         </Tooltip>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Access database script</DialogTitle>
               <DialogDescription>Select an database or the current one</DialogDescription>
            </DialogHeader>
            <ul aria-orientation="vertical" className="list- flex flex-col gap-2 overflow-hidden">
               {/* <li>
                  <Link href={"#"}>
                     <h1 className="text-base font-semibold">
                        <span className="text-primary">{"(Current)"}</span>
                     </h1>
                  </Link>
               </li> */}
               <Separator orientation="horizontal" className="first:hidden" />
               {Object.values(databases)?.map((database) => (
                  <li
                     key={database.uuid}
                     className="relative rounded-md px-2 py-1.5 after:absolute after:inset-x-1 after:top-[calc(100%+0.25rem)] after:border-b after:border-b-zinc-300 after:last:border-0 hover:bg-zinc-200 dark:after:border-b-zinc-700 dark:hover:bg-zinc-800">
                     <Link
                        href={`/${database.uuid}/script`}
                        className="text-foreground"
                        onClick={() => {
                           setOpen(false);
                        }}>
                        <h1 className="text-sm font-semibold">{database?.name}</h1>
                        <p className="truncate text-xs opacity-70">{database?.url}</p>
                     </Link>
                  </li>
               ))}
            </ul>
         </DialogContent>
      </Dialog>
   );
};

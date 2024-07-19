"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code, Paintbrush, ScrollText, Settings } from "lucide-react";

import { useDatabaseStore } from "@/components/aside/use-database-store";
import { buttonVariants } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSub,
   DropdownMenuSubTrigger,
   DropdownMenuSubContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { useTheme } from "next-themes";
import { Check, Laptop, Moon, Sun } from "lucide-react";
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
                  className={cn(
                     buttonVariants({ intent: "ghost", size: "icon-xs" }),
                     "rounded-none hocus:bg-accent hocus:shadow-inner",
                  )}>
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

export const ConfigButton = () => {
   const { setTheme, theme } = useTheme();
   return (
      <DropdownMenu>
         <Tooltip>
            <TooltipTrigger asChild>
               <DropdownMenuTrigger
                  className={cn(
                     buttonVariants({ intent: "ghost", size: "icon-xs" }),
                     "rounded-none hocus:bg-accent hocus:shadow-inner",
                  )}>
                  <Settings className="size-4 shrink-0" />
               </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
         </Tooltip>
         <DropdownMenuContent align={"end"} sideOffset={0} collisionPadding={0} className="-mr-px rounded-t-none">
            <DropdownMenuSub>
               <DropdownMenuSubTrigger intent="default">
                  <Paintbrush className="mr-2 size-4 shrink-0" />
                  Theme
               </DropdownMenuSubTrigger>
               <DropdownMenuSubContent className="rounded-t-none">
                  <DropdownMenuItem intent="default" className="text-[13px]" onClick={() => setTheme("light")}>
                     <Sun className="mr-2 size-4 shrink-0" />
                     <span>Light</span>
                     {theme == "light" && (
                        <Check className="ml-auto size-4 shrink-0 opacity-70" height={16} width={16} />
                     )}
                  </DropdownMenuItem>
                  <DropdownMenuItem intent="default" className="text-[13px]" onClick={() => setTheme("dark")}>
                     <Moon className="mr-2 size-4 shrink-0" />
                     <span>Dark</span>
                     {theme == "dark" && (
                        <Check className="ml-auto size-4 shrink-0 opacity-70" height={16} width={16} />
                     )}
                  </DropdownMenuItem>
                  <DropdownMenuItem intent="default" className="text-[13px]" onClick={() => setTheme("system")}>
                     <Laptop className="mr-2 size-4 shrink-0" />
                     <span>System</span>
                     {theme == "system" && (
                        <Check className="ml-auto size-4 shrink-0 opacity-70" height={16} width={16} />
                     )}
                  </DropdownMenuItem>
               </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem intent="default" className="cursor-pointer" asChild>
               <Link href="https://github.com/mvrcelitos/sql.vuekoo" target="_blank">
                  <Code className="mr-2 size-4 shrink-0" />
                  Source Code
               </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem intent="danger">
               <Trash2 className="mr-2 size-4 shrink-0" />
               Clear
            </DropdownMenuItem> */}
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

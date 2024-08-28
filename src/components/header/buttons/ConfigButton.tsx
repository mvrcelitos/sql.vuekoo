"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Check, Code, Laptop, Moon, Paintbrush, Settings, Sun } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

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

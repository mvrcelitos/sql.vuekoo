"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Laptop, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ModeToggle = ({ children }: React.PropsWithChildren) => {
   const { setTheme } = useTheme();

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            {children && (
               <Button intent="ghost" size="sm" className="h-8 w-8 px-0">
                  <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
               </Button>
            )}
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
               <Sun className="mr-2 h-4 w-4" height={16} width={16} />
               <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
               <Moon className="mr-2 h-4 w-4" height={16} width={16} />
               <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
               <Laptop className="mr-2 h-4 w-4" height={16} width={16} />
               <span>System</span>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

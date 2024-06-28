"use client";
import { useTheme } from "next-themes";
import { Check, Laptop, Moon, Sun } from "lucide-react";

import { DropdownMenuItem, DropdownMenuSubContent } from "@/components/ui/dropdown-menu";

export const ThemeSubContent = () => {
   const { setTheme, theme } = useTheme();

   return (
      <DropdownMenuSubContent sideOffset={48}>
         <DropdownMenuItem intent="default" className="text-[13px]" onClick={() => setTheme("light")}>
            <Sun className="mr-2 size-4 shrink-0" />
            <span>Light theme</span>
            {theme == "light" && <Check className="ml-4 size-4 shrink-0" height={16} width={16} />}
         </DropdownMenuItem>
         <DropdownMenuItem intent="default" className="text-[13px]" onClick={() => setTheme("dark")}>
            <Moon className="mr-2 size-4 shrink-0" />
            <span>Dark theme</span>
            {theme == "dark" && <Check className="ml-4 size-4 shrink-0" height={16} width={16} />}
         </DropdownMenuItem>
         <DropdownMenuItem intent="default" className="text-[13px]" onClick={() => setTheme("system")}>
            <Laptop className="mr-2 size-4 shrink-0" />
            <span>System</span>
            {theme == "system" && <Check className="ml-4 size-4 shrink-0" height={16} width={16} />}
         </DropdownMenuItem>
      </DropdownMenuSubContent>
   );
};

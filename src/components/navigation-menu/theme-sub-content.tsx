"use client";
import { useTheme } from "next-themes";
import { Check, Laptop, Moon, Sun } from "lucide-react";

import { DropdownMenuItem, DropdownMenuSubContent } from "@/components/ui/dropdown-menu";

export const ThemeSubContent = () => {
   const { setTheme, theme } = useTheme();

   return (
      <DropdownMenuSubContent>
         <DropdownMenuItem intent="default" className="text-[13px]" onClick={() => setTheme("light")}>
            <Sun className="mr-2 size-4 shrink-0" />
            <span>Light</span>
            {theme == "light" && <Check className="ml-auto size-4 shrink-0 opacity-70" height={16} width={16} />}
         </DropdownMenuItem>
         <DropdownMenuItem intent="default" className="text-[13px]" onClick={() => setTheme("dark")}>
            <Moon className="mr-2 size-4 shrink-0" />
            <span>Dark</span>
            {theme == "dark" && <Check className="ml-auto size-4 shrink-0 opacity-70" height={16} width={16} />}
         </DropdownMenuItem>
         <DropdownMenuItem intent="default" className="text-[13px]" onClick={() => setTheme("system")}>
            <Laptop className="mr-2 size-4 shrink-0" />
            <span>System</span>
            {theme == "system" && <Check className="ml-auto size-4 shrink-0 opacity-70" height={16} width={16} />}
         </DropdownMenuItem>
      </DropdownMenuSubContent>
   );
};

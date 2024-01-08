"use client";
import { useTheme } from "next-themes";
import { Check } from "lucide-react";

import { DropdownMenuItem, DropdownMenuSubContent } from "@/components/ui/dropdown-menu";

export const HeaderThemeContent = () => {
   const { setTheme, theme } = useTheme();

   return (
      <DropdownMenuSubContent>
         <DropdownMenuItem className="text-[13px]" onClick={() => setTheme("light")}>
            <span>Light theme</span>
            {theme == "light" && <Check className="ml-auto h-4 w-4 shrink-0" height={16} width={16} />}
         </DropdownMenuItem>
         <DropdownMenuItem className="text-[13px]" onClick={() => setTheme("dark")}>
            <span>Dark theme</span>
            {theme == "dark" && <Check className="ml-auto h-4 w-4 shrink-0" height={16} width={16} />}
         </DropdownMenuItem>
         <DropdownMenuItem className="text-[13px]" onClick={() => setTheme("system")}>
            <span>System</span>
            {theme == "system" && <Check className="ml-auto h-4 w-4 shrink-0" height={16} width={16} />}
         </DropdownMenuItem>
      </DropdownMenuSubContent>
   );
};

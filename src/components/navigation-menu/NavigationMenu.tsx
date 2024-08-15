"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Code, Palette, Settings } from "lucide-react";

import { NavigationMenuItem, navigationMenuItems } from "@/components/navigation-menu/data";
import { ThemeSubContent } from "@/components/navigation-menu/theme-sub-content";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSub,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getBreakpoint } from "@/lib/get-measures";
import { cn } from "@/lib/utils";
import { useNavigationMenuStore } from "@/components/navigation-menu/NavigationMenu.Store";

export const NavigationMenu = () => {
   const { selected, setSelected } = useNavigationMenuStore();

   return (
      <nav className="z-[2] flex h-[--nav-size] w-full flex-row items-center justify-between gap-2 border-muted bg-accent [--nav-size:45px] max-md:border-b sm:gap-4 md:h-full md:w-[--nav-size] md:max-w-[--nav-size] md:flex-col md:border-r">
         <div className="flex flex-row items-center gap-1 p-1 md:flex-col md:gap-4">
            {navigationMenuItems.map((props, index) => {
               const isActive = selected === props.slug;
               return (
                  <div key={index} className="flex items-center">
                     <Item
                        {...props}
                        aria-selected={isActive}
                        onClick={() => setSelected(isActive ? null : props.slug)}>
                        <AnimatePresence>
                           {isActive && (
                              <motion.div
                                 layoutId="navigation-menu-item-active"
                                 initial={{ opacity: 0, scale: 0, rotate: -45 }}
                                 animate={{
                                    opacity: 1,
                                    scale: 1,
                                    rotate: 0,
                                 }}
                                 exit={{ opacity: 0, rotate: 45 }}
                                 transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                                 className={cn(
                                    "pointer-events-none absolute inset-0 rounded-md bg-primary/15 shadow-[0_1px_1px_rgba(0,0,0,.02)] dark:highlight-5",
                                 )}
                              />
                           )}
                        </AnimatePresence>
                        <props.icon
                           className={cn(
                              "relative z-10 size-5",
                              isActive
                                 ? "text-primary"
                                 : "text-foreground/60 transition-colors group-hocus:text-foreground",
                           )}
                        />
                     </Item>
                  </div>
               );
            })}
         </div>
      </nav>
   );
};

const Item = ({
   name,
   icon: Icon,
   ...props
}: Pick<NavigationMenuItem, "name" | "icon"> & React.ComponentPropsWithoutRef<typeof Button>) => {
   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <Button {...props} intent="none" className="group relative size-9 rounded-md p-2">
               {props?.children}
            </Button>
         </TooltipTrigger>
         <TooltipContent side="right" sideOffset={4}>
            {name}
         </TooltipContent>
      </Tooltip>
   );
};

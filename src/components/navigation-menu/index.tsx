"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { NavigationMenuItems } from "@/components/navigation-menu/data";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSub,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Code, Palette, Settings } from "lucide-react";
import { ThemeSubContent } from "@/components/navigation-menu/theme-sub-content";

export const NavigationMenu = () => {
   const pathname = usePathname();

   const [hover, setHover] = useState<number | null>(null);

   return (
      <nav className="z-[2] flex h-full w-[52px] max-w-[52px] flex-col items-center justify-between gap-2 border-r border-r-muted bg-background py-2 md:gap-4">
         <div className="flex flex-col items-center p-2" onMouseLeave={() => setHover(null)}>
            {NavigationMenuItems.map((props, index) => {
               const isActive = props.forcedActive === true ? true : props?.regex?.test(pathname) ?? false;
               return (
                  <div
                     key={index}
                     className="flex items-center py-2 first:pt-0 last:pb-0 md:py-3"
                     onMouseEnter={() => setHover(index)}
                     onMouseLeave={() => setHover(index)}>
                     <NavigationMenuItem {...props} aria-selected={isActive}>
                        <AnimatePresence>
                           {(hover === index || (hover === null && isActive)) && (
                              <motion.div
                                 layoutId="navigation-menu-item-hover"
                                 initial={{ opacity: 0, rotate: 45 }}
                                 animate={{ opacity: 1, rotate: 45 + 90 * index }}
                                 exit={{ opacity: 0, rotate: 45 }}
                                 transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                                 className={cn(
                                    "pointer-events-none absolute inset-0 overflow-hidden rounded-md",
                                    isActive ? "bg-primary/20" : "bg-zinc-200 dark:bg-zinc-800",
                                 )}
                              />
                           )}
                        </AnimatePresence>
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
                        <props.icon className="relative z-10 size-5 text-foreground/70 group-aria-selected:text-primary group-hocus:text-foreground" />
                     </NavigationMenuItem>
                  </div>
               );
            })}
         </div>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button intent="ghost" size="icon-sm">
                  <Settings className="size-5 text-foreground/70 group-aria-selected:text-primary group-hocus:text-foreground" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right">
               <DropdownMenuSub>
                  <DropdownMenuSubTrigger intent="default">
                     <Palette className="mr-2 size-4 shrink-0" />
                     Theme
                  </DropdownMenuSubTrigger>
                  <ThemeSubContent />
               </DropdownMenuSub>
               <DropdownMenuItem intent="default">
                  <Code className="mr-2 size-4 shrink-0" />
                  Source Code
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </nav>
   );
};

export const NavigationMenuItem = ({
   name,
   icon: Icon,
   ...props
}: Pick<NavigationMenuItem, "name" | "icon"> & React.ComponentPropsWithoutRef<typeof Link>) => {
   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <Link className="group relative size-9 rounded-md p-2" {...props}>
               {props?.children}
            </Link>
         </TooltipTrigger>
         <TooltipContent side="right" sideOffset={4}>
            {name}
         </TooltipContent>
      </Tooltip>
   );
};

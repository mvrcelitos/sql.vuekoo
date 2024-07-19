"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Code, Palette, Settings } from "lucide-react";

import { NavigationMenuItems } from "@/components/navigation-menu/data";
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

export const NavigationMenu = () => {
   const pathname = usePathname();

   const [hover, setHover] = useState<number | null>(null);
   const isMobile = !getBreakpoint("md");

   return (
      <nav className="z-[2] flex h-[--nav-size] w-full flex-row items-center justify-between gap-2 border-muted bg-accent py-2 [--nav-size:53px] max-md:border-b sm:gap-4 md:h-full md:w-[--nav-size] md:max-w-[--nav-size] md:flex-col md:border-r">
         <div className="flex flex-row items-center p-2 md:flex-col" onMouseLeave={() => setHover(null)}>
            {NavigationMenuItems.map((props, index) => {
               const isActive = props.forcedActive === true ? true : props?.regex?.test(pathname) ?? false;
               return (
                  <div
                     key={index}
                     className="flex items-center px-1 first:pt-0 last:pb-0 md:px-0 md:py-3"
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
                        <props.icon
                           className={cn(
                              "relative z-10 size-5",
                              isActive ? "text-primary" : "text-foreground/70 group-hocus:text-foreground",
                           )}
                        />
                     </NavigationMenuItem>
                  </div>
               );
            })}
         </div>
         <div className="px-2 md:px-0">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     intent="ghost"
                     size="icon-sm"
                     className="aria-expanded:bg-muted dark:aria-expanded:highlight-5">
                     <Settings className="size-5 text-foreground/70 group-aria-selected:text-primary group-hocus:text-foreground" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align={isMobile ? "start" : "end"} side={isMobile ? "left" : "right"}>
                  <DropdownMenuSub>
                     <DropdownMenuSubTrigger intent="default">
                        <Palette className="mr-2 size-4 shrink-0" />
                        Theme
                     </DropdownMenuSubTrigger>
                     <ThemeSubContent />
                  </DropdownMenuSub>
                  <DropdownMenuItem intent="default" className="cursor-pointer" asChild>
                     <Link href="https://github.com/mvrcelitos/sql.vuekoo" target="_blank">
                        <Code className="mr-2 size-4 shrink-0" />
                        Source Code
                     </Link>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
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

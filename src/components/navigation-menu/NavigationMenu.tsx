"use client";

import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { NavigationMenuItem, navigationMenuItems } from "@/components/navigation-menu/data";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { useNavigationMenuStore } from "./NavigationMenu.Store";
import { useState } from "react";

export const NavigationMenu = () => {
   const { selected, setSelected } = useNavigationMenuStore();

   return (
      <nav className="z-[2] flex h-[--nav-size] w-full flex-row items-center justify-between gap-2 border-muted bg-accent [--nav-size:45px] max-md:border-b sm:gap-4 md:h-full md:w-[--nav-size] md:max-w-[--nav-size] md:flex-col md:border-r">
         <div className="flex flex-row items-center gap-1 p-1 md:flex-col md:gap-4">
            {navigationMenuItems.map((props, index) => {
               const { disabled, name, slug } = props;
               const isActive = selected === props.slug;

               return (
                  <div key={index} className="flex items-center">
                     <Item
                        name={name}
                        aria-label={slug}
                        aria-selected={isActive}
                        aria-disabled={disabled}
                        onClick={() => setSelected(selected === props.slug ? null : props.slug)}>
                        <AnimatePresence>
                           {isActive ? (
                              <motion.div
                                 key={slug}
                                 layoutId="navigation-menu-item-active"
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 exit={{ opacity: 0 }}
                                 transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                                 className={cn(
                                    "pointer-events-none absolute inset-0 rounded-md bg-primary/15 shadow-[0_1px_1px_rgba(0,0,0,.02)] dark:highlight-5",
                                 )}
                              />
                           ) : null}
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

const Item = ({ name, ...props }: Pick<NavigationMenuItem, "name"> & React.ComponentPropsWithoutRef<"button">) => {
   const [tooltip, setTooltip] = useState<boolean>(false);

   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <button
               {...props}
               className="group relative size-9 rounded-md p-2 !outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50">
               {props?.children}
            </button>
         </TooltipTrigger>
         <TooltipContent side="right" sideOffset={4}>
            {name}
         </TooltipContent>
      </Tooltip>
   );
};

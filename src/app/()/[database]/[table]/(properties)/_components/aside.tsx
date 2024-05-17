"use client";

import { AsideRoutes } from "@/app/()/[database]/[table]/(properties)/_components/aside-routes";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Aside = () => {
   const pathname = usePathname()?.split("?")?.[0];
   const database = pathname?.split("/")?.[1];
   const table = pathname?.split("/")?.[2];

   const rootPath = `/${database}/${table}`;
   const [activeTab, setActiveTab] = useState<number | null>(null);

   return (
      <aside className="h-full w-full min-w-[170px] max-w-[15%] grow border-r border-t border-zinc-200 dark:border-zinc-800">
         <nav className="flex flex-col gap-0.5 overflow-hidden p-1" onMouseLeave={() => setActiveTab(null)}>
            {AsideRoutes.map((route, index) => (
               <Link
                  aria-disabled={route.disabled}
                  tabIndex={route.disabled ? -1 : 0}
                  aria-selected={pathname == `${rootPath}${route.path}`}
                  key={route.path}
                  onMouseEnter={() => setActiveTab(index)}
                  href={`${rootPath}${route.path}`}
                  className={cn(
                     buttonVariants({ intent: "none", size: "xs" }),
                     "text-zinc-600 hover:text-zinc-800 aria-selected:text-foreground dark:text-zinc-400 dark:hover:text-zinc-200 dark:aria-selected:text-foreground",
                     "group relative justify-start text-left font-normal",
                     "hover:bg-transparent focus-visible:bg-transparent dark:hover:bg-transparent dark:focus-visible:bg-transparent",
                     route.disabled && "pointer-events-none opacity-50",
                  )}>
                  {activeTab === index ? (
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", duration: 0.3, bounce: 0.1 }}
                        layoutId="layout-aside-active-tab"
                        className="absolute inset-0 -z-[1] rounded-[inherit] bg-zinc-200 dark:bg-zinc-800"
                     />
                  ) : null}
                  <route.icon
                     className={cn(
                        "mr-2 size-4",
                        pathname == `${rootPath}${route.path}` ? "text-primary" : "opacity-70",
                     )}
                  />
                  <p>{route.name}</p>
               </Link>
            ))}
         </nav>
      </aside>
   );
};

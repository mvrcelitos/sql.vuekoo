"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Toolbar = () => {
   const params = useParams();
   const pathname = usePathname()?.split("?")?.[0];
   const routes = useMemo(
      () =>
         [
            {
               label: "Properties",
               href: `/databases/${params.uuid}/${params.table}/properties`,
               matchRoutes: [
                  `/databases/${params.uuid}/${params.table}/properties`,
                  `/databases/${params.uuid}/${params.table}/properties/foreign-keys`,
               ] as string[],
            },
            {
               label: "Data",
               href: `/databases/${params.uuid}/${params.table}/data`,
               matchRoutes: [`/databases/${params.uuid}/${params.table}/data`] as string[],
            },
         ] as const,
      [params],
   );

   const [tabHover, setTabHover] = React.useState<number | null>(null);

   return (
      <div className="flex h-11 w-full flex-[0_0_auto] items-center justify-between px-2">
         <div className="group relative flex items-center gap-0.5" onMouseLeave={() => setTabHover(null)}>
            {routes.map(({ label, href, matchRoutes }, index) => (
               <Link
                  key={href}
                  aria-selected={matchRoutes.includes(pathname)}
                  href={matchRoutes.includes(pathname) ? pathname : href}
                  onMouseEnter={() => setTabHover(index)}
                  className={cn(
                     buttonVariants({ intent: "ghost", size: "xs" }),
                     "relative px-2.5 hover:bg-transparent aria-selected:text-foreground dark:hover:bg-transparent dark:aria-selected:text-foreground",
                  )}>
                  {matchRoutes.includes(pathname) ? (
                     <motion.div
                        layoutId="layout-toolbar-indicator-active-tab"
                        transition={{ type: "spring", duration: 0.3, bounce: 0.1 }}
                        className="absolute inset-x-0 -bottom-[7px] h-0.5 bg-primary"></motion.div>
                  ) : null}
                  <AnimatePresence initial={false}>
                     {tabHover === index ? (
                        <motion.div
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{ type: "spring", duration: 0.3, bounce: 0.1 }}
                           layoutId="layout-toolbar-background-hover-tab"
                           className="absolute inset-0 -z-[1] rounded-[inherit] bg-zinc-200 dark:bg-zinc-800"
                        />
                     ) : null}
                  </AnimatePresence>
                  <span className="relative z-[1] font-normal">{label}</span>
               </Link>
            ))}
         </div>
      </div>
   );
};

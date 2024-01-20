"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Toolbar = () => {
   const params = useParams();
   const pathname = usePathname()?.split("?")?.[0];
   const routes = [
      {
         label: "Properties",
         href: `/${params.database}/${params.table}`,
      },
      {
         label: "Data",
         href: `/${params.database}/${params.table}/data`,
      },
   ] as const;

   const [isOver, setIsOver] = React.useState<null | any>(null);

   return (
      <div className="flex h-11 w-full flex-[1_0_auto] items-center justify-between px-2">
         <div className="group relative flex items-center gap-0.5">
            {routes.map(({ label, href }) => (
               <Link
                  key={href}
                  aria-selected={pathname === href}
                  href={href}
                  onMouseOver={(ev) => {
                     const parent = ev.currentTarget.parentElement?.getBoundingClientRect();
                     const current = ev.currentTarget.getBoundingClientRect();
                     setIsOver({
                        x: current.x - (parent?.left || 0),
                        width: current.width,
                     });
                  }}
                  className={cn(
                     buttonVariants({ intent: "ghost", size: "xs" }),
                     "relative z-10 rounded px-2.5 font-normal hover:bg-transparent aria-selected:text-foreground dark:hover:bg-transparent dark:aria-selected:text-foreground",
                     "aria-selected:after:absolute aria-selected:after:-bottom-1.5 aria-selected:after:mx-2 aria-selected:after:h-0.5 aria-selected:after:w-[calc(100%-12px)] aria-selected:after:bg-primary dark:aria-selected:after:bg-primary",
                  )}>
                  {/* {pathname === href && (
                     <div className="pointer-events-none absolute inset-x-1 -bottom-1.5 h-0.5 bg-primary" />
                  )} */}
                  {label}
               </Link>
            ))}
            {
               <div
                  className="pointer-events-none absolute h-8 rounded-md bg-zinc-200 opacity-0 [transition:opacity_350ms] hover:opacity-100 group-hover:opacity-100 group-hover:[transition:all_200ms,opacity_350ms] dark:bg-zinc-800"
                  style={{
                     left: isOver?.x,
                     width: isOver?.width,
                  }}
               />
            }
         </div>
         {/* <p className="ml-auto pr-1 text-sm font-semibold dark:text-zinc-300 dark:hover:text-foreground">
            {params.table}
         </p> */}
      </div>
   );
};

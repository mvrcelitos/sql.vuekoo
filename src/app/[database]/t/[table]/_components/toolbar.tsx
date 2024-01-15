"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export const Toolbar = () => {
   const params = useParams();
   const pathname = usePathname()?.split("?")?.[0];

   return (
      <div className="flex h-10 w-full flex-[1_0_auto] items-center p-1">
         <Link
            aria-selected={pathname === `/${params.database}/t/${params.table}/properties`}
            href={`/${params.database}/t/${params.table}/properties`}
            className={cn(
               buttonVariants({ intent: "ghost", size: "xs" }),
               pathname === `/${params.database}/t/${params.table}/properties`
                  ? "bg-zinc-200 text-foreground dark:bg-zinc-800 dark:text-foreground"
                  : "",
            )}>
            Properties
         </Link>
         <Link
            aria-selected={pathname === `/${params.database}/t/${params.table}`}
            href={`/${params.database}/t/${params.table}`}
            className={cn(
               buttonVariants({ intent: "ghost", size: "xs" }),
               pathname === `/${params.database}/t/${params.table}`
                  ? "bg-zinc-200 text-foreground dark:bg-zinc-800 dark:text-foreground"
                  : "",
            )}>
            Data
         </Link>
         <p className="ml-auto pr-1 text-sm font-semibold dark:text-zinc-300 dark:hover:text-foreground">
            {params.table}
         </p>
      </div>
   );
};

"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export const Toolbar = () => {
   const params = useParams();
   const pathname = usePathname()?.split("?")?.[0];

   return (
      <div className="flex h-9 w-full flex-[1_0_auto] items-center gap-1 p-1">
         <Link
            aria-selected={pathname === `/${params.database}/${params.table}`}
            href={`/${params.database}/${params.table}`}
            className={cn(
               buttonVariants({ intent: "ghost", size: "xxs" }),
               pathname === `/${params.database}/${params.table}`
                  ? "bg-zinc-200 text-foreground dark:bg-zinc-800 dark:text-foreground"
                  : "",
            )}>
            Properties
         </Link>
         <Link
            aria-selected={pathname === `/${params.database}/${params.table}/data`}
            href={`/${params.database}/${params.table}/data`}
            className={cn(
               buttonVariants({ intent: "ghost", size: "xxs" }),
               pathname === `/${params.database}/${params.table}/data`
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

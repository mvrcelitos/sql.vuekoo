"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AlertCircle, ArrowUpFromLine, RefreshCw, Scroll } from "lucide-react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";

export const RefreshPageButton = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button>>(
   ({ ...props }, ref) => {
      const router = useRouter();
      return (
         <Button ref={ref} {...props} size="xs" intent="ghost" className="gap-2" onClick={() => router.refresh()}>
            <RefreshCw className="size-4 shrink-0" />
            <p className="sm:inline">Refresh</p>
         </Button>
      );
   },
);
RefreshPageButton.displayName = "RefreshPageButton";

export const ScriptPageButton = React.forwardRef<
   React.ElementRef<typeof Link>,
   Omit<React.ComponentPropsWithoutRef<typeof Link>, "href">
>(({ ...props }, ref) => {
   const pathname = usePathname()?.split("?")?.[0];
   const database = pathname?.split("/")?.[1];
   return (
      <Link
         ref={ref}
         {...props}
         href={`/${database}/script`}
         className={buttonVariants({ size: "xs", intent: "ghost" })}>
         <Scroll className="size-4 shrink-0" />
      </Link>
   );
});
ScriptPageButton.displayName = "ScriptPageButton";

export const ExportTableButton = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button>>(
   ({ ...props }, ref) => {
      return (
         <Button
            ref={ref}
            {...props}
            size="icon-xs"
            intent="ghost"
            onClick={() => {
               toast.custom(
                  (t) => (
                     <div className="flex items-center gap-2 rounded-lg bg-red-500 p-4 dark:bg-red-600">
                        <div data-icon>
                           <AlertCircle className="h-5 w-5 shrink-0 text-foreground" height={20} width={20} />
                        </div>
                        <div data-content>
                           <div data-title>Ooopss!</div>
                           <div data-description style={{ opacity: "0.7" }}>
                              Function not implemented yet
                           </div>
                        </div>
                     </div>
                  ),
                  { style: { width: "min(100%, calc(100vw - 32px))", fontSize: 13 } },
               );
            }}>
            <ArrowUpFromLine className="size-4 shrink-0" />
         </Button>
      );
   },
);
ExportTableButton.displayName = "ExportTableButton";

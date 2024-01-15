"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpFromLine, Eye, RefreshCw } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SearchParamsManager } from "@/lib/search-params";

export const RefreshButton = ({ ...props }: React.ComponentPropsWithoutRef<typeof Button>) => {
   const router = useRouter();
   return (
      // <Tooltip>
      //    <TooltipTrigger asChild>
      <Button size="xs" intent="ghost" {...props} className="gap-2" onClick={() => router.refresh()}>
         <RefreshCw className="size-4 shrink-0" />
         <p className="sm:inline">Refresh</p>
      </Button>
      //      </TooltipTrigger>
      //    <TooltipContent>Refresh the table values</TooltipContent>
      // </Tooltip>
   );
};

export const VisibilityButton = ({ ...props }: React.ComponentPropsWithoutRef<typeof Button>) => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const hiddenColumns = searchParams?.get("hide")?.split(",") ?? [];
   return (
      <DropdownMenu>
         <Tooltip>
            <TooltipTrigger asChild>
               <DropdownMenuTrigger
                  disabled={hiddenColumns.length == 0}
                  data-test={hiddenColumns.length}
                  className={buttonVariants({ size: "icon-xs", intent: "ghost" })}>
                  <Eye className="size-4 shrink-0" />
               </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>Show hidden columns</TooltipContent>
         </Tooltip>
         <DropdownMenuContent side="top">
            {hiddenColumns.map((column: string, index) => (
               <DropdownMenuItem
                  key={index}
                  onClick={() => {
                     const searchParamsManager = new SearchParamsManager();
                     if (hiddenColumns.length > 1) {
                        searchParamsManager.set("hide", hiddenColumns.filter((col) => col !== column).join(","));
                     } else {
                        searchParamsManager.delete("hide");
                     }
                     router.push(`?${searchParamsManager.toString()}`);
                  }}>
                  {column}
               </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
               onClick={() => {
                  const searchParamsManager = new SearchParamsManager();
                  searchParamsManager.delete("hide");
                  router.push(`?${searchParamsManager.toString()}`);
               }}>
               Clear all
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export const ExportTableButton = ({ ...props }: React.ComponentPropsWithoutRef<typeof Button>) => {
   const router = useRouter();
   return (
      <Tooltip>
         <TooltipTrigger disabled asChild>
            <Button size="xs" intent="ghost" {...props} onClick={() => router.refresh()}>
               <ArrowUpFromLine className="size-4 shrink-0" />
            </Button>
         </TooltipTrigger>
         <TooltipContent>Exports the table</TooltipContent>
      </Tooltip>
   );
};

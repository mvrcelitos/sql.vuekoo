"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, ChevronDown, EyeOff, X } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Th } from "@/components/ui/table";
import { SearchParamsManager } from "@/lib/search-params";

export interface TableColumnHeaderProps extends Omit<React.ComponentPropsWithoutRef<typeof Th>, "id"> {
   id: string;
}

export const TableColumnHeader = ({ children, id, ...props }: TableColumnHeaderProps) => {
   const router = useRouter();
   const searchParams = useSearchParams();

   return (
      <Th {...props}>
         <div className="flex items-center justify-between gap-2">
            <span>{children}</span>
            <DropdownMenu>
               <DropdownMenuTrigger
                  className={buttonVariants({ intent: "ghost", size: "icon-custom", className: "-mr-2 size-7" })}>
                  <ChevronDown className="size-4 shrink-0" />
               </DropdownMenuTrigger>
               <DropdownMenuContent>
                  <DropdownMenuItem
                     onSelect={() => {
                        const searchParamsManager = new SearchParamsManager();
                        searchParamsManager.set("sort", id);
                        searchParamsManager.delete("sortType");
                        router.push(`?${searchParamsManager.toString()}`);
                     }}
                     disabled={
                        !!(
                           searchParams?.get("sort")?.toLowerCase() === id.toLowerCase() &&
                           searchParams?.get("sortType")?.toLowerCase() !== "desc"
                        )
                     }>
                     <ArrowDownNarrowWide className="mr-2 size-4 shrink-0" />
                     Ascending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                     onKeyDown={() => {
                        console.log("teste");
                     }}
                     onSelect={() => {
                        const searchParamsManager = new SearchParamsManager();
                        searchParamsManager.set("sort", id);
                        searchParamsManager.set("sortType", "desc");
                        router.push(`?${searchParamsManager.toString()}`);
                     }}
                     disabled={
                        !!(
                           searchParams?.get("sort")?.toLowerCase() === id.toLowerCase() &&
                           searchParams?.get("sortType")?.toLowerCase() === "desc"
                        )
                     }>
                     <ArrowUpNarrowWide className="mr-2 size-4 shrink-0" />
                     Descending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                     onSelect={() => {
                        const searchParamsManager = new SearchParamsManager();
                        searchParamsManager.delete("sort");
                        searchParamsManager.delete("sortType");
                        router.push(`?${searchParamsManager.toString()}`);
                     }}
                     disabled={searchParams.size === 0}>
                     <X className="mr-2 size-4 shrink-0" />
                     Clear ordering
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                     onSelect={() => {
                        const searchParamsManager = new SearchParamsManager();
                        const hiddenColumns = searchParamsManager?.get("hide")?.split(",") ?? [];
                        searchParamsManager.set("hide", [...hiddenColumns, id].join(","));
                        router.push(`?${searchParamsManager.toString()}`);
                     }}>
                     <EyeOff className="mr-2 size-4 shrink-0" />
                     Hide
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </Th>
   );
};

{
   /* <th
   key={field.columnID}
   className="border-r border-r-zinc-200 px-3 font-normal last:border-r-0 dark:border-r-zinc-800">
   <div className="flex items-center justify-between gap-2">
      <span>{field.name}</span>
      <Button size="icon-custom" intent="ghost" className="-mr-2 size-7">
         <ChevronDown className="size-4 shrink-0" />
      </Button>
   </div>
</th> */
}

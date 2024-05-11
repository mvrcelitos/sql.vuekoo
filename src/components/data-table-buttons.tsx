"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowUpFromLine, Check, Eye, Loader2, RefreshCw, ScanEye } from "lucide-react";

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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Portal } from "@radix-ui/react-portal";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { DefaultQueryParams } from "@/constants/default-query-params";
import { PopoverClose } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

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
                     router.push(`?${searchParamsManager.toString()}`, { scroll: false });
                  }}>
                  {column}
               </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
               onClick={() => {
                  const searchParamsManager = new SearchParamsManager();
                  searchParamsManager.delete("hide");
                  router.push(`?${searchParamsManager.toString()}`, { scroll: false });
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

export const RowsTableButton = ({ ...props }: React.ComponentPropsWithoutRef<typeof Button>) => {
   const router = useRouter();
   const searchParams = useSearchParams();

   const limit =
      searchParams.get("limit") === null
         ? +(searchParams.get("limit")?.replace(/\D/g, "") ?? DefaultQueryParams.limit)
         : DefaultQueryParams.limit;

   const [input, setInput] = useState<string>(`${limit}`);
   const [popoverOpen, setPopoverOpen] = useState(false);
   const [tooltipOpen, setTooltipOpen] = useState(false);

   // animation hooks
   const [pending, setPending] = useState(false);
   const [sucessfully, setSucessfully] = useState(false);

   const onChangeLimit = () => {
      const currentLimit = searchParams.get("limit");
      if (currentLimit == input) return;

      const newLimit = input == "" ? DefaultQueryParams : +input ?? DefaultQueryParams.limit;
      const searchParamsManager = new SearchParamsManager();
      searchParamsManager.set("limit", newLimit.toString());

      setPending(true);
      setSucessfully(false);

      router.push(`?${searchParamsManager.toString()}`, { scroll: false });
   };

   useEffect(() => {
      if (pending && searchParams.get("limit") == input) {
         setPending(false);
         if (searchParams.get("limit") == input) {
            setSucessfully(true);
            setTimeout(() => {
               setSucessfully(false);
            }, 1500);
         }
      }
      return () => {
         setPending(false);
         setSucessfully(false);
      };
   }, [searchParams]);

   return (
      <>
         <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <Tooltip open={tooltipOpen}>
               <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                     <Button
                        size="xs"
                        intent="ghost"
                        {...props}
                        onMouseEnter={() => setTooltipOpen(true)}
                        onMouseLeave={() => setTooltipOpen(false)}
                        onClick={() => {
                           setTooltipOpen(false);
                           setPopoverOpen(true);
                        }}>
                        <ScanEye className="size-4 shrink-0" />
                     </Button>
                  </PopoverTrigger>
               </TooltipTrigger>
               <TooltipContent>Limit of rows fetched</TooltipContent>
            </Tooltip>
            <PopoverContent sideOffset={7}>
               <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Limit of rows fetched</p>
               <Separator className="mb-2 mt-1 h-px" />
               <div className="flex items-center gap-2">
                  <div className="flex w-full items-center gap-2">
                     <span className="pointer-events-none select-none px-0.5">Rows:</span>
                     <Input
                        disabled={pending}
                        className="w-full px-2"
                        size="xs"
                        value={input}
                        onChange={(ev) => setInput(ev.currentTarget.value?.replace(/\D/g, ""))}
                        onKeyDown={(ev) => {
                           if (ev.key === "Enter") {
                              onChangeLimit();
                           }
                        }}
                        onBlur={() => setInput((x) => (x === "" ? `${DefaultQueryParams.limit}` : x))}
                     />
                  </div>
               </div>
               <div className="mt-2 flex items-center justify-end gap-2">
                  <Button
                     size="xs"
                     intent="ghost"
                     onClick={() => {
                        setPopoverOpen(false);
                        setTooltipOpen(false);
                     }}>
                     Cancel
                  </Button>
                  <Button
                     disabled={pending || sucessfully}
                     size="xs"
                     className="relative w-[72.2px] overflow-hidden px-3"
                     onClick={() => onChangeLimit()}>
                     <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                           initial={{ opacity: 0, y: 25 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -25 }}
                           transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                           key={pending ? "loading" : sucessfully ? "sucessfully" : "content"}>
                           {pending ? (
                              <Loader2 className="size-4 shrink-0 animate-spin" />
                           ) : sucessfully ? (
                              <Check className="size-4 shrink-0" />
                           ) : (
                              "Change"
                           )}
                        </motion.span>
                     </AnimatePresence>
                  </Button>
               </div>
            </PopoverContent>
         </Popover>
      </>
   );
};

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowUpFromLine, Check, Eye, Loader2, RefreshCw, ScanEye } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DefaultQueryParams } from "@/constants/default-query-params";
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

export interface ExportTableButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
   actions?: {
      interface?: {
         typescript?: () => void;
         zod?: () => void;
      };
   };
}
export const ExportTableButton = ({ ...props }: ExportTableButtonProps) => {
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const [tooltipOpen, setTooltipOpen] = useState(false);

   return (
      <>
         <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <Tooltip open={tooltipOpen}>
               <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                     <Button
                        size="xs"
                        intent="ghost"
                        {...props}
                        onMouseEnter={() => setTooltipOpen(dropdownOpen ? false : true)}
                        onMouseLeave={() => setTooltipOpen(false)}
                        onClick={() => {
                           setTooltipOpen(false);
                           setDropdownOpen(true);
                        }}>
                        <ArrowUpFromLine className="size-4 shrink-0" />
                     </Button>
                  </DropdownMenuTrigger>
               </TooltipTrigger>
               <TooltipContent>Exports the table</TooltipContent>
            </Tooltip>
            <DropdownMenuContent>
               <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Interface</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                     <DropdownMenuItem onSelect={() => props?.actions?.interface?.typescript?.()}>
                        Typescript
                     </DropdownMenuItem>
                     <DropdownMenuItem onSelect={() => props?.actions?.interface?.zod?.()}>Zod</DropdownMenuItem>
                  </DropdownMenuSubContent>
               </DropdownMenuSub>
               <DropdownMenuSeparator />
               <DropdownMenuItem>Data</DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   );
};

export const RowsTableButton = ({ ...props }: React.ComponentPropsWithoutRef<typeof Button>) => {
   const router = useRouter();
   const searchParams = useSearchParams();

   const currentLimitRef = useRef<number>(
      +(searchParams?.get("limit")?.replace(/\D/g, "") || DefaultQueryParams.limit),
   );
   const [input, setInput] = useState<string>(
      searchParams?.get("limit")?.replace(/\D/g, "") ?? `${DefaultQueryParams.limit}`,
   );
   const [popoverOpen, setPopoverOpen] = useState(false);
   const [tooltipOpen, setTooltipOpen] = useState(false);

   // animation hooks
   const [pending, setPending] = useState(false);
   const [sucessfully, setSucessfully] = useState(false);

   const onChangeLimit = () => {
      const limit = searchParams.get("limit");
      if (limit == input) return;

      const newLimit = ["", "0"].includes(input) ? DefaultQueryParams.limit : +input || DefaultQueryParams.limit;
      currentLimitRef.current = +newLimit;
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
                        onMouseEnter={() => setTooltipOpen(popoverOpen ? false : true)}
                        onMouseLeave={() => setTooltipOpen(false)}
                        onClick={() => {
                           setTooltipOpen(false);
                           setPopoverOpen(true);
                        }}>
                        <ScanEye className="size-4 shrink-0" />
                     </Button>
                  </PopoverTrigger>
               </TooltipTrigger>
               <TooltipContent>
                  Limit of rows fetched
                  <span className="ml-1 rounded-full bg-primary/20 px-2 py-0.5 font-medium text-primary">
                     {searchParams.get("limit") ?? DefaultQueryParams.limit}
                  </span>
               </TooltipContent>
            </Tooltip>
            <PopoverContent sideOffset={7} className="space-y-2">
               <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Limit of rows fetched</p>
               <Separator className="m h-px" />
               <div className="relative flex w-full items-center">
                  {/* <div className="pointer-events-none flex h-8 select-none items-center justify-center rounded-r-md border border-r-0 border-muted bg-accent px-2 text-zinc-500 dark:text-zinc-400">
                     Rows:
                  </div> */}
                  <Input
                     disabled={pending}
                     className="w-full px-2 [&:not(:first-child)]:rounded-l-none"
                     size="xs"
                     value={input}
                     onChange={(ev) => setInput(ev.currentTarget.value?.replace(/\D/g, ""))}
                     onKeyDown={(ev) => {
                        if (ev.key === "Escape") {
                           ev.preventDefault();
                           ev.currentTarget.blur();
                           return;
                        }
                        if (ev.key === "Enter") {
                           onChangeLimit();
                           return;
                        }
                        if (ev.key.length === 1 && !ev.ctrlKey && !ev.altKey && !/\d/.test(ev.key)) {
                           ev.preventDefault();
                           return;
                        }
                     }}
                     onBlur={() => setInput((x) => (x === "" ? `${DefaultQueryParams.limit}` : x))}
                  />
               </div>
               <AnimatePresence>
                  {+input >= 1000 && currentLimitRef.current + "" != input ? (
                     <motion.div
                        initial={{ height: 0, marginTop: 0 }}
                        animate={{ height: 24, marginTop: 8 }}
                        exit={{ height: 0, marginTop: 0 }}
                        transition={{ duration: 0.1, bounce: 0 }}
                        className="flex items-center gap-2 truncate rounded-full bg-amber-300 px-1.5 text-xs text-orange-800 dark:bg-amber-900 dark:text-amber-400">
                        <AlertCircle className="size-4 shrink-0" />
                        Beware, values too high can cause lag!
                     </motion.div>
                  ) : null}
               </AnimatePresence>
               <div className=" flex flex-row-reverse items-center justify-between gap-2">
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
                  <Button
                     size="xs"
                     intent="ghost"
                     onClick={() => {
                        setPopoverOpen(false);
                        setTooltipOpen(false);
                     }}>
                     Cancel
                  </Button>
               </div>
            </PopoverContent>
         </Popover>
      </>
   );
};

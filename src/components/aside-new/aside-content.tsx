"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { DatabasesReturn } from "./_components/create-database/schema";
import { DatabaseList } from "./_components/database-list";

interface AsideContentProps {
   databases: DatabasesReturn;
   create?: boolean;
   defaultCreate?: boolean;
   onCreateChange?: (open: boolean) => void;
   isTablet?: boolean;
}

export const AsideContent = ({ databases, isTablet, ...props }: AsideContentProps) => {
   // Search database hooks
   const [input, setInput] = useState<string>("");

   // Create database hooks
   const { create: createProp, defaultCreate, onCreateChange } = props;
   // Memo
   const memoizedInnerAsideList = useMemo(() => {
      try {
         const filteredDatabases = databases?.filter(
            (x) => x?.name?.toLowerCase().includes(input?.trim()?.toLowerCase()),
         );
         return <DatabaseList databases={filteredDatabases} />;
      } catch (err) {
         console.error(err);
         return <DatabaseList databases={[]} />;
      }
   }, [databases, input]);

   return (
      <motion.aside
         initial={{ opacity: 0, width: 0 }}
         animate={{ opacity: 1, width: isTablet ? "100%" : 304 }}
         transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
         className={cn(
            "modern-scroll relative z-[31] flex min-h-[50svh] flex-col overflow-y-auto overflow-x-hidden border-r border-r-muted bg-background",
         )}>
         <div className="sticky top-0 z-[2] flex flex-col gap-2 border-b border-b-muted bg-background p-3">
            <div className="flex items-center justify-between gap-2">
               <h4 className="whitespace-nowrap text-sm font-semibold">Your databases</h4>
               <Button
                  intent="none"
                  size="none"
                  onClick={() => props?.onCreateChange?.(true)}
                  className="group size-6 bg-muted hocus:bg-c300 dark:highlight-5">
                  <Plus className={cn("size-4")} />
               </Button>
            </div>
            <div className="relative w-full">
               <Input
                  intent="none"
                  size="xs"
                  value={input}
                  placeholder="Search database"
                  onChange={(ev) => setInput(ev.currentTarget.value)}
                  className="w-full rounded-full bg-accent pl-9 outline-transparent ring-1 ring-zinc-200/50 transition-all focus:shadow-vercel-lg dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,.05)] dark:ring-zinc-800/50"
               />
               <Search className="pointer-events-none absolute left-3 top-2 size-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
            </div>
         </div>

         {memoizedInnerAsideList}
      </motion.aside>
   );
};

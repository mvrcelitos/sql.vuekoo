"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Search } from "lucide-react";

import { CreateDatabaseForm } from "@/components/aside-new/_components/create-database/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { DatabasesReturn } from "./_components/create-database/schema";
import { DatabaseList } from "./_components/database-list";

export const AsideClient = ({ databases = [] }: { databases: DatabasesReturn }) => {
   // Search database hooks
   const [input, setInput] = useState<string>("");

   // Create database hooks
   const [create, setCreate] = useState<boolean>(false);

   // Memos
   const memoizedCreateDatabaseForm = useMemo(
      () => <CreateDatabaseForm onClose={() => setCreate(false)} />,
      [setCreate],
   );
   const memoizedInnerAsideList = useMemo(() => {
      console.log({ databases });
      const filteredDatabases = databases?.filter((x) => x?.name?.toLowerCase().includes(input?.trim()?.toLowerCase()));
      return <DatabaseList databases={filteredDatabases} />;
   }, [databases, input]);

   return (
      <div className="max-h-content relative z-30 flex">
         <>
            <AnimatePresence>
               {create && (
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ type: "spring", duration: 1, bounce: 0 }}
                     className="fixed inset-0 aspect-square bg-zinc-950/50"
                     onClick={() => setCreate(false)}
                  />
               )}
            </AnimatePresence>
            <AnimatePresence>
               {create && (
                  <motion.div
                     initial={{ left: 0, opacity: 0 }}
                     animate={{ left: 256, opacity: 1 }}
                     exit={{ left: 0, opacity: 0 }}
                     transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                     className="absolute inset-y-0 right-0 z-30 flex grow flex-col border-r-muted bg-background md:right-[unset] md:w-96 md:border-r xl:w-[416px]">
                     <div className="flex flex-col gap-2 p-3">
                        <div className="flex items-center justify-between gap-2">
                           <h4 className="text-sm font-semibold">Connect new database</h4>
                        </div>
                     </div>
                     <div className="flex grow p-3">{memoizedCreateDatabaseForm}</div>
                  </motion.div>
               )}
            </AnimatePresence>
         </>
         <motion.aside
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: create ? 256 : 304 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
            className={cn(
               "modern-scroll relative z-[31] flex min-h-[50svh] flex-col overflow-y-auto overflow-x-hidden border-r border-r-muted bg-accent",
            )}>
            <div className="sticky top-0 z-[1] flex flex-col gap-2 border-b border-b-muted bg-accent p-3">
               <div className="flex items-center justify-between gap-2">
                  <h4 className="whitespace-nowrap text-sm font-semibold">Your databases</h4>
                  <Button
                     intent="none"
                     size="none"
                     onClick={() => setCreate((prev) => !prev)}
                     className="group size-6 bg-muted hocus:bg-zinc-300 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,.05)] dark:hocus:bg-zinc-700">
                     <motion.span
                        initial={{ rotate: create ? 135 : 0 }}
                        animate={{ rotate: create ? 135 : 0 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.4 }}
                        className="block">
                        <Plus className={cn("size-4")} />
                     </motion.span>
                  </Button>
               </div>
               <div className="relative w-full">
                  <Input
                     intent="none"
                     size="sm"
                     value={input}
                     placeholder="Search database"
                     onChange={(ev) => setInput(ev.currentTarget.value)}
                     className="w-full rounded-full bg-background pl-9 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,.05)]"
                  />
                  <Search className="pointer-events-none absolute left-3 top-2.5 size-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
               </div>
            </div>

            {memoizedInnerAsideList}
         </motion.aside>
      </div>
   );
};

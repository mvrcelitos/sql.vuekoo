"use client";

import { CreateDatabaseForm } from "@/components/aside-new/_components/buttons/create-database/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Search, X } from "lucide-react";
import { useState } from "react";

export const InnerAside = ({ databases }: { databases?: string[] }) => {
   // Hooks

   // Search database hooks
   const [input, setInput] = useState<string>("");
   const filteredDatabases = databases?.filter((x) => x?.toLowerCase().includes(input?.toLowerCase()));

   // Create database hooks
   const [create, setCreate] = useState<boolean>(false);

   return (
      <div className="max-h-content relative z-[1] flex grow">
         <AnimatePresence>
            {create && (
               <motion.div
                  initial={{ opacity: 0, borderRadius: "100%" }}
                  animate={{ opacity: 1, borderRadius: "0" }}
                  exit={{ opacity: 0, borderRadius: "100%" }}
                  transition={{ type: "spring", duration: 1, bounce: 0 }}
                  className="fixed inset-0 bg-zinc-950/50"
                  onClick={() => setCreate(false)}
               />
            )}
         </AnimatePresence>
         <AnimatePresence>
            {create && (
               <motion.div
                  initial={{ left: 0, opacity: 0 }}
                  animate={{ left: "256px", opacity: 1 }}
                  exit={{ left: 0, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                  className="absolute inset-y-0 z-[1] border-r border-r-muted bg-background md:w-80 xl:w-[416px]">
                  <div className="flex flex-col gap-2 p-3">
                     <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold">Connect new database</h4>
                     </div>
                  </div>
                  <div className="p-3">
                     <CreateDatabaseForm onClose={() => setCreate(false)} />
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
         <motion.aside
            initial={{ width: create ? 256 : 288 }}
            animate={{ width: create ? 256 : 288 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
            className={cn(
               "modern-scroll rounded-scroll relative z-[2] flex flex-col overflow-y-auto overflow-x-hidden border-r border-r-muted bg-accent md:min-h-[50svh]",
            )}>
            <div className="flex flex-col gap-2 p-3">
               <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold">Your databases</h4>
                  <Button
                     intent="none"
                     size="none"
                     onClick={() => setCreate((prev) => !prev)}
                     className="group size-6 bg-muted hocus:bg-zinc-300 dark:hocus:bg-zinc-700">
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
                     size="xs"
                     value={input}
                     onChange={(ev) => setInput(ev.currentTarget.value)}
                     className="w-full rounded-full bg-background pl-9"
                  />
                  <Search className="pointer-events-none absolute left-3 top-2 size-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
               </div>
            </div>

            <div className=""></div>
         </motion.aside>
      </div>
   );
};

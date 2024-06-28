"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Search } from "lucide-react";

import { CreateDatabaseForm } from "@/components/aside-new/_components/create-database/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { DatabasesReturn } from "./_components/create-database/schema";
import { DatabaseList } from "./_components/database-list";
import { AsideContent } from "@/components/aside-new/aside-content";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useAsideStore } from "@/components/aside-new/aside-store";
import { getBreakpoint, getWidth } from "@/lib/get-measures";

interface AsideClientProps {
   databases: DatabasesReturn;
}

export const AsideClient = ({ databases }: AsideClientProps) => {
   // Use state hooks
   const [create, setCreate] = useState<boolean>(false);
   const isTablet = getBreakpoint("lg");

   const { sheet, setSheet } = useAsideStore();

   const memoizedCreateDatabaseForm = useMemo(
      () => <CreateDatabaseForm onClose={() => setCreate(false)} />,
      [setCreate],
   );

   if (isTablet)
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
                              <h4 className="text-sm font-semibold text-foreground">Connect new database</h4>
                           </div>
                        </div>
                        <div className="flex grow p-3">{memoizedCreateDatabaseForm}</div>
                     </motion.div>
                  )}
               </AnimatePresence>
               <AsideContent databases={databases} create={create} onCreateChange={(open) => setCreate(open)} />
            </>
         </div>
      );
   return (
      <>
         <Sheet open={sheet} onOpenChange={setSheet}>
            <SheetContent side="left" className="flex border-0 p-0" close={false}>
               <AsideContent
                  databases={databases}
                  create={create}
                  smallScreen={true}
                  onCreateChange={(open) => setCreate(open)}
               />
            </SheetContent>
         </Sheet>
      </>
   );
};

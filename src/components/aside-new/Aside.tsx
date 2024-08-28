"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Search } from "lucide-react";

import { CreateDatabaseForm } from "@/components/aside-new/_components/create-database";
import { useAsideStore } from "@/components/aside-new/store";
import { useNavigationMenuStore } from "@/components/navigation-menu/store";
import { Button } from "@/components/ui/button";
import { Dialog, DialogBody, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { getBreakpoint } from "@/lib/get-measures";
import { cn } from "@/lib/utils";

export const Aside = ({ children }: React.PropsWithChildren) => {
   const isTablet = getBreakpoint("lg");
   const { sheet, setSheet } = useAsideStore();
   const { selected } = useNavigationMenuStore();

   useEffect(() => {
      if (isTablet) setSheet(false);
   }, [isTablet]);

   const className =
      "relative z-30 modern-scroll shrink-0 flex min-h-[50svh] flex-col overflow-y-auto overflow-x-hidden border-r border-r-muted bg-background";

   if (!isTablet)
      return (
         <Sheet open={sheet} onOpenChange={setSheet}>
            <SheetContent side="left" className="flex border-0 p-0" close={false}>
               <div className={cn(className, "w-full")}>{children}</div>;
            </SheetContent>
         </Sheet>
      );

   return (
      // <div className="max-h-content relative z-30 flex">
      <AnimatePresence>
         {selected ? (
            <motion.aside
               initial={{ opacity: 0, width: 0 }}
               animate={{ opacity: 1, width: 304 }}
               exit={{ opacity: 0, width: 0, borderRightWidth: 0, transition: { borderRightWidth: { duration: 0 } } }}
               transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
               className={cn(className)}>
               {children}
            </motion.aside>
         ) : null}
      </AnimatePresence>
      // </div>
   );
};

export const AsideHeader = ({ children }: React.PropsWithChildren) => {
   const [create, setCreate] = useState<boolean>(false);

   const createDatabaseForm = useMemo(() => {
      return <CreateDatabaseForm onClose={() => setCreate(false)} />;
   }, [setCreate]);

   return (
      <>
         <div className="sticky top-0 z-[2] flex flex-col gap-2 border-b border-b-muted bg-background p-3">
            <div className="flex items-center justify-between gap-2">
               <h4 className="whitespace-nowrap text-sm font-semibold">Your databases</h4>
               <Button
                  intent="none"
                  size="none"
                  onClick={() => setCreate(true)}
                  className="group size-6 bg-muted hocus:bg-c300 dark:highlight-5">
                  <Plus className={cn("size-4")} />
               </Button>
            </div>
            {children}
         </div>
         <Dialog open={create} onOpenChange={setCreate}>
            <DialogContent className="overflow-hidden bg-background">
               <DialogHeader>
                  <DialogTitle>Connect new database</DialogTitle>
               </DialogHeader>
               <DialogBody>{createDatabaseForm}</DialogBody>
            </DialogContent>
         </Dialog>
      </>
   );
};

export const AsideSearch = () => {
   const { setSearch } = useAsideStore();

   return (
      <div className="relative w-full">
         <Input
            intent="none"
            size="xs"
            placeholder="Search database"
            onChange={(ev) => setSearch(ev.currentTarget.value)}
            className="w-full rounded-full bg-accent pl-9 outline-transparent ring-1 ring-zinc-200/50 transition-all focus:shadow-vercel-lg dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,.05)] dark:ring-zinc-800/50"
         />
         <Search className="pointer-events-none absolute left-3 top-2 size-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
      </div>
   );
};

"use client";

import { useMemo, useState } from "react";

import { CreateDatabaseForm } from "@/components/aside-new/_components/create-database/form";
import { AsideContent } from "@/components/aside-new/aside-content";
import { useAsideStore } from "@/components/aside-new/aside-store";
import { Dialog, DialogBody, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { getBreakpoint } from "@/lib/get-measures";

import { DatabasesReturn } from "./_components/create-database/schema";

interface AsideClientProps {
   databases: DatabasesReturn;
}

export const AsideClient = ({ databases }: AsideClientProps) => {
   // Use state hooks
   const [create, setCreate] = useState<boolean>(false);
   const isTablet = getBreakpoint("lg");

   const { sheet, setSheet } = useAsideStore();

   const memoizedCreateDatabaseForm = useMemo(() => {
      return <CreateDatabaseForm key="create-database-form" isTablet={!isTablet} onClose={() => setCreate(false)} />;
   }, [isTablet, setCreate]);

   return (
      <>
         {isTablet ? (
            <div className="max-h-content relative z-30 flex">
               <AsideContent
                  key="aside-content"
                  databases={databases}
                  create={create}
                  onCreateChange={(open) => setCreate(open)}
               />
            </div>
         ) : (
            <Sheet open={sheet} onOpenChange={setSheet}>
               <SheetContent side="left" className="flex border-0 p-0" close={false}>
                  <AsideContent
                     key="aside-content"
                     databases={databases}
                     create={create}
                     isTablet={true}
                     onCreateChange={(open) => setCreate(open)}
                  />
               </SheetContent>
            </Sheet>
         )}
         <Dialog open={create} onOpenChange={(o) => (o ? undefined : setCreate(false))}>
            <DialogContent className="overflow-hidden bg-background">
               <DialogHeader>
                  <DialogTitle>Connect new database</DialogTitle>
               </DialogHeader>
               <DialogBody>{memoizedCreateDatabaseForm}</DialogBody>
            </DialogContent>
         </Dialog>
      </>
   );
};

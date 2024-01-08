"use client";

import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

export interface AsideDeleteDatabaseProps {
   onDelete: (value: boolean) => void;
}

export const AsideDeleteDatabase = ({ onDelete }: AsideDeleteDatabaseProps) => {
   return (
      <>
         <DialogHeader>
            <DialogTitle>Delete the database</DialogTitle>
            <DialogDescription>Are you sure to delete?</DialogDescription>
         </DialogHeader>
         <div className="flex items-center justify-end gap-2">
            <Button
               type="button"
               intent="ghost"
               onClick={() => {
                  onDelete(false);
               }}>
               Cancel
            </Button>
            <Button
               intent="destructive"
               onClick={() => {
                  onDelete(true);
               }}>
               <X className="mr-2 size-4" size={16} />
               Delete
            </Button>
         </div>
      </>
   );
};

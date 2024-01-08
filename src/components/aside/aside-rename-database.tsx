"use client";

import { Form, FormField, FormInput, FormLabel, FormMessage } from "@/components/form-components";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";

export interface AsideRenameDatabaseReturn {
   name: string;
}

export interface AsideRenameDatabaseProps {
   defaultValues?: AsideRenameDatabaseReturn;
   onRename: (data: AsideRenameDatabaseReturn) => void;
}

export const AsideRenameDatabase = ({ defaultValues, onRename }: AsideRenameDatabaseProps) => {
   const form = useForm<AsideRenameDatabaseReturn>({ defaultValues });
   return (
      <>
         <DialogHeader>
            <DialogTitle>Rename the database</DialogTitle>
            <DialogDescription>Enter the new name of the database</DialogDescription>
         </DialogHeader>
         <Form
            form={form}
            className="grid max-h-[75svh] grid-cols-1 gap-2 md:gap-4"
            onSubmit={form.handleSubmit(onRename)}>
            <FormField name="name">
               <FormLabel>Name</FormLabel>
               <FormInput />
               <FormMessage />
            </FormField>
            <div className="flex items-center justify-end gap-2">
               <Button
                  type="button"
                  intent="ghost"
                  onClick={() => {
                     onRename({ name: defaultValues?.name ?? "undefined" });
                  }}>
                  Cancel
               </Button>
               <Button intent="primary">
                  <Pencil className="mr-2 size-4" size={16} />
                  Change name
               </Button>
            </div>
         </Form>
      </>
   );
};

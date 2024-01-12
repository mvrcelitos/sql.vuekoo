"use client";

import { useForm } from "react-hook-form";

import { Form, FormField, FormInput, FormLabel, FormRadio } from "@/components/form-components";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface AsideSeeDatabaseReturn {
   database: string;
   uuid: string;
   name: string;
   url: string;
}

export interface AsideSeeDatabaseProps {
   values?: AsideSeeDatabaseReturn;
   onClose: () => void;
}

export const AsideSeeDatabase = ({ values, onClose }: AsideSeeDatabaseProps) => {
   const form = useForm<AsideSeeDatabaseReturn>({ values });
   return (
      <>
         <DialogHeader>
            <DialogTitle>Database connection</DialogTitle>
            <DialogDescription>The informations about your database connection</DialogDescription>
         </DialogHeader>
         <Form
            form={form}
            className="max-h-[75svh]"
            onSubmit={(ev) => {
               ev.stopPropagation();
               ev.preventDefault();
            }}>
            <div className="flex items-center gap-2 md:gap-4">
               <FormField name="database" orientation="horizontal" asChild>
                  <label>
                     <FormRadio value="postgresql" checked={values?.database == "postgresql"} />
                     <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">PostgreSQL</span>
                  </label>
               </FormField>
               <FormField name="database" orientation="horizontal" asChild>
                  <label>
                     <FormRadio value="mysql" checked={values?.database == "mysql"} />
                     <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">MySQL</span>
                  </label>
               </FormField>
            </div>
            <FormField name="uuid">
               <FormLabel>UUID</FormLabel>
               <FormInput readOnly />
            </FormField>
            <FormField name="name">
               <FormLabel>Name</FormLabel>
               <FormInput readOnly />
            </FormField>
            <FormField name="url">
               <FormLabel>URL</FormLabel>
               <FormInput readOnly />
            </FormField>
         </Form>
      </>
   );
};

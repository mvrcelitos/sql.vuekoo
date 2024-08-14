"use client";

import { useForm } from "react-hook-form";

import { Form, FormField, FormInput, FormLabel, FormMessage } from "@/components/form-components";
import { useScript } from "@/components/script-dialog";
import { DialogBody, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { queries } from "@/constants/queries";
import { AvailableDatabaseIds } from "@/constants/available-databases";

interface Props {
   data: Record<string, any>;
   close: () => void;
   protocol: AvailableDatabaseIds;
   uuid: string;
}

export const RenameTableForm = ({ data, close, protocol, uuid }: Props) => {
   const form = useForm({ defaultValues: data });
   const { setUuid, append, show } = useScript();
   const { handleSubmit } = form;

   return (
      <>
         <Form
            form={form}
            className="gap-4"
            onSubmit={handleSubmit((d) => {
               setUuid(uuid);
               append(queries[protocol].table.rename({ old: data.name, new: d.name }));
               close();
               show();
            })}>
            <DialogBody>
               <FormField name="name">
                  <FormLabel required>Name</FormLabel>
                  <FormInput />
                  <FormMessage />
               </FormField>
            </DialogBody>
            <DialogFooter>
               <DialogClose asChild>
                  <Button intent="ghost">Cancel</Button>
               </DialogClose>
               <Button type="submit" intent="primary">
                  Rename
               </Button>
            </DialogFooter>
         </Form>
      </>
   );
};

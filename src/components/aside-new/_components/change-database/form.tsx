"use client";

import { Form, FormField, FormInput, FormInputMask, FormLabel, FormMessage } from "@/components/form-components";
import { useForm } from "react-hook-form";

export const ChangeDatabaseForm = ({ data }: { data: Record<string, any> }) => {
   const form = useForm({ defaultValues: data });

   return (
      <Form form={form}>
         <FormField name="name">
            <FormLabel required>Name</FormLabel>
            <FormInput />
            <FormMessage />
         </FormField>
      </Form>
   );
};

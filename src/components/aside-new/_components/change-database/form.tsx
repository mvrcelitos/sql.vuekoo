"use client";

import { useForm } from "react-hook-form";

import { Form, FormField, FormInput, FormLabel, FormMessage } from "@/components/form-components";

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

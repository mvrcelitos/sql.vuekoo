"use client";

import { Form, FormField, FormInput, FormInputMask, FormLabel, FormMessage } from "@/components/form-components";
import { useForm } from "react-hook-form";

export const ChangeDatabaseForm = () => {
   const form = useForm();

   return (
      <Form form={form}>
         <FormField name="name">
            <FormLabel required>Name</FormLabel>
            <FormInput />
            <FormMessage />
         </FormField>
         <div className="grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-0">
            <FormField name="host" className="md:col-span-3">
               <FormLabel required>Host</FormLabel>
               <FormInput
                  onPaste={(ev) => {
                     ev.preventDefault();
                     const clipboardText = ev.clipboardData.getData("text/plain");

                     if (!clipboardText.includes(":")) {
                        ev.currentTarget.value = clipboardText;
                        return;
                     }

                     const splitted = clipboardText?.match(/^([0-9a-zA-Z,\.,\-]+)\:(\d+)$/);
                     if (!splitted) {
                        form?.setValue("host", clipboardText);
                        return;
                     }
                     form?.setValue("host", splitted?.[1]);
                     form?.setValue("port", +splitted?.[2]);
                  }}
                  className="md:rounded-r-none md:focus:z-[1]"
               />
               <FormMessage />
            </FormField>
            <FormField name="port">
               <FormLabel>Port</FormLabel>
               <FormInputMask
                  mask={(d) => d?.toString()?.replace(/\D/g, "")}
                  inputMode="numeric"
                  className="md:-ml-px md:max-w-[calc(100%+1px)] md:rounded-l-none md:focus:z-[1]"
                  placeholder={"5432"}
               />
               <FormMessage />
            </FormField>
         </div>
         <FormField name="database">
            <FormLabel required>Database</FormLabel>
            <FormInput />
            <FormMessage />
         </FormField>
         <FormField name="username">
            <FormLabel required>Username</FormLabel>
            <FormInput />
            <FormMessage />
         </FormField>
         <FormField name="password">
            <FormLabel required>Password</FormLabel>
            <FormInput />
            <FormMessage />
         </FormField>
      </Form>
   );
};

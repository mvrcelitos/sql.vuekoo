"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Clipboard, Loader2, X, Zap } from "lucide-react";
import { toast } from "sonner";

import { pasteURL } from "@/components/aside-new/_components/create-database/utils";
import {
   Form,
   FormField,
   FormInput,
   FormInputMask,
   FormLabel,
   FormMessage,
   FormPassword,
   FormRadio,
} from "@/components/form-components";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { availableDatabases } from "@/constants/available-databases";
import { Entries } from "@/interfaces/entries";

import { createDatabase, testConnection } from "./actions";
import {
   CreateDatabaseFormInput,
   CreateDatabaseFormReturn,
   createDatabaseFormSchema,
   DatabaseConnectionParamsReturn,
} from "./schema";
import { cn } from "@/lib/utils";

const TestConnectionStates = {
   idle: {
      content: (
         <>
            <Zap className="size-4 shrink-0" />
            Test connection
         </>
      ),
   },
   pending: {
      content: <Loader2 className="size-4 shrink-0 animate-spin" />,
   },
   success: {
      content: <Check className="size-4 shrink-0" />,
   },
   error: {
      content: <X className="size-4 shrink-0" />,
   },
};

interface CreateDatabaseFormProps {
   onClose?: () => void;
   isTablet?: boolean;
}
export const CreateDatabaseForm = ({ onClose, isTablet }: CreateDatabaseFormProps) => {
   const form = useForm<CreateDatabaseFormInput>({
      defaultValues: { type: "psql" },
      resolver: zodResolver(createDatabaseFormSchema),
   });

   const [state, setState] = useState<keyof typeof TestConnectionStates>("idle");
   const currentState = TestConnectionStates[state];

   const { handleSubmit } = form;
   return (
      <Form
         form={form}
         onSubmit={handleSubmit(async (d) => {
            const res = await createDatabase(d as unknown as CreateDatabaseFormReturn);
            toast?.[res?.ok == false ? "error" : "success"]?.(res?.message);
            onClose?.();
         })}
         className={cn(
            isTablet ? "-mx-4 -my-2 p-2 px-4" : "-m-3 p-3",
            "relative grid grow grid-cols-1 grid-rows-[minmax(0,1fr)_minmax(0,auto)] overflow-hidden",
         )}>
         <div className="flex flex-col gap-2 sm:gap-4">
            <FormField name="type">
               <FormLabel className="mb-1.5" required>
                  Database
               </FormLabel>
               <div className="flex items-center gap-2 md:gap-4">
                  {availableDatabases.map((x) => (
                     <FormLabel key={x.id} className="flex items-center gap-2">
                        <FormRadio name="type" value={x.id} />
                        <span>{x.label}</span>
                     </FormLabel>
                  ))}
               </div>
            </FormField>
            <FormField name="name">
               <FormLabel required>Name</FormLabel>
               <FormInput />
               <FormMessage />
            </FormField>
            <Separator className={cn(isTablet ? "-mx-4" : "-mx-3", "w-auto")} />
            <div className="flex flex-wrap items-center justify-between sm:-my-2">
               <div className="text-sm font-semibold text-foreground">Database connection</div>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button
                        type="button"
                        intent="ghost"
                        size="icon-xs"
                        className="group gap-2 hover:shadow-vercel dark:highlight-5"
                        onClick={async () => {
                           const res = await pasteURL();
                           if (!res.ok) {
                              toast?.error?.(res.message);
                              return;
                           }
                           const entries = Object.entries(res.data) as Entries<DatabaseConnectionParamsReturn>;
                           for (const entry of entries) {
                              form?.setValue(entry[0], entry[1]);
                           }
                           toast?.success?.(res.message);
                        }}>
                        <Clipboard className="size-4" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Paste the current database URL on your clipboard</TooltipContent>
               </Tooltip>
            </div>
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
                     className="md:rounded-l-none md:focus:z-[1]"
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
               <FormPassword intent="primary" type="password" />
               <FormMessage />
            </FormField>
            <Separator className={cn(isTablet ? "-mx-4" : "-mx-3", "w-auto")} />
            <Button
               type="button"
               intent="outline"
               className="relative w-full gap-2 overflow-hidden"
               disabled={
                  form?.formState.isSubmitting ||
                  state != "idle" ||
                  form?.watch("host")?.replace(/\s/g, "")?.length < 2 ||
                  form?.watch("port")?.toString()?.replace(/\s/g, "")?.length < 1 ||
                  form?.watch("database")?.replace(/\s/g, "")?.length < 1 ||
                  form?.watch("username")?.replace(/\s/g, "")?.length < 1 ||
                  form?.watch("password")?.replace(/\s/g, "")?.length < 1
               }
               onClick={async () => {
                  setState("pending");
                  const data = form?.watch() as CreateDatabaseFormReturn;
                  const res = await testConnection(data);
                  toast?.[res?.ok == false ? "error" : "success"]?.(res?.message);
                  setState(res.ok ? "success" : "error");
                  setTimeout(() => {
                     setState("idle");
                  }, 1750);
               }}>
               <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                     className="flex items-center gap-2 whitespace-nowrap"
                     key={state}
                     initial={{ filter: "blur(3px)", opacity: 0, y: 25, x: 0 }}
                     animate={{ filter: "blur(0px)", opacity: 1, y: 0, x: 0 }}
                     exit={{ filter: "blur(3px)", opacity: 0, y: -25, x: 0 }}
                     transition={{ type: "spring", duration: 0.3, bounce: 0 }}>
                     {currentState.content}
                  </motion.div>
               </AnimatePresence>
            </Button>
         </div>
         <div
            className={cn(
               isTablet ? "-mx-4 -mb-2 p-4" : "-m-3 p-3",
               "mt-0 flex flex-col gap-2 border-t border-t-muted bg-accent sm:gap-4",
            )}>
            <div className="mt-auto flex flex-wrap items-center justify-end gap-2 md:gap-4">
               <Button type="button" intent="ghost" onClick={onClose} disabled={form?.formState.isSubmitting}>
                  Cancel
               </Button>
               <Button type="submit" intent="primary" disabled={form?.formState.isSubmitting}>
                  Save database
               </Button>
            </div>
         </div>
      </Form>
   );
};

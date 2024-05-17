"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, X, Zap } from "lucide-react";

import {
   Form,
   FormField,
   FormInput,
   FormLabel,
   FormMessage,
   FormRadio,
   FormTextarea,
} from "@/components/form-components";
import { Button } from "@/components/ui/button";

import { createDatabase, testConnection } from "./actions";
import { CreateDatabaseFormInput, createDatabaseFormSchema } from "./schema";

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

export const CreateDatabaseForm = ({ onClose }: { onClose?: () => void }) => {
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
            setState("pending");
            const res = await createDatabase(d);
            setState(res.ok ? "success" : "error");
            setTimeout(() => {
               setState("idle");
            }, 1750);
         })}>
         <FormField name="type" orientation="horizontal" className="md:gap-4">
            <FormLabel className="flex items-center gap-2">
               <FormRadio value={"psql"} />
               <span>PostgreSQL</span>
            </FormLabel>
            <FormLabel className="flex items-center gap-2">
               <FormRadio value={"mysql"} />
               <span>MySQL</span>
            </FormLabel>
         </FormField>
         <FormField name="name">
            <FormLabel required>Name</FormLabel>
            <FormInput />
            <FormMessage />
         </FormField>
         <FormField name="url">
            <FormLabel required>URL</FormLabel>
            <FormTextarea className="modern-scroll h-[118px] !resize-none" />
            <FormMessage />
         </FormField>
         <Button
            type="button"
            intent="outline"
            className="relative w-full gap-2 overflow-hidden"
            disabled={state != "idle" || form?.watch?.("url")?.replace(/\s/g, "")?.length < 8}
            onClick={async () => {
               setState("pending");
               const res = await testConnection(form?.watch());
               if (!res.ok) {
                  console.error(res.message);
               }
               setState(res.ok ? "success" : "error");
               setTimeout(() => {
                  setState("idle");
               }, 1750);
            }}>
            <AnimatePresence mode="popLayout" initial={false}>
               <motion.div
                  className="flex items-center gap-2"
                  key={state}
                  initial={{ filter: "blur(3px)", opacity: 0, y: 20, x: 0 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0, x: 0 }}
                  exit={{ filter: "blur(3px)", opacity: 0, y: -25, x: 0 }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0 }}>
                  {currentState.content}
               </motion.div>
            </AnimatePresence>
         </Button>
         <div className="flex flex-wrap items-center justify-end gap-2 md:gap-4">
            <Button type="button" intent="ghost" onClick={onClose}>
               Cancel
            </Button>
            <Button intent="primary">Save database</Button>
         </div>
         {/* <div className="flex flex-wrap items-center justify-between gap-2 md:gap-4">
            <Button type="button" intent="primary" disabled={state != "idle"}>
               <motion.div key={state} layout className="flex items-center gap-2">
                  <Zap className="size-4 shrink-0" />
                  <motion.span layoutId="">Test connection</motion.span>
               </motion.div>
            </Button>
         </div> */}
      </Form>
   );
};

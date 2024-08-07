"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { AlertCircle, ChevronRight, Loader2, Plug, Plus } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";

import { useDatabaseStore } from "@/components/aside/use-database-store";
import { Form, FormField, FormInput, FormLabel, FormMessage } from "@/components/form-components";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";

const asideDatabaseCreateSchema = z.object({
   name: z
      .string({
         invalid_type_error: "Invalid name",
         required_error: "Name is required, can't be blank",
      })
      .min(1, "Name is required, can't be blank")
      .min(3, "Name must be at least 3 characters long"),
   url: z
      .string({
         invalid_type_error: "Invalid URL",
         required_error: "URL is required, can't be blank",
      })
      .min(1, "URL is required, can't be blank")
      .min(8, "URL must be at least 8 characters long"),
});

export const AsideCreateDatabaseForm = () => {
   const form = useForm<z.infer<typeof asideDatabaseCreateSchema>>({
      resolver: zodResolver(asideDatabaseCreateSchema),
   });

   const [open, setOpen] = React.useState<boolean>(false);
   const { add } = useDatabaseStore();

   const [isPending, startTransition] = React.useTransition();
   const urlIsValid = (form?.watch?.("url")?.length || 0) >= 8 && !form?.watch?.("url").includes(" ");

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button intent="discrete" size="sm" className="h-6 w-6 gap-1 p-0">
               <Plus className="opacity/70 h-4 w-4 shrink-0" height={16} width={16} />
               {/* <p className="text-[13px] leading-4">Connect</p> */}
            </Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Connect a new database</DialogTitle>
               <DialogDescription>Enter credentials or the url to connect</DialogDescription>
            </DialogHeader>
            <Form
               form={form}
               className="max-h-[75svh]"
               onSubmit={form.handleSubmit((d) => {
                  add(d);
                  setOpen(false);
               })}>
               <FormField name="name">
                  <FormLabel>Name</FormLabel>
                  <FormInput intent="primary2" size="sm" />
                  <FormMessage />
               </FormField>
               {/* <Separator /> */}
               <FormField name="url">
                  <FormLabel>Database URL</FormLabel>
                  <FormInput intent="primary2" size="sm" />
                  <FormMessage />
               </FormField>
               <div className="flex justify-between gap-2 md:gap-4">
                  <Button
                     type="button"
                     intent="outline"
                     className="gap-2"
                     disabled={!urlIsValid || isPending}
                     onClick={() => {
                        startTransition(async () => {
                           try {
                              await axios.post("/api/v1/databases/test", { url: form.watch("url") });
                              toast.success("The test connection was sucessfull");
                           } catch (err) {
                              console.error(err);
                              toast.custom(
                                 (t) => (
                                    <div className="flex items-center gap-2 rounded-lg bg-red-500 p-4 dark:bg-red-600">
                                       <div data-icon>
                                          <AlertCircle
                                             className="h-5 w-5 shrink-0 text-foreground"
                                             height={20}
                                             width={20}
                                          />
                                       </div>
                                       <div data-content>
                                          <div data-title>Ooopss!</div>
                                          <div data-description style={{ opacity: "0.7" }}>
                                             The test connection failed
                                          </div>
                                       </div>
                                    </div>
                                 ),
                                 { style: { width: "min(100%, calc(100vw - 32px))", fontSize: 13 } },
                              );
                           }
                        });
                     }}>
                     {isPending ? (
                        <Loader2 className="h-4 w-4 shrink-0 animate-spin opacity-70" height={16} width={16} />
                     ) : (
                        <Plug className="h-4 w-4 shrink-0 opacity-70" height={16} width={16} />
                     )}
                     Test connection
                  </Button>
                  <Button intent="primary" className="group/button">
                     <span>Finish</span>
                     <div className="relative ml-2 h-4 w-4 shrink-0">
                        <ChevronRight
                           className="absolute inset-y-0 left-0 h-4 w-4 shrink-0 opacity-70 duration-150 group-hover/button:left-[4px]"
                           height={16}
                           width={16}
                        />
                        <div className="absolute right-[8px] top-1/2 h-px w-0 -translate-x-full -translate-y-1/2 bg-zinc-50 opacity-70 duration-150 group-hover/button:-right-[7px] group-hover/button:w-2.5" />
                     </div>
                  </Button>
               </div>
            </Form>
         </DialogContent>
      </Dialog>
   );
};

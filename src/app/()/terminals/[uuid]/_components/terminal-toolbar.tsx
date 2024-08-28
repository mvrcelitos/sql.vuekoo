"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Cloud, Loader2, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { useTerminalContext } from "@/app/()/terminals/[uuid]/context";
import { Form, FormField, FormInput, FormLabel, FormMessage } from "@/components/form-components";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogBody,
   DialogClose,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const schema = z.object({ name: z.string({ invalid_type_error: "Invalid name" }).min(1, "Name is required") });

export const TerminalToolbar = () => {
   const form = useForm<{ name: string }>({ resolver: zodResolver(schema) });
   const { handleSubmit } = form;
   const { scripts, saveScript, submit, isSubmitting, ref } = useTerminalContext();

   const [isSaving, setIsSaving] = useState<boolean>(false);

   return useMemo(() => {
      return (
         <div className="flex w-full justify-between border-b border-b-muted">
            <div className="flex">
               <Tooltip open={isSubmitting ? false : undefined}>
                  <TooltipTrigger asChild>
                     <Button
                        disabled={isSubmitting}
                        intent="ghost"
                        size="icon-xs"
                        onClick={() => submit(ref?.current?.value || "")}
                        className="rounded-none hocus:bg-accent hocus:shadow-inner">
                        <span className="sr-only">Run query</span>
                        {isSubmitting ? (
                           <Loader2 className="size-4 shrink-0 animate-spin" />
                        ) : (
                           <ArrowRight className="size-4 shrink-0" />
                        )}
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Run query</TooltipContent>
               </Tooltip>
               <Separator orientation="vertical" />
               <Dialog open={isSaving} onOpenChange={setIsSaving}>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                           <Button
                              intent="ghost"
                              size="icon-xs"
                              onClick={() => {}}
                              className="rounded-none hocus:bg-accent hocus:shadow-inner">
                              <span className="sr-only">Save SQL</span>
                              <Save className="size-4 shrink-0" />
                           </Button>
                        </DialogTrigger>
                     </TooltipTrigger>
                     <TooltipContent>Save SQL</TooltipContent>
                  </Tooltip>
                  <DialogContent>
                     <DialogHeader>
                        <DialogTitle>Save sql</DialogTitle>
                     </DialogHeader>
                     <Form
                        form={form}
                        className="gap-4"
                        onSubmit={handleSubmit(({ name }) => {
                           const res = saveScript({ name, sql: ref?.current?.value ?? "" });
                           if (!res) return;
                           setIsSaving(false);
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
                              <Button intent="ghost" className="cursor-pointer">
                                 Cancel
                              </Button>
                           </DialogClose>
                           <Button type="submit" intent="primary">
                              Save
                           </Button>
                        </DialogFooter>
                     </Form>
                  </DialogContent>
               </Dialog>
               <Separator orientation="vertical" />
            </div>
            <div className="flex">
               <Separator orientation="vertical" />
               <DropdownMenu>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                           <Button
                              disabled={scripts?.length === 0}
                              intent="ghost"
                              size="icon-xs"
                              className="rounded-none hocus:bg-accent hocus:shadow-inner">
                              <span className="sr-only">Load SQL</span>
                              <Cloud className="size-4 shrink-0" />
                           </Button>
                        </DropdownMenuTrigger>
                     </TooltipTrigger>
                     <TooltipContent>Load SQL</TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent>
                     {scripts?.map((script) => (
                        <DropdownMenuItem
                           intent="default"
                           key={script.name}
                           onSelect={() => {
                              if (!ref?.current) return toast.error("Failed to load script");
                              ref.current.value = script.sql;
                           }}
                           className="group pr-8">
                           {script.name}
                           <Button
                              intent="ghost"
                              size="icon-xxs"
                              className="absolute right-0 rounded-l-none opacity-0 transition-opacity group-[:not([data-highlighted])]:pointer-events-none group-data-[highlighted]:opacity-100 hocus:bg-300">
                              <Trash2 className="size-4" />
                           </Button>
                        </DropdownMenuItem>
                     ))}
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>
      );
   }, [ref, scripts, isSubmitting, isSaving]);
};

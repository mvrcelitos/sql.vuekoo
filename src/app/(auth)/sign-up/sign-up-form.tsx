"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Form, FormField, FormInput, FormLabel, FormMessage, FormPassword } from "@/components/form-components";
import { Button } from "@/components/ui/button";

import { SignUp } from "./actions";
import { SignUpFormResolver, SignUpFormReturn } from "./sign-up-schema";
import { toast } from "sonner";

export const SignUpForm = () => {
   const instance = useForm<SignUpFormReturn>({ resolver: SignUpFormResolver });
   const isSubmitting = instance.formState.isSubmitting;

   const signUp = useCallback(async (data: SignUpFormReturn) => {
      toast("Auth system not implemented yet");
      return;

      await SignUp(data);
   }, []);

   return (
      <Form className="grid grid-cols-1 gap-4" form={instance} onSubmit={instance.handleSubmit(signUp)}>
         <FormField name="name">
            <div className="flex items-center gap-2">
               <FormLabel required>Full name</FormLabel>
               <FormMessage />
            </div>
            <FormInput autoComplete="name" disabled={isSubmitting} />
         </FormField>
         <FormField name="username">
            <div className="flex items-center gap-2">
               <FormLabel required>Username</FormLabel>
               <FormMessage />
            </div>
            <FormInput autoComplete="username" disabled={isSubmitting} />
         </FormField>
         <FormField name="email">
            <div className="flex items-center gap-2">
               <FormLabel required>E-mail</FormLabel>
               <FormMessage />
            </div>
            <FormInput autoComplete="email" disabled={isSubmitting} inputMode="email" />
         </FormField>
         <FormField name="password">
            <div className="flex items-center gap-2">
               <FormLabel required>Password</FormLabel>
               <FormMessage />
               <Link
                  aria-disabled={isSubmitting}
                  href="/forgot-password"
                  className="ml-auto text-xs text-primary hover:underline focus-visible:underline focus-visible:outline-none"
                  tabIndex={-1}>
                  Forgot?
               </Link>
            </div>
            <FormPassword autoComplete="current-password" intent="primary" disabled={isSubmitting} />
         </FormField>
         <Button disabled={isSubmitting} type="submit" className="relative" size="lg">
            <span>Sign up</span>
            {isSubmitting ? (
               <span className="absolute inset-0 flex h-full w-full items-center justify-center rounded-[inherit] bg-[inherit]">
                  <Loader2 className="size-4 shrink-0 animate-spin" />
               </span>
            ) : null}
         </Button>
      </Form>
   );
};

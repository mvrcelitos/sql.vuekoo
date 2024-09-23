"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Form, FormField, FormInput, FormLabel, FormMessage, FormPassword } from "@/components/form-components";
import { Button } from "@/components/ui/button";

import { SignUp } from "./actions";
import { SignUpFormResolver, SignUpFormReturn } from "./sign-up-schema";

export const SignUpForm = () => {
   const instance = useForm<SignUpFormReturn>({ resolver: SignUpFormResolver });
   const isSubmitting = instance.formState.isSubmitting;

   const signUp = useCallback(async (data: unknown) => {
      await new Promise((res) => {
         setTimeout(res, 1500);
      });
      await SignUp(data)
   }, []);

   return (
      <Form className="grid grid-cols-1 gap-4" form={instance} onSubmit={instance.handleSubmit(signUp)}>
         <FormField name="name">
            <FormLabel>Full name</FormLabel>
            <FormInput autoComplete="name" disabled={isSubmitting} />
            <FormMessage />
         </FormField>
         <FormField name="username">
            <FormLabel required>Username</FormLabel>
            <FormInput autoComplete="username" disabled={isSubmitting} />
            <FormMessage />
         </FormField>
         <FormField name="email">
            <FormLabel required>E-mail</FormLabel>
            <FormInput autoComplete="email" disabled={isSubmitting} />
            <FormMessage />
         </FormField>
         <FormField name="password">
            <div className="flex items-center justify-between gap-2">
               <FormLabel required>Password</FormLabel>
               <Link
                  aria-disabled={isSubmitting}
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline focus-visible:underline focus-visible:outline-none"
                  tabIndex={-1}>
                  Forgot?
               </Link>
            </div>
            <FormPassword intent="primary" disabled={isSubmitting} autoComplete="current-password" />
            <FormMessage />
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

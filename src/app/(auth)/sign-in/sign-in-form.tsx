"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput, FormLabel, FormMessage, FormPassword } from "@/components/form-components";

import { CheckEmailExists, SignIn } from "./actions";
import { SignInFormResolver, SignInFormReturn } from "./sign-in-schema";

export const SignInForm = () => {
   const instance = useForm<SignInFormReturn>({ resolver: SignInFormResolver });
   const isSubmitting = instance.formState.isSubmitting;

   const [emailIsValid, setEmailIsValid] = useState<boolean | null>(null);

   const signIn = useCallback(
      async (d: SignInFormReturn) => {
         toast("Auth system not implemented yet");
         return;

         if (emailIsValid === true) {
            const signIn = await SignIn(d);
            if (!signIn.ok) toast.error(signIn.message);
            return;
         }

         const exists = await CheckEmailExists(d);
         if (!exists.ok) return toast.error(exists.message);
         setEmailIsValid(true);
      },
      [emailIsValid],
   );

   return (
      <Form className="grid grid-cols-1 gap-4" form={instance} onSubmit={instance.handleSubmit(signIn)}>
         <FormField name="email">
            <div className="flex items-center gap-2">
               <FormLabel>E-mail</FormLabel>
               <FormMessage />
            </div>
            <FormInput autoComplete="email" disabled={emailIsValid ?? isSubmitting} inputMode="email" />
         </FormField>
         {emailIsValid === true ? (
            <FormField name="password">
               <div className="flex items-center gap-2">
                  <FormLabel>Password</FormLabel>
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
         ) : null}
         <div className="flex w-full flex-col items-center gap-2 sm:flex-row-reverse">
            <Button disabled={isSubmitting} type="submit" className="relative w-full grow gap-2" size="lg">
               <span>{emailIsValid ? "Sign in" : "Next"}</span>
               {isSubmitting ? (
                  <span className="absolute inset-0 flex h-full w-full items-center justify-center rounded-[inherit] bg-[inherit]">
                     <Loader2 className="size-4 shrink-0 animate-spin" />
                  </span>
               ) : null}
            </Button>
            {emailIsValid ? (
               <Button
                  intent="ghost"
                  size="lg"
                  disabled={isSubmitting}
                  className="shrink-0 max-sm:w-full"
                  onClick={() => {
                     instance.setValue("password", undefined);
                     setEmailIsValid(null);
                  }}>
                  Back
               </Button>
            ) : null}
         </div>
      </Form>
   );
};

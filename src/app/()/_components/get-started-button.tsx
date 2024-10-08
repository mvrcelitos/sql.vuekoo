"use client";

import Link from "next/link";
import { toast } from "sonner";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const GetStartedButton = ({ className }: { className?: string }) => {
   return (
      <Link
         href="/help"
         onClick={(ev) => {
            ev.preventDefault();
            toast("Not implemented yet.");
         }}
         className={cn(
            buttonVariants({ intent: "primary", size: "lg" }),
            "rounded-full dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,.05)]",
            className,
         )}>
         Get started
      </Link>
   );
};

"use client";

import Link from "next/link";
import { toast } from "sonner";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const HelpButton = () => {
   return (
      <Link
         href="/help"
         onClick={(ev) => {
            ev.preventDefault();
            toast("Not implemented yet.");
         }}
         className={cn(buttonVariants({ intent: "main", size: "lg" }), "rounded-full")}>
         Get started
      </Link>
   );
};

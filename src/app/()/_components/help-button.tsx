"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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

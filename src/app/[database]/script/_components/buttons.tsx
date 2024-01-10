"use client";

import React from "react";
import { toast } from "sonner";
import { X, AlertCircle, ChevronRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScriptStore } from "./use-script-store";

export interface ClearButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
   textarea?: React.MutableRefObject<HTMLTextAreaElement>;
}

export const ClearButton = React.forwardRef<HTMLButtonElement, ClearButtonProps>(({ textarea, ...props }, ref) => {
   const { clear } = useScriptStore();

   return (
      <Button ref={ref} {...props} intent="outline" size="icon-sm" onClick={() => clear()}>
         <X className="size-4 shrink-0" height={16} width={16} />
      </Button>
   );
});
ClearButton.displayName = "ClearButton";

export interface SubmitButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {}

export const SubmitButton = React.forwardRef<HTMLButtonElement, SubmitButtonProps>(({ className, ...props }, ref) => {
   const { submitStatus, submit } = useScriptStore();
   return (
      <Button
         ref={ref}
         {...props}
         className={cn("group/button ml-auto", className)}
         intent="outline"
         size="icon-sm"
         disabled={submitStatus === "loading"}
         onClick={async () => {
            await submit();
         }}>
         {submitStatus === "idle" && (
            <div className="relative size-4 shrink-0">
               <ChevronRight
                  className="absolute inset-y-0 left-0 size-4 shrink-0 duration-150 group-hover/button:left-[4px]"
                  height={16}
                  width={16}
               />
               <div className="absolute right-[8px] top-1/2 h-px w-0 -translate-x-full -translate-y-1/2 bg-zinc-700 duration-150 group-hover/button:-right-[7px] group-hover/button:w-2.5 dark:bg-zinc-50" />
            </div>
         )}
         {submitStatus === "loading" && <Loader2 className="size-4 shrink-0 animate-spin" />}
      </Button>
   );
});
SubmitButton.displayName = "SubmitButton";

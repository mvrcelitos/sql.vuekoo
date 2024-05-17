import * as React from "react";

import { VariantProps, cva } from "cva";

import { cn } from "@/lib/utils";

export const inputVariants = cva({
   base: "appearance-none [-webkit-appearance:none] flex items-center max-w-full rounded-md text-sm bg-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 file:bg-transparent transition-colors",
   variants: {
      intent: {
         none: "",
         primary:
            "border border-zinc-400 dark:border-zinc-600 dark:text-zinc-200 ring-0 focus:ring-1 focus:border-primary ring-primary dark:focus:border-primary dark:focus:ring-primary",
         primary2:
            "border-transparent text-zinc-800 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-800 focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary",
         default:
            "border border-zinc-400 dark:border-zinc-600 dark:text-zinc-200 focus:ring-1 focus:border-zinc-700 focus:ring-zinc-700 dark:focus:ring-zinc-50 dark:focus:border-zinc-50",
         opaque: [
            "bg-zinc-300 enabled:hover:bg-zinc-400 focus:bg-zinc-50",
            "dark:bg-zinc-500 enabled:dark:hover:bg-zinc-400 enabled:dark:focus:bg-zinc-200",
            ,
         ],
      },
      size: {
         none: "",
         xs: "h-8 px-2",
         sm: "h-9 px-3",
         default: "h-10 py-2 px-3",
         lg: "h-11 py-3 px-4",
      },
   },
   defaultVariants: {
      intent: "primary",
      size: "default",
   },
});

export interface InputProps
   extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
      VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ intent, size, className, ...props }, ref) => {
   return <input ref={ref} className={cn(inputVariants({ intent, size, className }))} {...props} />;
});
Input.displayName = "Input";

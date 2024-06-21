import * as React from "react";
import { cva, VariantProps } from "cva";

import { cn } from "@/lib/utils";

const textAreaVariants = cva({
   base: "appearance-none min-h-[calc((20px*3)-2px)] h-[calc((20px*5)-2px)] py-2 [-webkit-appearance:none] flex items-center max-w-full px-3 rounded-md text-sm bg-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 file:bg-transparent transition-colors",
   variants: {
      intent: {
         none: "",
         primary:
            "border border-zinc-300 dark:border-zinc-700 dark:text-zinc-200 focus:ring-1 focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary",
         default:
            "border border-zinc-300 dark:border-zinc-700 dark:text-zinc-200 focus:ring-1 focus:border-zinc-700 focus:ring-zinc-700 dark:focus:ring-zinc-50 dark:focus:border-zinc-50",
         opaque: [
            "bg-zinc-300 enabled:hover:bg-zinc-400 focus:bg-zinc-50",
            "dark:bg-zinc-500 enabled:dark:hover:bg-zinc-400 enabled:dark:focus:bg-zinc-200",
            ,
         ],
      },
   },
   defaultVariants: {
      intent: "primary",
   },
});

export interface TextAreaProps
   extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      VariantProps<typeof textAreaVariants> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ intent, className, ...props }, ref) => {
   return <textarea ref={ref} className={cn(textAreaVariants({ intent }), className)} {...props} />;
});
TextArea.displayName = "TextArea";

export { TextArea, textAreaVariants };

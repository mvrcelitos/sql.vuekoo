import React from "react";
import { cva, VariantProps } from "cva";

import { cn } from "@/lib/utils";

export const separatorVariants = cva({
   base: "bg-zinc-200 dark:bg-zinc-800 border-0",
   variants: {
      orientation: {
         horizontal: "h-px w-full grow",
         vertical: "w-px h-full grow",
      },
   },
   defaultVariants: {
      orientation: "horizontal",
   },
});

export interface SeparatorProps extends VariantProps<typeof separatorVariants> {
   className?: string;
}

export const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
   ({ orientation, className }: SeparatorProps) => {
      return <hr className={cn(separatorVariants({ orientation, className }))} />;
   },
);

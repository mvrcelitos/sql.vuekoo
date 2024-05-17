import { VariantProps, cva } from "cva";

import React from "react";
import { cn } from "@/lib/utils";

export const separatorVariants = cva({
   base: "bg-zinc-200 dark:bg-zinc-800 border-0",
   variants: {
      orientation: {
         none: "",
         horizontal: "h-px max-h-px w-full grow",
         vertical: "w-px max-w-px h-full grow",
      },
   },
   defaultVariants: {
      orientation: "horizontal",
   },
});

export interface SeparatorProps extends VariantProps<typeof separatorVariants> {
   className?: string;
}

const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
   ({ orientation, className, ...props }: SeparatorProps, ref) => {
      return (
         <hr
            ref={ref}
            className={cn(separatorVariants({ orientation, className }))}
            {...props}
            data-orientation={orientation}
         />
      );
   },
);
Separator.displayName = "Separator";

export { Separator };

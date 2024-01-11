import React from "react";
import { cva, VariantProps } from "cva";

import { cn } from "@/lib/utils";

export const Center = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
   ({ className, ...props }, ref) => {
      return (
         <div ref={ref} className={cn("flex items-center justify-center overflow-hidden p-1", className)} {...props} />
      );
   },
);
Center.displayName = "Center";

export const flexVariants = cva({
   base: "flex overflow-hidden",
   variants: {
      orientation: {
         horizontal: "flex-row w-full",
         vertical: "flex-col h-full",
      },
   },
   defaultVariants: {
      orientation: "horizontal",
   },
});

export interface FlexProps extends React.ComponentPropsWithoutRef<"div">, VariantProps<typeof flexVariants> {}

export const FlexDiv = React.forwardRef<HTMLDivElement, FlexProps>(({ className, orientation, ...props }, ref) => {
   return (
      <div data-orientation={orientation} ref={ref} className={flexVariants({ orientation, className })} {...props} />
   );
});
FlexDiv.displayName = "FlexDiv";

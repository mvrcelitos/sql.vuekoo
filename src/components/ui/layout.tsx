import React from "react";
import { cva, VariantProps } from "cva";


export const flexDivVariants = cva({
   base: "flex overflow-hidden",
   variants: {
      orientation: {
         horizontal: "flex-row w-full",
         vertical: "flex-col h-full",
         center: "items-center justify-center",
      },
   },
   defaultVariants: {
      orientation: "horizontal",
   },
});

export interface FlexDivProps extends React.ComponentPropsWithoutRef<"div">, VariantProps<typeof flexDivVariants> {}

export const FlexDiv = React.forwardRef<HTMLDivElement, FlexDivProps>(({ className, orientation, ...props }, ref) => {
   return (
      <div
         data-orientation={orientation}
         ref={ref}
         className={flexDivVariants({ orientation, className })}
         {...props}
      />
   );
});
FlexDiv.displayName = "FlexDiv";

export const gridDivVariants = cva({
   base: "grid overflow-hidden",
   variants: {
      orientation: {
         horizontal: "grid-rows-1 auto-cols-auto w-full",
         vertical: "grid-cols-1 auto-rows-auto h-full",
      },
   },
   defaultVariants: {
      orientation: "horizontal",
   },
});

export interface GridDivProps extends React.ComponentPropsWithoutRef<"div">, VariantProps<typeof flexDivVariants> {}

export const GridDiv = React.forwardRef<HTMLDivElement, FlexDivProps>(({ className, orientation, ...props }, ref) => {
   return (
      <div
         data-orientation={orientation}
         ref={ref}
         className={flexDivVariants({ orientation, className })}
         {...props}
      />
   );
});
GridDiv.displayName = "GridDiv";

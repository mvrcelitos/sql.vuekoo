import React from "react";
import { cva, VariantProps } from "cva";

import { cn } from "@/lib/utils";

export const flexDivVariants = cva({
   base: "flex flex-initial overflow-hidden",
   variants: {
      orientation: {
         horizontal: "flex-row w-full",
         vertical: "flex-col h-full",
         center: "items-center justify-center w-full h-full",
      },
   },
   defaultVariants: {
      orientation: "horizontal",
   },
});

export interface FlexDivProps extends React.ComponentPropsWithoutRef<"div">, VariantProps<typeof flexDivVariants> {
   child?: "main" | "div" | "section" | "article" | "aside" | "header" | "footer" | "nav";
}

export const Flex = React.forwardRef<HTMLDivElement, FlexDivProps>(
   ({ className, orientation, child, ...props }, ref) => {
      const Comp = child ?? "div";
      return (
         <Comp
            data-orientation={orientation}
            ref={ref}
            className={cn(flexDivVariants({ orientation }), className)}
            {...props}
         />
      );
   },
);
Flex.displayName = "FlexDiv";

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

export interface GridDivProps extends React.ComponentPropsWithoutRef<"div">, VariantProps<typeof gridDivVariants> {
   child?: "main" | "div" | "section" | "article" | "aside" | "header" | "footer" | "nav";
}

export const GridDiv = React.forwardRef<HTMLDivElement, GridDivProps>(
   ({ className, orientation, child, ...props }, ref) => {
      const Comp = child ?? "div";
      return (
         <Comp
            data-orientation={orientation}
            ref={ref}
            className={cn(gridDivVariants({ orientation }), className)}
            {...props}
         />
      );
   },
);
GridDiv.displayName = "GridDiv";

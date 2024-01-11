import { cn } from "@/lib/utils";
import { VariantProps, cva } from "cva";
import React from "react";

export const Center = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
   ({ className, ...props }, ref) => {
      return (
         <div ref={ref} className={cn("flex items-center justify-center overflow-hidden p-1", className)} {...props} />
      );
   },
);

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

export const Column = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
   ({ className, ...props }, ref) => {
      return <div ref={ref} className={cn("flex flex-col overflow-hidden", className)} {...props} />;
   },
);

export const Row = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
   ({ className, ...props }, ref) => {
      return <div ref={ref} className={cn("flex items-center overflow-hidden", className)} {...props} />;
   },
);

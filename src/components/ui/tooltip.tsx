"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";

import { cn } from "@/lib/utils";

// const TooltipProvider = TooltipPrimitive.Provider;
const TooltipProvider = ({ ...props }: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>) => (
   <TooltipPrimitive.Provider delayDuration={100} disableHoverableContent={true} {...props} />
);

const TooltipRoot = TooltipPrimitive.Root;

const Tooltip = (props: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>) => {
   return (
      <TooltipProvider>
         <TooltipPrimitive.Root {...props} />
      </TooltipProvider>
   );
};

// const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipTrigger = React.forwardRef<
   React.ElementRef<typeof TooltipPrimitive.Trigger>,
   React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ className, ...props }, ref) => (
   <TooltipPrimitive.Trigger
      type="button"
      ref={ref}
      className={cn(className)}
      {...props}
      onClick={(ev) => ev.preventDefault()}
   />
));
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName;

const TooltipContent = React.forwardRef<
   React.ElementRef<typeof TooltipPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, children, ...props }, ref) => (
   <TooltipPrimitive.Content
      collisionPadding={4}
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
         "z-50 overflow-hidden rounded-md border bg-zinc-950 px-3 py-1.5 text-xs text-zinc-200 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:bg-zinc-50 dark:text-zinc-700",
         className,
      )}
      {...props}>
      {children}
   </TooltipPrimitive.Content>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const TooltipReady = ({ children }: React.PropsWithChildren) => (
   <Tooltip>
      <TooltipTrigger className="group/tooltip focus-within:outline-0 focus:outline-0 focus-visible:outline-0">
         <Info
            className="aspect-square h-4 w-4 shrink-0 text-zinc-700 group-hover/tooltip:fill-zinc-200 group-focus/tooltip:fill-zinc-200 group-focus/tooltip:text-zinc-950 dark:text-zinc-200 dark:group-hover/tooltip:fill-zinc-800 dark:group-focus/tooltip:fill-zinc-800 dark:group-focus/tooltip:text-zinc-50"
            height={16}
            width={16}
         />
      </TooltipTrigger>
      <TooltipContent>{children}</TooltipContent>
   </Tooltip>
);

export { Tooltip, TooltipContent, TooltipProvider, TooltipReady, TooltipRoot, TooltipTrigger };

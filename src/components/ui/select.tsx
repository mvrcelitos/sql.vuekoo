"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cva, VariantProps } from "cva";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const selectVariants = cva({
   base: "appearance-none [-webkit-appearance:none] flex h-10 w-full items-center justify-between text-sm rounded-md border-300-400 dark:border-zinc-700 focus-visible:outline-none transition-colors",
   variants: {
      intent: {
         none: "",
         primary:
            "border border-zinc-300 dark:border-zinc-700 dark:text-zinc-200 focus:ring-1 dark:focus:border-primary-active focus:border-primary-active focus:ring-primary-active dark:focus:ring-primary-active",
         default:
            "border border-zinc-300 dark:border-zinc-700 dark:text-zinc-200 focus:ring-1 focus:border-zinc-700 focus:ring-zinc-700 dark:focus:ring-zinc-50 dark:focus:border-zinc-50",
      },
      size: {
         xs: "h-8 px-2",
         sm: "h-9 px-3",
         default: "h-10 py-2 px-3",
         lg: "h-11 py-3 px-4",
      },
   },
   defaultVariants: {
      intent: "default",
      size: "default",
   },
});

const SelectTrigger = React.forwardRef<
   React.ElementRef<typeof SelectPrimitive.Trigger>,
   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & VariantProps<typeof selectVariants>
>(({ className, children, intent, ...props }, ref) => (
   <SelectPrimitive.Trigger ref={ref} className={cn(selectVariants({ intent, className }))} {...props}>
      {children}
      <SelectPrimitive.Icon asChild>
         <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
   </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
   React.ElementRef<typeof SelectPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
   <SelectPrimitive.Portal>
      <SelectPrimitive.Content
         ref={ref}
         className={cn(
            "relative z-50 min-w-[8rem] overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50 text-zinc-500 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-zinc-900 dark:bg-zinc-950 dark:text-zinc-400",
            position === "popper" &&
               "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            className,
         )}
         position={position}
         {...props}>
         <SelectPrimitive.Viewport
            className={cn(
               "p-1",
               position === "popper" &&
                  "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
            )}>
            {children}
         </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
   </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
   React.ElementRef<typeof SelectPrimitive.Label>,
   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
   <SelectPrimitive.Label ref={ref} className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
   React.ElementRef<typeof SelectPrimitive.Item>,
   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
   <SelectPrimitive.Item
      ref={ref}
      className={cn(
         "relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm text-zinc-500 outline-none focus:bg-zinc-200 focus:text-zinc-800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:text-zinc-400 dark:focus:bg-zinc-800 dark:focus:text-zinc-200",
         className,
      )}
      {...props}>
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
         <SelectPrimitive.ItemIndicator>
            <Check className="h-3.5 w-3.5" />
         </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
   </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
   React.ElementRef<typeof SelectPrimitive.Separator>,
   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
   <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-zinc-200", className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue };

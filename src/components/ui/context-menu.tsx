"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "cva";

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
      inset?: boolean;
   }
>(({ className, inset, children, ...props }, ref) => (
   <ContextMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
         "focus:text-accent-foreground data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
         inset && "pl-8",
         className,
      )}
      {...props}>
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
   </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
   <ContextMenuPrimitive.SubContent
      ref={ref}
      className={cn(
         "bg-popover text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
         className,
      )}
      {...props}
   />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
   <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
         ref={ref}
         className={cn(
            "z-50 min-w-[8rem] overflow-hidden rounded-lg border border-zinc-300 bg-background p-1 text-foreground shadow-vercel-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-zinc-800",
            className,
         )}
         {...props}
      />
   </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

export const contextMenuItemsVariants = cva({
   base: "relative flex cursor-default select-none items-center rounded first:rounded-t-md last:rounded-b-md px-2 py-1 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
   variants: {
      intent: {
         default: "focus:bg-zinc-200 focus:text-zinc-950 dark:focus:bg-zinc-800 dark:focus:text-zinc-50",
         primary: "focus:bg-primary focus:text-zinc-50 dark:focus:bg-primary dark:focus:text-zinc-50",
         warning: "focus:bg-yellow-400 focus:text-amber-900 dark:focus:bg-yellow-700 dark:focus:text-orange-50",
         danger:
            "text-red-500 focus:bg-red-200 focus:text-rose-600 dark:text-red-400 dark:focus:bg-rose-950 dark:focus:text-red-300",
      },
   },
   defaultVariants: {
      intent: "primary",
   },
});

const ContextMenuItem = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.Item>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & VariantProps<typeof contextMenuItemsVariants> & {}
>(({ intent, className, ...props }, ref) => (
   <ContextMenuPrimitive.Item ref={ref} className={cn(contextMenuItemsVariants({ intent }), className)} {...props} />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
   <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
         "focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
         className,
      )}
      checked={checked}
      {...props}>
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
         <ContextMenuPrimitive.ItemIndicator>
            <Check className="h-4 w-4" />
         </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
   </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
   <ContextMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
         "focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
         className,
      )}
      {...props}>
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
         <ContextMenuPrimitive.ItemIndicator>
            <Circle className="h-2 w-2 fill-current" />
         </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
   </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.Label>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
      inset?: boolean;
   }
>(({ className, inset, ...props }, ref) => (
   <ContextMenuPrimitive.Label
      ref={ref}
      className={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)}
      {...props}
   />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
   React.ElementRef<typeof ContextMenuPrimitive.Separator>,
   React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator> & { orientation?: "horizontal" | "vertical" }
>(({ className, orientation = "horizontal", ...props }, ref) => (
   <ContextMenuPrimitive.Separator
      ref={ref}
      className={cn(
         "bg-muted",
         orientation === "horizontal" ? "-mx-1 my-1 h-px max-h-px" : "-my-1 mx-1 w-px max-w-px",
         className,
      )}
      {...props}
   />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
   return <span className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)} {...props} />;
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
   ContextMenu,
   ContextMenuCheckboxItem,
   ContextMenuContent,
   ContextMenuGroup,
   ContextMenuItem,
   ContextMenuLabel,
   ContextMenuPortal,
   ContextMenuRadioGroup,
   ContextMenuRadioItem,
   ContextMenuSeparator,
   ContextMenuShortcut,
   ContextMenuSub,
   ContextMenuSubContent,
   ContextMenuSubTrigger,
   ContextMenuTrigger,
};

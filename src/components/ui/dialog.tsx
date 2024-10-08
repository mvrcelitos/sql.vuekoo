"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
   React.ElementRef<typeof DialogPrimitive.Overlay>,
   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
   <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
         "fixed inset-0 z-[101] bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-black/40",
         className,
      )}
      {...props}
   />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
   React.ElementRef<typeof DialogPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { close?: boolean }
>(({ close = true, className, children, ...props }, ref) => {
   const DialogClose = motion(DialogPrimitive.Close);
   return (
      <DialogPortal>
         <DialogOverlay />
         <DialogPrimitive.Content
            ref={ref}
            className={cn(
               "fixed left-[50%] top-[50%] z-[101] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl border border-muted bg-background duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
               className,
            )}
            {...props}>
            {children}
            <AnimatePresence initial={false}>
               {close ? (
                  <DialogClose
                     transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                     disabled={!close}
                     initial={{ opacity: 0, transform: "scale(0)" }}
                     animate={{ opacity: 1, transform: "scale(1)" }}
                     exit={{ opacity: 0 }}
                     className="absolute right-3 top-3 rounded-md bg-transparent p-2 text-500 !outline-none transition-colors disabled:pointer-events-none hocus:bg-muted hocus:text-700">
                     <X className="h-4 w-4" />
                     <span className="sr-only">Close</span>
                  </DialogClose>
               ) : null}
            </AnimatePresence>
         </DialogPrimitive.Content>
      </DialogPortal>
   );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
   <div
      className={cn("flex flex-col border-b border-muted px-4 py-5 text-center sm:text-left", className)}
      {...props}
   />
);
DialogHeader.displayName = "DialogHeader";

const DialogBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
   <div className={cn("bg-background px-4 py-2", className)} {...props} />
);

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
   <div
      className={cn(
         "flex items-center justify-between gap-2 rounded-b-xl border-t border-muted bg-accent px-4 py-3 [&>button]:!highlight-0",
         className,
      )}
      {...props}
   />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
   React.ElementRef<typeof DialogPrimitive.Title>,
   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
   <DialogPrimitive.Title
      ref={ref}
      {...props}
      className={cn("text-base font-medium leading-none tracking-tight text-foreground", className)}
   />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
   React.ElementRef<typeof DialogPrimitive.Description>,
   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
   <DialogPrimitive.Description ref={ref} className={cn("text-sm text-500", className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
   Dialog,
   DialogBody,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogOverlay,
   DialogPortal,
   DialogTitle,
   DialogTrigger,
};

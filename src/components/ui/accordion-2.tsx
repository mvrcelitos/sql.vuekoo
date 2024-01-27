"use client";

import React from "react";
import { useContext } from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const AccordionContext = React.createContext({});

const Accordion = ({ ...props }: { children: React.ReactNode }) => {
   return <AccordionContext.Provider value={{}} {...props} />;
};

export interface AccordionItemProps {
   value: string;
   open?: boolean;
   onOpenChange?: (open: boolean) => Promise<void> | void;
   orientation?: "vertical" | "horizontal";
}

const AccordionItemContext = React.createContext({} as AccordionItemProps);
const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps & React.ComponentPropsWithoutRef<"div">>(
   ({ orientation, value, open: defOpen, onOpenChange, ...props }, ref) => {
      const isAlreadyStarted = React.useRef<boolean>(false);
      const [open, setOpen] = React.useState<boolean>(defOpen ?? false);

      React.useEffect(() => {
         if (!isAlreadyStarted.current) {
            isAlreadyStarted.current = true;
            return;
         }
         if (typeof defOpen !== "boolean") return;
         setOpen(defOpen);
      }, [defOpen]);

      return (
         <AccordionItemContext.Provider
            value={{
               value,
               open: open ?? false,
               onOpenChange: (open: boolean) => {
                  setOpen(open);
                  onOpenChange?.(open);
               },
            }}>
            <div ref={ref} {...props} data-state={open ? "open" : "closed"} data-orientation={orientation} />
         </AccordionItemContext.Provider>
      );
   },
);
AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps {
   asChild?: boolean;
   onSelect?: (
      ev: React.MouseEvent<HTMLElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
   ) => Promise<void> | void;
}
const AccordionTrigger = React.forwardRef<
   HTMLButtonElement,
   AccordionTriggerProps & React.ComponentPropsWithoutRef<"button">
>(({ asChild, onSelect, className, ...props }, ref) => {
   const { value, open, onOpenChange } = useContext(AccordionItemContext);
   const Comp = asChild ? Slot : "button";
   return (
      <Comp
         {...props}
         data-state={open ? "open" : "closed"}
         className={cn("flex items-center justify-between font-medium transition-all", className)}
         onClick={async (ev) => {
            await onSelect?.(ev);
            if (ev.isDefaultPrevented()) return;
            await onOpenChange?.(!open);
         }}
      />
   );
});
AccordionTrigger.displayName = "AccordionTrigger";

export interface AccordionContentProps {
   asChild?: boolean;
   forceMount?: boolean;
}

const AccordionContent = React.forwardRef<
   HTMLDivElement,
   AccordionContentProps & React.ComponentPropsWithoutRef<"div">
>(({ asChild, forceMount, className, ...props }, ref) => {
   const { open } = useContext(AccordionItemContext);
   if (!open && !forceMount) return null;

   const Comp = asChild ? Slot : "div";
   return <Comp ref={ref} {...props} className={cn(!open && "hidden", className)} hidden={!open} />;
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };

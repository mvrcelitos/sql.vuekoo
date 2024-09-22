import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "cva";

import { cn } from "@/lib/utils";

export const buttonVariants = cva({
   base: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
   variants: {
      intent: {
         none: "",
         main: "bg-primary text-zinc-50 ring-0 ring-offset-0 hocus:bg-primaryActive ring-offset-background focus-visible:ring-offset-2 ring-primary/30 focus-visible:ring-2 ",
         primary: [
            "bg-primary hover:bg-primaryActive active:bg-primaryActive text-zinc-100 hover:text-zinc-50 active:text-zinc-50",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-primary/70",
         ],
         secondary: [
            "bg-secondary hover:bg-secondary-active active:bg-secondary-active text-zinc-900 hover:text-zinc-950 active:text-zinc-950",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-secondary/70",
         ],
         grayscale: [
            "bg-c800 hover:bg-foreground active:bg-foreground text-muted hover:text-background active:text-background",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-c500",
         ],
         discrete: [
            "bg-muted hover:bg-c800 focus-visible:bg-c800 text-c800 hover:text-background focus-visible:text-background",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-muted",
         ],
         ghost: [
            "bg-transparent hover:bg-muted focus-visible:bg-muted text-c500 hover:text-c800",
            "dark:hover:highlight-5 dark:focus-visible:highlight-5",
         ],
         success: [
            "bg-emerald-500 hover:bg-teal-600 active:bg-teal-600",
            "text-zinc-100 hover:text-zinc-50 active:text-zinc-50",
            "focus-visible:outline-emerald-500/50",
         ],
         destructive: [
            "bg-red-500 hover:bg-rose-600 active:bg-rose-600",
            "dark:bg-red-600 dark:hover:bg-rose-700 dark:active:bg-rose-700",
            "text-zinc-100 hover:text-zinc-50 active:text-zinc-50",
            "focus-visible:outline-red-500/50 dark:focus-visible:outline-red-600/50",
         ],
         opaque: ["bg-muted hover:bg-c300 active:bg-c300 text-c700 hover:text-c800 active:text-c800"],
         outline: [
            "bg-background border border-c300",
            "hover:bg-muted active:bg-muted",
            "text-c700 hover:text-c900 active:text-c900",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-800",
            "hover:shadow-vercel-lg focus-visible::shadow-[0px_1px_1px_rgb(0,0,0,.02),0px_4px_8px_-4px_rgba(0,0,0,.04),0px_16px_24px_-8px_rgba(0,0,0,.06)] transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow]",
         ],
         outline2: [
            "bg-background border-2 border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400",
            "hocus:bg-zinc-300 dark:hocus:bg-zinc-700 hocus:text-zinc-950 dark:hocus:text-zinc-50",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-800",
         ],
         outline3: [
            "bg-background border-2 border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400",
            "hocus:bg-foreground hocus:!text-background hocus:!border-foreground",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-800",
         ],
         link: [
            "bg-transparent text-primary hocus:underline focus-visible:text-zinc-800 dark:focus-visible:text-zinc-200 underline-offset-4",
         ],
      },
      size: {
         "none": "",
         "alt": "h-6 px-2",
         "xxs": "h-7 px-1.5",
         "xs": "h-8 px-2",
         "sm": "h-9 px-3",
         "md": "h-10 px-4",
         "lg": "h-11 px-6",
         "icon-xxs": "size-7 px-0 shrink-0",
         "icon-xs": "size-8 px-0 shrink-0",
         "icon-sm": "size-9 px-0 shrink-0",
         "icon": "size-10 px-0 shrink-0",
      },
   },
   defaultVariants: {
      intent: "primary",
      size: "md",
   },
});

export interface ButtonProps
   extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size">,
      VariantProps<typeof buttonVariants> {
   asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
   ({ asChild, intent, size, className, ...props }, ref) => {
      const Comp: any = asChild ? Slot : "button";
      return (
         <Comp
            type="button"
            aria-disabled={props?.disabled}
            className={cn(buttonVariants({ intent, size, className }))}
            ref={ref}
            {...props}
         />
      );
   },
);
Button.displayName = "Button";

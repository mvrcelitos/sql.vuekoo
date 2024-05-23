"use client";

import * as React from "react";
import { cva } from "cva";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input, type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const inputPasswordVariants = cva({
   base: "relative rounded-md focus-within:ring-1 border border-zinc-300 dark:border-zinc-700",
   variants: {
      intent: {
         none: "",
         opaque: "",
         primary:
            "dark:focus-within:border-primary focus-within:border-primary focus-within:ring-primary dark:focus-within:ring-primary",
         primary2:
            "border-transparent text-zinc-800 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-800 focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary",
         default:
            "focus-within:border-zinc-700 focus-within:ring-zinc-700 dark:focus-within:ring-zinc-50 dark:focus-within:border-zinc-50",
      },
   },
   defaultVariants: {
      intent: "default",
   },
});

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(({ className, intent, ...props }, ref) => {
   const [type, setType] = React.useState<"password" | "text">("password");
   const ButtonIcon = type === "password" ? Eye : EyeOff;

   return (
      <div className={inputPasswordVariants({ intent })}>
         <Input
            className={cn(className, "h-[38px] w-full border-0 focus:ring-0")}
            intent={intent}
            {...props}
            type={type}
            ref={ref}
         />
         <Button
            tabIndex={-1}
            type="button"
            size="icon"
            intent="ghost"
            onClick={() => setType((x) => (x === "password" ? "text" : "password"))}
            className="absolute right-1 top-1 h-8 w-8">
            <ButtonIcon className="aspect-square h-4 w-4 shrink-0" height={16} width={16} />
         </Button>
      </div>
   );
});
InputPassword.displayName = "InputPassword";

export { InputPassword, inputPasswordVariants };

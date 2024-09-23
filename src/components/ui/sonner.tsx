"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
   const { theme = "system" } = useTheme();

   return (
      <Sonner
         theme={theme as ToasterProps["theme"]}
         className="toaster group"
         toastOptions={{
            classNames: {
               toast: "group toast group-[.toaster]:rounded-xl group-[.toaster]:bg-primary dark:group-[.toaster]:bg-foreground group-[.toaster]:text-background group-[.toaster]:border-transparent",
               error: "group-[.toaster]:!bg-red-500 dark:group-[.toaster]:!bg-red-600 group-[.toaster]:!text-zinc-50",
               description: "group-[.toast]:text-muted",
               actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
               cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            },
         }}
         {...props}
      />
   );
};

export { Toaster };

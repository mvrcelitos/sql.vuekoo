"use client";

// import { appWindow } from "@tauri-apps/api/window";
import * as React from "react";
import { Minus, Square, X } from "lucide-react";

import { Button, ButtonProps } from "@/components/ui/button";

const MinimizeButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
   return (
      <Button
         intent="ghost"
         size="alt"
         className="aspect-square h-full rounded-none"
         onClick={() => {
            // appWindow.minimize();
         }}
         ref={ref}>
         <Minus className="aspect-square h-4 w-4 shrink-0" height={16} width={16} />
      </Button>
   );
});
MinimizeButton.displayName = "MinimizeButton";

const MaximizeButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
   return (
      <Button
         intent="ghost"
         size="alt"
         className="aspect-square h-full rounded-none"
         onClick={() => {
            // appWindow.toggleMaximize();
         }}
         ref={ref}>
         <Square className="aspect-square h-4 w-4 shrink-0" height={16} width={16} />
      </Button>
   );
});
MaximizeButton.displayName = "MaximizeButton";

const CloseButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
   return (
      <Button
         intent="ghost"
         size="alt"
         className="aspect-square h-full rounded-none hover:bg-red-200 hover:text-rose-600 focus-visible:bg-red-200 focus-visible:text-rose-600 dark:hover:bg-red-700 dark:hover:text-rose-100 dark:focus-visible:bg-red-700 dark:focus-visible:text-rose-100"
         onClick={() => {
            // appWindow.close();
         }}
         ref={ref}>
         <X className="aspect-square h-4 w-4 shrink-0" height={16} width={16} />
      </Button>
   );
});
CloseButton.displayName = "CloseButton";

export { CloseButton,MaximizeButton, MinimizeButton };

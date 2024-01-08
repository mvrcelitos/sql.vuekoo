import * as React from "react";

import { cn } from "@/lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
   required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, children, required, ...props }, ref) => {
   return (
      <label
         aria-required={required}
         className={cn("text-sm font-medium text-zinc-700 dark:text-zinc-300", className)}
         {...props}
         ref={ref}>
         {children}
         {required && <span className="text-red-500 dark:text-red-600">*</span>}
      </label>
   );
});
Label.displayName = "Label";

export { Label };

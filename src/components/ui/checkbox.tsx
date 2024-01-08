import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => {
   return (
      <div className="relative aspect-square h-[18px] w-[18px] shrink-0">
         <input
            ref={ref}
            type="checkbox"
            className={cn(
               "peer absolute inset-0 appearance-none rounded-md border border-zinc-400 outline-2 outline-zinc-800 duration-100 checked:border-zinc-700 checked:bg-zinc-700 focus-visible:outline-2 enabled:hover:border-zinc-800 enabled:focus-visible:outline enabled:focus-visible:outline-offset-2 enabled:focus-visible:outline-zinc-400 disabled:opacity-50 dark:border-zinc-600 dark:checked:border-zinc-100 dark:checked:bg-zinc-100 dark:enabled:hover:border-zinc-50 dark:enabled:focus-visible:outline-zinc-500",
               className,
            )}
            onClick={(ev) => {
               if (props.readOnly) {
                  ev.stopPropagation();
                  ev.preventDefault();
                  return false;
               }
            }}
            {...props}
         />
         <div className="ease-[cubic-bezier(.18,.89,.32,1.28)] pointer-events-none absolute inset-0 grid scale-0 grid-cols-1 place-items-center rounded-full duration-200 peer-checked:scale-100">
            <Check className="aspect-square h-3 w-3 shrink-0 text-zinc-50 dark:text-zinc-900" height={12} width={12} />
         </div>
      </div>
   );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };

import * as React from "react";

import { cn } from "@/lib/utils";

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({ className, ...props }, ref) => {
   return (
      <div className="relative aspect-square h-[18px] w-[18px] shrink-0">
         <input
            ref={ref}
            type="radio"
            className={cn(
               "peer absolute inset-0 appearance-none rounded-full border border-zinc-400 outline-2 outline-zinc-800 duration-100 focus-visible:outline-2 enabled:hover:border-zinc-800 enabled:focus-visible:outline enabled:focus-visible:outline-offset-2 enabled:focus-visible:outline-zinc-400 disabled:opacity-50 dark:border-zinc-600 dark:enabled:hover:border-zinc-50 dark:enabled:focus-visible:outline-zinc-500",
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
         <div className="ease-[cubic-bezier(.18,.89,.32,1.28)] pointer-events-none absolute inset-1 scale-0 rounded-full duration-100 peer-checked:scale-100 peer-checked:bg-zinc-700 dark:peer-checked:bg-zinc-100" />
      </div>
   );
});
Radio.displayName = "Radio";

export { Radio };

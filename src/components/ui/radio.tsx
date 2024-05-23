import * as React from "react";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({ className, ...props }, ref) => {
   const input = React.useRef<HTMLInputElement | null>(null);
   return (
      <div className="relative aspect-square h-[18px] w-[18px] shrink-0">
         <input
            {...props}
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
            ref={(node, ...props) => {
               input.current = node;
               // @ts-expect-error
               ref?.(node, ...props);
            }}
         />
         <AnimatePresence initial={false}>
            {input?.current?.checked ? (
               <motion.span
                  initial={{ inset: "18px" }}
                  animate={{ inset: "4px" }}
                  exit={{ inset: "18px" }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                  className="pointer-events-none absolute block rounded-full bg-foreground"
               />
            ) : null}
         </AnimatePresence>
         {/* <div className="ease-[cubic-bezier(.18,.89,.32,1.28)] pointer-events-none absolute inset-1 scale-0 rounded-full duration-100 peer-checked:scale-100 peer-checked:bg-zinc-700 dark:peer-checked:bg-zinc-100" /> */}
      </div>
   );
});
Radio.displayName = "Radio";

export { Radio };

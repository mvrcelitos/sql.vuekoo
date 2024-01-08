"use client";

import { AlertCircle, ChevronRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export interface SubmitButtonProps {
   textarea?: React.MutableRefObject<HTMLTextAreaElement>;
}

export const SubmitButton = ({ textarea }: SubmitButtonProps) => {
   return (
      <Button
         intent="outline"
         size="icon-sm"
         className="group/button ml-auto"
         onClick={() => {
            toast.custom(
               (t) => (
                  <div className="flex items-center gap-2 rounded-lg bg-red-500 p-4 dark:bg-red-600">
                     <div data-icon>
                        <AlertCircle className="h-5 w-5 shrink-0 text-foreground" height={20} width={20} />
                     </div>
                     <div data-content>
                        <div data-title>Ooopss!</div>
                        <div data-description style={{ opacity: "0.7" }}>
                           Function not implemented yet
                        </div>
                     </div>
                  </div>
               ),
               { style: { width: "min(100%, calc(100vw - 32px))", fontSize: 13 } },
            );
            if (!textarea?.current) return;
            console.log(textarea.current.value);
         }}>
         <div className="relative h-4 w-4 shrink-0">
            <ChevronRight
               className="absolute inset-y-0 left-0 h-4 w-4 shrink-0 duration-150 group-hover/button:left-[4px]"
               height={16}
               width={16}
            />
            <div className="absolute right-[8px] top-1/2 h-px w-0 -translate-x-full -translate-y-1/2 bg-zinc-700 duration-150 group-hover/button:-right-[7px] group-hover/button:w-2.5 dark:bg-zinc-50" />
         </div>
      </Button>
   );
};

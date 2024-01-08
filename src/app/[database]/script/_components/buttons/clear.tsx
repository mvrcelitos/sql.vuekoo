"use client";

import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

export interface ClearButtonProps {
   textarea?: React.MutableRefObject<HTMLTextAreaElement>;
}

export const ClearButton = ({ textarea }: ClearButtonProps) => {
   const pathname = usePathname().split("?");
   const database = pathname?.[0].split("/")?.[1];

   return (
      <Button
         intent="outline"
         size="icon-sm"
         onClick={() => {
            if (!textarea?.current) return;
            textarea.current.value = "";
            window.localStorage.removeItem(`script-${database}`);
         }}>
         <X className="h-4 w-4 shrink-0" height={16} width={16} />
      </Button>
   );
};

"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { TextArea } from "@/components/ui/textarea";
import { useScriptStore } from "./use-script-store";
import { cn } from "@/lib/utils";

export const ScriptTextArea = () => {
   const { script, set, setDatabase, submit, result } = useScriptStore();

   const pathname = usePathname()?.split("?")?.[0];

   React.useEffect(() => {
      const database = pathname.split("?")?.[0].split("/")?.[1];
      const script = typeof window !== "undefined" && window?.localStorage?.getItem(`script-${database}`);
      database && setDatabase(database);
      script && set(script);
   }, [pathname]);

   return (
      <TextArea
         className={cn("w-full", result ? "h-[118px] min-h-[118px] md:h-[178px] md:min-h-[178px]" : "h-full grow")}
         intent="primary"
         value={script}
         autoCorrect="off"
         autoCapitalize="off"
         spellCheck="false"
         placeholder="Type your script here..."
         onChange={(ev) => set(ev.currentTarget.value)}
         // On press ctrl+enter, submit the script
         onKeyDown={(ev) => {
            if (ev.key === "Enter" && ev.ctrlKey) {
               ev.preventDefault();
               submit();
            }
         }}
      />
   );
};

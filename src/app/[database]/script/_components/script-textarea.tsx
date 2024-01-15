"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { TextArea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { useScriptStore } from "./use-script-store";

export const ScriptTextArea = () => {
   const { script, set, setDatabase, submit, result } = useScriptStore();

   const pathname = usePathname()?.split("?")?.[0];

   React.useEffect(() => {
      const database = pathname.split("?")?.[0].split("/")?.[1];
      const script = (typeof window !== "undefined" && window?.localStorage?.getItem(`script-${database}`)) || "";
      database && setDatabase(database);
      set(script);
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
            const start = ev.currentTarget.selectionStart;
            const end = ev.currentTarget.selectionEnd;

            if (ev.key === "ArrowUp" && ev.altKey) {
               ev.preventDefault();
               const text = ev.currentTarget.value;
               if (!text || start === 0) return;

               const sections = text?.split("\n\n");

               let startPos = 0;
               for (const i in sections) {
                  if (start > startPos + (sections[+i]?.length || 0)) {
                     startPos += (sections[+i]?.length || 0) + 2;
                     continue;
                  }
                  if (+i === 0) return;
                  if ((sections[+i - 1]?.length || 0) == 0) return;
                  startPos -= (sections[+i - 1]?.length || 0) + 2;
                  const endPos = startPos + (sections[+i - 1]?.length || 0);

                  ev.currentTarget.setSelectionRange(startPos, endPos);
                  return;
               }
            }

            if (ev.key === "ArrowDown" && ev.altKey) {
               ev.preventDefault();
               const text = ev.currentTarget.value;
               if (!text) return;

               const sections = text.split("\n\n");

               let startPos = 0;
               for (const i in sections) {
                  if (start >= startPos) {
                     startPos += sections[+i].length + 2;
                     continue;
                  }
                  if ((sections[+i]?.length || 0) === 0) continue;
                  const endPos = startPos + (sections[+i].length || 0);

                  ev.currentTarget.setSelectionRange(startPos, endPos);
                  return;
               }
            }

            if (ev.key === "Enter" && ev.ctrlKey) {
               ev.preventDefault();

               if (start !== end) {
                  const text = ev.currentTarget.value;
                  if (!text) return;
                  submit(text.slice(start, end));
               } else {
                  submit();
               }
            }
         }}
      />
   );
};

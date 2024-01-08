"use client";

import { usePathname } from "next/navigation";

import { TextArea } from "@/components/ui/textarea";

export const ScriptTextArea = () => {
   const pathname = usePathname().split("?");
   const database = pathname?.[0].split("/")?.[1];

   const defaultValue = window?.localStorage?.getItem(`script-${database}`) || "";

   return (
      <TextArea
         className="h-full w-full grow"
         intent="primary"
         defaultValue={defaultValue}
         onChange={(ev) => {
            if (typeof window === "undefined") return;
            const value = ev.currentTarget.value;
            window.localStorage.setItem(`script-${database}`, value);
         }}
      />
   );
};

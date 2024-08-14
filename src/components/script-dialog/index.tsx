"use client";

import { runScript } from "@/components/script-dialog/actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TextArea } from "@/components/ui/textarea";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useTransition } from "react";

export interface ScriptContextProps {
   script: string;
   setScript: (script: string) => void;
   scriptArr: string[];
   setScriptArr: (scriptArr: string[]) => void;

   setUuid: (uuid: string) => void;

   reset: () => void;
   append: (line: string) => void;
   update: (index: number, line: string) => void;
   remove: (index: number) => void;

   show: () => void;
   cancel: () => void;
}
export const ScriptContext = createContext<ScriptContextProps>({} as ScriptContextProps);

export const ScriptProvider = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
   const [open, setOpen] = useState(false);
   const [uuid, setUuid] = useState<string | null>(null);
   const [scriptArr, setScriptArr] = useState<string[]>([]);
   const [isPending, startTransition] = useTransition();
   const router = useRouter();

   const script = scriptArr?.length > 0 ? (scriptArr.join(";\n") + ";")?.replace(/;;/g, ";") : "";
   const setScript = (script: string) => setScriptArr(script.split("\n"));

   const append = (line: string) => setScriptArr((x) => [...x, line]);
   const update = (index: number, line: string) =>
      setScriptArr((x) => {
         x[index] = line;
         return x;
      });
   const remove = (index: number) => setScriptArr((x) => x.filter((_, i) => i !== index));
   const reset = () => setScriptArr([]);

   const show = () => setOpen(true);
   const cancel = () => {
      reset();
      setOpen(false);
   };

   return (
      <ScriptContext.Provider
         value={{
            script,
            setScript,
            scriptArr,
            setScriptArr,
            setUuid,

            append,
            update,
            remove,
            reset,

            show,
            cancel,
         }}
         {...props}>
         {children}
         <Dialog open={open} onOpenChange={(open) => (open ? undefined : setOpen(false))}>
            <DialogContent className="lg:max-w-3xl">
               <DialogHeader>
                  <DialogTitle>Script Editor</DialogTitle>
               </DialogHeader>
               <DialogBody>
                  <TextArea
                     readOnly
                     defaultValue={script}
                     className="modern-scroll w-full resize-none whitespace-pre"
                  />
               </DialogBody>
               <DialogFooter>
                  <Button intent="ghost" onClick={() => cancel()}>
                     Discard
                  </Button>
                  <Button
                     disabled={isPending}
                     intent="primary"
                     className="gap-2"
                     onClick={(ev) =>
                        startTransition(async () => {
                           const res = await runScript(uuid!, script);
                           if (!res) return;
                           setOpen(false);
                        })
                     }>
                     Run
                     {isPending ? (
                        <Loader2 className="size-4 shrink-0 animate-spin" />
                     ) : (
                        <ArrowRight className="size-4 shrink-0" />
                     )}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </ScriptContext.Provider>
   );
};

export const useScript = () => useContext(ScriptContext);

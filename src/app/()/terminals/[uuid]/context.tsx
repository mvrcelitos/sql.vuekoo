"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

import { DatabaseQueryReturn } from "@/lib/database";
import { tryCatch } from "@/lib/utils";

import { runScript } from "./actions";

interface Script {
   name: string;
   sql: string;
}

interface TerminalContextProps {
   scripts: Script[];
   saveScript: (script: Script) => boolean;
   saveCurrentScript: (sql: string) => void;

   isSubmitting: boolean;
   submit: (sql: string) => void;

   result?: Omit<DatabaseQueryReturn, "rowsCount">;
   clearResults: () => void;
   ref: React.MutableRefObject<HTMLTextAreaElement | null>;
}

const TerminalContext = createContext<TerminalContextProps>({} as TerminalContextProps);
export const useTerminalContext = () => useContext(TerminalContext);

const getTerminals = () =>
   tryCatch(
      () => JSON.parse(window.localStorage.getItem(`terminals`) ?? "{}") as Record<string, Script[]>,
      {} as Record<string, Script[]>,
   );

const currentScriptReservedName = "_";

export const TerminalProvider = ({ children }: { children?: React.ReactNode }) => {
   const ref = useRef<HTMLTextAreaElement | null>(null);
   const [scripts, setScripts] = useState<Script[]>([]);
   const [result, setResult] = useState<Omit<DatabaseQueryReturn, "rowsCount">>();
   const [isSubmitting, startTransition] = useTransition();

   const pathname = usePathname()?.split("?")?.[0];
   const uuid = pathname.split("/").pop();

   const submit = useCallback(
      (sql: string) => {
         setResult(undefined);
         if (!sql) return;
         startTransition(async () => {
            if (!uuid) return;
            const response = await runScript({ uuid, sql: sql });
            if (!response.ok) {
               toast.error("Error on running script");
               return;
            }
            setResult(response.result);
         });
      },
      [uuid],
   );

   const saveScript = useCallback(
      ({ name, sql }: Script) => {
         if (!uuid || !sql) return false;
         if (name === currentScriptReservedName) {
            toast.error("Name is reserved and can't be used");
            return false;
         }
         const terminals = getTerminals();
         if (terminals[uuid] && Array.isArray(terminals[uuid])) {
            const nameIsInUse = terminals[uuid].find((x) => x.name === name);
            if (nameIsInUse) {
               toast.error("Name is already in use");
               return false;
            }
            terminals[uuid].push({ name, sql });
         } else {
            terminals[uuid] = [{ name, sql }];
         }
         window.localStorage.setItem(`terminals`, JSON.stringify(terminals));
         setScripts(terminals[uuid]);
         return true;
      },
      [uuid],
   );

   const saveCurrentScript = useCallback(
      (sql: string) => {
         if (typeof window === "undefined" || !uuid || !ref?.current) return;
         const terminals = getTerminals();
         if (terminals?.[uuid] === undefined) terminals[uuid] = [];
         const exists = terminals?.[uuid].findIndex((x) => x.name === currentScriptReservedName);
         try {
            if (exists === -1) {
               terminals?.[uuid]?.push({ name: currentScriptReservedName, sql });
               window.localStorage.setItem(`terminals`, JSON.stringify(terminals));
               return;
            }
            terminals[uuid][exists].sql = sql;
            window.localStorage.setItem(`terminals`, JSON.stringify(terminals));
         } catch (error) {
            console.error(error);
         }
      },
      [uuid],
   );

   useEffect(() => {
      if (typeof window === "undefined" || !uuid) return;
      const terminals = getTerminals();
      if (ref.current)
         ref.current.value = terminals?.[uuid]?.find((x) => x.name === currentScriptReservedName)?.sql || "";
      setScripts(terminals?.[uuid!]?.filter((terminal) => terminal.name != currentScriptReservedName) || []);
   }, [uuid]);

   const clearResults = () => setResult(undefined);

   return (
      <TerminalContext.Provider
         value={{ scripts, saveScript, saveCurrentScript, submit, isSubmitting, result, clearResults, ref }}>
         {children}
      </TerminalContext.Provider>
   );
};

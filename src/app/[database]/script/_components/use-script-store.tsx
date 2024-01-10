"use client";

import axios from "axios";
import { AlertCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { create } from "zustand";

export interface ScriptStore {
   script: string;
   history: any[];
   result: Record<string, any> | null;

   database: string;
   setDatabase: (database: string) => void;

   set: (script: string) => void;
   undo: () => void;
   redo: () => void;
   clear: () => void;

   submitStatus: "idle" | "loading";
   submit: () => Promise<boolean>;
}

export interface UseScriptStoreProps {
   defaultScript?: string;
}

export const useScriptStore = create<ScriptStore>((set, get) => ({
   script: "",
   history: [],
   result: null,

   database: "",
   setDatabase: (database) => {
      set(() => ({ database }));
   },

   clear: () => {
      if (!get().database) return;
      set((state) => ({ script: "", history: [], result: null }));
      typeof window !== "undefined" && window?.localStorage?.removeItem(`script-${get().database}`);
   },
   set: (script) => {
      set(() => ({ script }));
      if (!get().database) return;
      window.localStorage.setItem(`script-${get().database}`, script);
   },
   undo: () => set((state) => ({ script: state.history.pop() })),
   redo: () => set((state) => ({ script: state.history.pop() })),

   submitStatus: "idle",
   submit: async () => {
      if (!get().database) return false;
      try {
         set(() => ({ submitStatus: "loading" }));
         const res = await axios.post(`/api/v1/databases/${get().database}`, get().script);
         console.log(res.data);
         set(() => ({ result: res.data, submitStatus: "idle" }));
         return true;
      } catch (err) {
         console.error(err);
         set(() => ({ result: null, submitStatus: "idle" }));
         toast.error("Ooopss!", {
            icon: <AlertCircle className="h-5 w-5 shrink-0 text-zinc-50" height={20} width={20} />,
            description: "An error occurred while executing the script.",
         });
         return false;
      }
   },
}));

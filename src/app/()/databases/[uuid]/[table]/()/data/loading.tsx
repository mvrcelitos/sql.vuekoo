import { Loader2 } from "lucide-react";

import { DataTableToolbar } from "@/components/data-table-toolbar";

export default function Loading() {
   return (
      <main className="flex flex-auto flex-col overflow-hidden border-t border-t-zinc-200 dark:border-t-zinc-800">
         <div className="flex shrink-0 grow items-center justify-center overflow-hidden">
            <Loader2 className="size-5 shrink-0 animate-spin" />
         </div>
         <DataTableToolbar rows={0} />
      </main>
   );
}

import { Loader2 } from "lucide-react";

export default function Loading() {
   return (
      <main className="flex h-full flex-auto flex-col items-center justify-center overflow-hidden border-t border-t-zinc-200 dark:border-t-zinc-800">
         <Loader2 className="shirnk-0 h-5 w-5 animate-spin" />
      </main>
   );
}

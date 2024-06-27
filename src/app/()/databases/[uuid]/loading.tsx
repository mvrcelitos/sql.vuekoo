import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function Page({ params }: { params: { uuid: string } }) {
   return (
      <main className="flex h-full w-full flex-initial flex-col items-center justify-center overflow-hidden p-4">
         <Loader2 className="size-5 shrink-0 animate-spin" />
      </main>
   );
}

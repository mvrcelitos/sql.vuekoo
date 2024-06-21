import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Page({ params }: { params: { uuid: string; table: string } }) {
   return (
      <main className="flex h-full w-full flex-initial flex-col items-center justify-center overflow-hidden p-4 text-foreground">
         <div className="flex max-w-md flex-col gap-2">
            <h1 className="text-center text-2xl font-bold md:text-3xl">👋 Hello one more time</h1>
            <div className="mb-2 flex flex-col gap-2">
               <p className="text-center text-sm opacity-80 md:text-base">Here are some of your options.</p>
            </div>
            <div className="flex items-center gap-2 sm:mb-2">
               <span className={cn("block h-0.5 w-12 bg-zinc-200  dark:bg-zinc-800")} />
               <span className={cn("block h-0.5 w-full grow bg-zinc-200 dark:bg-zinc-800")} />
               <span className={cn("block h-0.5 w-12 bg-zinc-200  dark:bg-zinc-800")} />
            </div>
            <div className="mx-auto mb-2 flex w-full max-w-xs flex-col gap-2">
               <Button intent="outline" className="grow" asChild>
                  <Link href={`/databases/${params.uuid}/${params.table}/properties`}>Properties</Link>
               </Button>
               <Button intent="outline" className="grow" asChild>
                  <Link href={`/databases/${params.uuid}/${params.table}/data`}>Data</Link>
               </Button>
            </div>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
               <div>Tables</div>
               <div>Views</div>
               <div>More...</div>
            </div> */}
         </div>
      </main>
   );
}
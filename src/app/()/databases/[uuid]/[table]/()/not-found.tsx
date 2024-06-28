import Link from "next/link";
import { Table2 } from "lucide-react";

import { cn } from "@/lib/utils";

export default async function NotFound() {
   const uuid = "";
   const data = { tables: [], views: [] };

   return (
      <main className="flex h-full w-full flex-initial flex-col items-center justify-center overflow-hidden p-4">
         <div className="flex max-w-md flex-col gap-2">
            <h1 className="animate-content-in text-center text-2xl font-bold text-foreground [--stagger:0] md:text-3xl">
               😣 Oops
            </h1>
            <div className="mb-2 flex flex-col gap-2">
               {/* <p className="text-center text-sm opacity-80 md:text-base">Here are some of your options.</p> */}
               <p className="animate-content-in text-center text-sm text-700 opacity-80 [--stagger:1] md:text-base">
                  The table you are looking apparently was not found.
               </p>
               <p className="animate-content-in text-center text-sm text-700 opacity-80 [--stagger:2] md:text-base">
                  But here are some of your available tables in your database that you can access instead.
               </p>
            </div>
            <div className="animate-content-in flex items-center gap-2 duration-500 [--stagger:3] sm:my-2">
               <span className={cn("block h-0.5 w-12 bg-zinc-200  dark:bg-zinc-800")} />
               <span className={cn("block h-0.5 w-full grow bg-zinc-200 dark:bg-zinc-800")} />
               <span className={cn("block h-0.5 w-12 bg-zinc-200  dark:bg-zinc-800")} />
            </div>
         </div>
         <div className="mt-2 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
            {/* <div className="flex flex-col gap-2 max-lg:hidden">
               <h2 className="animate-content-in px-2 text-sm font-semibold text-foreground [--stagger:3]">SQLs</h2>
               <div></div>
            </div> */}
            <div className="flex flex-col gap-2">
               <h2 className="animate-content-in px-2 text-sm font-semibold text-foreground [--stagger:3]">Tables</h2>
               <div>
                  {data?.tables?.slice(0, 10)?.map((table, index) => (
                     <Link
                        key={table}
                        href={`/databases/${uuid}/${table}/properties`}
                        className="animate-content-in flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-800 hocus:bg-muted hocus:text-foreground"
                        // @ts-ignore
                        style={{ "--stagger": 4 + index / 2 }}>
                        <Table2 className="size-4 shrink-0" />
                        <p className="text-sm ">{table}</p>
                     </Link>
                  ))}
                  {!data?.tables?.length && (
                     <p className="animate-content-in px-2 text-sm text-800 [--stagger:4]">No tables found</p>
                  )}
               </div>
            </div>
            <div className="flex flex-col gap-2">
               <h2 className="animate-content-in px-2 text-sm font-semibold text-foreground [--stagger:3]">Views</h2>
               <div>
                  {data?.views?.slice(0, 10)?.map((view, index) => (
                     <Link
                        key={view}
                        href={`/databases/${uuid}/${view}/properties`}
                        className="animate-content-in flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-800 hocus:bg-muted hocus:text-foreground"
                        // @ts-ignore
                        style={{ "--stagger": 4 + index / 2 }}>
                        <Table2 className="size-4 shrink-0" />
                        <p className="text-sm ">{view}</p>
                     </Link>
                  ))}
                  {!data?.views?.length && (
                     <p className="animate-content-in px-2 text-sm text-800 [--stagger:4]">No views found</p>
                  )}
               </div>
            </div>
         </div>
      </main>
   );
}

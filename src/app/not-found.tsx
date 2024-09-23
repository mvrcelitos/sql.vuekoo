import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export default function NotFound() {
   return (
      <main className="flex h-full w-full flex-initial flex-col items-center justify-center overflow-hidden p-4 text-foreground">
         <div className="flex max-w-md flex-col gap-2">
            <h1 className="animate-content-in text-center text-2xl font-bold text-foreground [--stagger:0] md:text-3xl">
               😣 Oops
            </h1>
            <div className="mb-2 flex flex-col gap-2">
               <p className="animate-content-in text-center text-sm text-700 opacity-80 [--stagger:1] md:text-base">
                  Looks like the page you are looking for was not found.
               </p>
            </div>
            <Separator className="animate-content-in [--stagger:2] sm:my-2" />
            <div className="flex items-center justify-center gap-0.5 md:gap-4 md:text-base">
               <Link
                  href="/"
                  className={cn(
                     buttonVariants({ intent: "primary", size: "lg" }),
                     "animate-content-in rounded-full [--stagger:3]",
                  )}>
                  Return to home
               </Link>
            </div>
         </div>
      </main>
   );
}

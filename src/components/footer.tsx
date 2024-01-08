import Link from "next/link";
import { Fingerprint } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";

export const Footer = () => {
   return (
      <footer className="container flex w-full shrink-0 flex-col items-center justify-between gap-4 bg-zinc-50 py-8 dark:bg-zinc-950 md:h-24 md:flex-row md:py-0">
         <div className="flex flex-col items-center gap-1 md:flex-row md:gap-2">
            <div className="flex items-center rounded-full text-2xl font-bold text-zinc-800 transition-colors dark:text-zinc-50">
               {/* <Fingerprint className="mr-2 h-5 w-5 shrink-0" /> */}
               M
               <Fingerprint className="-mt-px ml-px h-5 w-5 shrink-0" />
               ORS
            </div>
            <p className="text-center text-sm leading-loose text-zinc-500 dark:text-zinc-400 md:text-left">
               Built by{" "}
               <Link
                  href="https://github.com/mvrcelitos"
                  target="_blank"
                  className="underline-offet-2 text-zinc-700 hover:underline dark:text-zinc-200">
                  mvrcelo
               </Link>
               . Hosted on{" "}
               <Link
                  href="https://vercel.com"
                  target="_blank"
                  className="underline-offet-2 text-zinc-700 hover:underline dark:text-zinc-200">
                  Vercel
               </Link>
               . The source code is available on GitHub.
            </p>
         </div>
         <ModeToggle />
      </footer>
   );
};

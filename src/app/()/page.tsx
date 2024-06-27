import { cookies } from "next/headers";
import Link from "next/link";
import { motion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { GetStartedButton } from "./_components/get-started-button";

const getCurrentUser = () => {
   const c = cookies();

   if (!c.has("user")) return null;

   const user = c.get("user")?.value;
   return user;
};

export default function Page() {
   const user = getCurrentUser();

   if (!user)
      return (
         <main className="flex h-full w-full flex-initial flex-col items-center justify-center overflow-hidden p-4 text-foreground">
            <div className="flex max-w-md flex-col gap-2">
               <h1 className="animate-content-in text-center text-2xl font-bold duration-500 [--stagger:0] md:text-3xl">
                  👋 Hello
               </h1>
               <p className="animate-content-in text-center text-sm opacity-80 duration-500 [--stagger:1] md:text-base">
                  If you are lost, sql/vuekoo is a web application to help you to see and manage your databases, tables,
                  and more.
               </p>
               <div className="animate-content-in flex items-center gap-2 duration-500 [--stagger:2] sm:my-2">
                  <span className={cn("block h-0.5 w-12 bg-zinc-200  dark:bg-zinc-800")} />
                  <span className={cn("block h-0.5 w-full grow bg-zinc-200 dark:bg-zinc-800")} />
                  <span className={cn("block h-0.5 w-12 bg-zinc-200  dark:bg-zinc-800")} />
               </div>
               <div className="mb-2 flex flex-col gap-2 sm:mb-4 sm:gap-4">
                  <p className="animate-content-in text-center text-sm opacity-80 duration-500 [--stagger:3] md:text-base">
                     You can create an account to save your databases, settings and then you access them from anywhere.
                  </p>
                  <p className="animate-content-in text-center text-sm opacity-80 duration-500 [--stagger:4] md:text-base">
                     But this isn{"'"}t necessary, you can continue as guest if you want, but your data will be lost
                     when you close the browser.
                  </p>
               </div>
               <div className="flex items-center justify-center gap-0.5 md:gap-4 md:text-base">
                  <Link
                     href={"#"}
                     className={cn(
                        buttonVariants({ intent: "ghost", size: "lg" }),
                        "animate-content-in rounded-full [--stagger:5]",
                     )}>
                     I need help
                  </Link>
                  <GetStartedButton className="animate-content-in [--stagger:6]" />
               </div>
               {/* <p className="mb-2 text-left text-sm opacity-70 last-of-type:mb-0 sm:text-base md:mb-4">
                  We are currently suggesting our users to create an account on our system.
               </p>
               <p className="mb-2 text-left text-sm opacity-70 last-of-type:mb-0 sm:text-base md:mb-4">
                  This is due to the fact that it helps you not to lose your banks and settings, in addition to making
                  this application cross-platform.
               </p> */}
            </div>
         </main>
      );

   return (
      <main className="grid flex-initial place-items-center p-4 text-foreground">
         <div className="flex flex-col items-center">
            <span className="mb-2 text-5xl">👀</span>
            <h1 className="text-xl font-bold uppercase">SELECT A DATABASE TO START</h1>
            <p className="text-sm opacity-70">You can register a database too!</p>
         </div>
      </main>
   );
}

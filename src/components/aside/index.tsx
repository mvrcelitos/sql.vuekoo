import * as React from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { AsideCreateDatabaseForm } from "./aside-create-database";
import { AsideList } from "./aside-list";

export const Aside = () => {
   return (
      <aside className="sticky top-[37px] grid max-h-[calc(100dvh-37px)] min-h-[50svh] grid-cols-1 border-r border-r-zinc-200 bg-zinc-100 p-4 pb-0 dark:border-r-zinc-800 dark:bg-zinc-900 md:w-80 md:min-w-80 2xl:w-[336px] 2xl:min-w-[336px]">
         <div className="flex max-h-[calc(100dvh-37px-2rem)] flex-col gap-2 pt-2">
            <div className="flex items-center justify-between">
               <h4 className="text-sm font-semibold">Your databases</h4>
               <AsideCreateDatabaseForm />
            </div>
            <div className="relative">
               <Input className="h-8 w-full pl-8" />
               <Button
                  intent="ghost"
                  className="absolute left-px top-1 mx-1 h-6 w-6 shrink-0 p-0 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800">
                  <Search className="pointer-events-none left-px top-2 mx-2 h-4 w-4 shrink-0" />
               </Button>
            </div>
            <AsideList />
         </div>
         {/* <div className="w-[calc(100% + 2rem)] -mx-4 mt-auto h-8 bg-zinc-200 dark:bg-zinc-800"></div> */}
      </aside>
   );
};

export default Aside;

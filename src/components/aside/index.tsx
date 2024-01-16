import * as React from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flex } from "@/components/ui/layout";

import { AsideCreateDatabaseForm } from "./aside-create-database";
import { AsideList } from "./aside-list";

export const Aside = () => {
   return (
      <aside className="modern-scroll rounded-scroll relative flex flex-col overflow-y-auto overflow-x-hidden border-r border-r-zinc-200 bg-zinc-100 pb-0 dark:border-r-zinc-800 dark:bg-zinc-900 md:min-h-[50svh] md:w-80 md:min-w-80 2xl:w-[336px] 2xl:min-w-[336px]">
         <Flex orientation="vertical" className="modern-scroll w-full overflow-y-auto">
            <Flex
               orientation="vertical"
               className="sticky top-0 z-10 h-auto shrink-0 gap-2 bg-zinc-100 px-3 py-3 dark:bg-zinc-900">
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
            </Flex>
            <AsideList />
         </Flex>
      </aside>
   );
};

export default Aside;

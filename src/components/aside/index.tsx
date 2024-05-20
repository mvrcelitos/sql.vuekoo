import * as React from "react";
import { cookies } from "next/headers";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Flex } from "@/components/ui/layout";

import { AsideCreateDatabaseForm } from "./aside-create-database";
import { AsideList } from "./aside-list";

interface Database {
   [k: string]: {
      uuid: string;
      name: string;
      url: string;
      created_at: string;
      updated_at: string;
   };
}

const getDatabaseCookies = () => {
   const c = cookies();
   if (!c.has("databases")) return [];
   try {
      const databases = c.get("databases")?.value;
      if (!databases) return [];
      const parsed: Database = JSON.parse(databases);
      return Object.values(parsed).map((database) => database.name);
   } catch (err) {
      console.error(err);
      return [];
   }
};

export const Aside = () => {
   const databases = getDatabaseCookies();
   return (
      <aside className="modern-scroll rounded-scroll relative flex flex-col overflow-y-auto overflow-x-hidden border-r border-r-zinc-200 bg-zinc-100 pb-0 dark:border-r-zinc-800 dark:bg-zinc-900 md:min-h-[50svh] md:w-72 md:min-w-72">
         <Flex orientation="vertical" className="modern-scroll w-full overflow-y-auto">
            <Flex
               orientation="vertical"
               className="sticky top-0 z-10 h-auto shrink-0 gap-2 bg-zinc-100 px-3 py-3 dark:bg-zinc-900">
               <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Your databases</h4>
                  <AsideCreateDatabaseForm />
               </div>
               <div className="relative">
                  <Input intent="none" className="h-8 w-full rounded-full bg-background pl-8" />
                  <Search className="text-text-extralight pointer-events-none absolute left-2 top-2 size-4 shrink-0" />
                  {/* <Button
                     intent="ghost"
                     className="absolute left-1 top-1 h-6 w-6 shrink-0 rounded-full p-0 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800">
                  </Button> */}
               </div>
            </Flex>
            <AsideList databases={databases} />
         </Flex>
      </aside>
   );
};

export default Aside;

"use client";

import { useMemo, useState } from "react";

import { DatabasesList } from "@/components/aside-new/_components/database-list";
import { useNavigationMenuStore } from "@/components/navigation-menu/store";
import { DatabaseType } from "@/interfaces/cookies/databases";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AsideContent = ({ databases }: { databases: DatabaseType[] }) => {
   const { selected } = useNavigationMenuStore();
   const [direction, setDirection] = useState<number>(0);

   return useMemo(() => {
      let content: React.ReactNode;
      switch (selected) {
         case "databases":
            content = (
               <motion.div
                  key="databases"
                  className="flex flex-col"
                  initial={{
                     translateY: "-110%",
                     opacity: 0,
                  }}
                  animate={{
                     translateY: 0,
                     opacity: 1,
                  }}
                  exit={{
                     translateY: "-110%",
                     opacity: 0,
                  }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}>
                  <DatabasesList databases={databases ?? []} />
               </motion.div>
            );
            break;
         case "terminals":
            content = (
               <motion.div
                  key="sql-terminal"
                  className="flex flex-col"
                  initial={{
                     translateY: "110%",
                     opacity: 0,
                  }}
                  animate={{
                     translateY: 0,
                     opacity: 1,
                  }}
                  exit={{
                     translateY: "110%",
                     opacity: 0,
                  }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}>
                  <AsideSQLs databases={databases} />
               </motion.div>
            );
            break;
      }
      return (
         <AnimatePresence initial={false} mode="popLayout">
            {content}
         </AnimatePresence>
      );
   }, [selected, databases]);
};

const AsideSQLs = ({ databases }: { databases: DatabaseType[] }) => {
   const pathname = usePathname()?.split("?")[0];

   return (
      <div className="flex flex-col">
         {databases.map((database) => {
            const url = `/terminals/${database.uuid}`;
            return (
               <Link
                  href={url}
                  className="group relative flex h-[calc(2.25rem+1px)] items-center justify-start border-b border-b-muted px-1 text-sm text-zinc-800 hover:bg-accent dark:text-zinc-200">
                  {/* <motion.div
                  layoutId="aside-sql-background"
                  className="pointer-events-none absolute inset-0 w-full bg-accent opacity-50"
               /> */}
                  <div className="relative grid size-7 place-items-center">
                     {pathname === url ? (
                        <>
                           <span className="absolute size-2.5 animate-ping rounded-full bg-primary" />
                           <span className="block size-3 rounded-full bg-primaryActive" />
                        </>
                     ) : (
                        <span className="block size-3 rounded-full border-2 border-300" />
                     )}
                  </div>
                  <p className="px-2 py-1">{database.name}</p>
               </Link>
            );
         })}
      </div>
   );
};

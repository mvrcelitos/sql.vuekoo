"use client";

import { useState } from "react";

import { DatabasesReturn } from "./create-database/schema";
import { DatabaseItem } from "./database-item";
import { useAsideStore } from "@/components/aside-new/store";
import { cn } from "@/lib/utils";

export const DatabasesList = ({ databases }: { databases: DatabasesReturn }) => {
   // Animation useState
   const { search } = useAsideStore();

   const [hover, setHover] = useState<number | null>(null);

   return (
      <div className="flex flex-col" onMouseLeave={() => setHover(null)}>
         {databases?.map((database, index) => {
            return (
               <DatabaseItem
                  key={database.uuid}
                  database={database}
                  index={index}
                  count={databases.length || 0}
                  hover={hover === index}
                  onMouseEnter={() => setHover(index)}
                  className={cn(search && !database.name?.toLowerCase().includes(search.toLowerCase()) ? "hidden" : "")}
               />
            );
         })}
      </div>
   );
};

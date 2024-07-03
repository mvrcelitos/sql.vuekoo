"use client";

import { useState } from "react";

import { DatabasesReturn } from "./create-database/schema";
import { DatabaseItem } from "./database-item";
import { AnimatePresence } from "framer-motion";

export const DatabaseList = ({ databases }: { databases: DatabasesReturn }) => {
   // Animation useState
   const [hover, setHover] = useState<number | null>(null);

   return (
      <div className="flex flex-col gap-0.5" onMouseLeave={() => setHover(null)}>
         <AnimatePresence>
            {databases?.map((database, index) => {
               return (
                  <DatabaseItem
                     key={database.uuid}
                     // initial={{ opacity: 0, y: 10 }}
                     // animate={{ opacity: 1, y: 0 }}
                     // exit={{ opacity: 0, y: 10 }}
                     database={database}
                     index={index}
                     count={databases.length || 0}
                     hover={hover == index}
                     onMouseEnter={() => setHover(index)}
                  />
               );
            })}
         </AnimatePresence>
      </div>
   );
};

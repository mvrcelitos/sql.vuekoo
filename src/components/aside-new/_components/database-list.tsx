"use client";

import { useState } from "react";

import { DatabasesReturn } from "./create-database/schema";
import { DatabaseItem } from "./database-item";

export const DatabaseList = ({ databases }: { databases: DatabasesReturn }) => {
   // Animation useState
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
               />
            );
         })}
      </div>
   );
};

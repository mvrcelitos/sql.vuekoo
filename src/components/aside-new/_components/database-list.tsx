"use client";

import { useState } from "react";

import { DatabasesReturn } from "./create-database/schema";
import { DatabaseItem } from "./database-item";

export const DatabaseList = ({ databases }: { databases: DatabasesReturn }) => {
   // Animation useState
   const [hover, setHover] = useState<number | null>(null);

   return (
      <div className="flex flex-col gap-0.5" onMouseLeave={() => setHover(null)}>
         {databases?.map((database, index) => {
            return (
               <DatabaseItem
                  database={database}
                  key={index}
                  hover={hover == index}
                  onMouseEnter={() => {
                     setHover(index);
                  }}
               />
            );
         })}
      </div>
   );
};

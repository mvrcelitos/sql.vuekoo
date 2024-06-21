import { cookies } from "next/headers";

import { DatabasesReturn } from "@/components/aside-new/_components/create-database/schema";
import { AsideClient } from "@/components/aside-new/aside-client";

const getDatabases = () => {
   const c = cookies();
   if (!c.has("databases")) return [];
   try {
      const databases = c.get("databases")?.value;
      if (!databases) return [];
      const parsed: DatabasesReturn = JSON.parse(databases);
      return parsed;
   } catch (err) {
      console.error(err);
      return [];
   }
};

export const AsideNew = ({}) => {
   const databases = getDatabases();

   return <AsideClient databases={databases} />;
};

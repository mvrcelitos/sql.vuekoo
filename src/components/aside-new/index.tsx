import { InnerAside } from "@/components/aside-new/aside-new";
import { cookies } from "next/headers";

interface Database {
   [k: string]: {
      uuid: string;
      name: string;
      url: string;
      created_at: string;
      updated_at: string;
   };
}

const getDatabases = () => {
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

export const AsideNew = ({}) => {
   const databases = getDatabases();

   return <InnerAside databases={databases} />;
};

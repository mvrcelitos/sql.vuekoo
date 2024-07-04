import { AsideClient } from "@/components/aside-new/aside-client";
import { getDatabases } from "@/lib/database/functions";

export const AsideNew = async ({}) => {
   const databases = await getDatabases();

   return <AsideClient databases={databases ?? []} />;
};

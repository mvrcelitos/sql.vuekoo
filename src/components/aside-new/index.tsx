import { getDatabases } from "@/lib/database/functions";

import { Aside as AsideRoot, AsideHeader, AsideSearch } from "./Aside";
import { AsideContent } from "./content";

export const Aside = async () => {
   const databases = await getDatabases();

   return (
      <AsideRoot>
         <AsideHeader>
            <AsideSearch />
         </AsideHeader>
         <AsideContent databases={databases ?? []} />
      </AsideRoot>
   );
};

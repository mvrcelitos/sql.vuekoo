import { create } from "zustand";
import { NavigationSlugs } from "@/components/navigation-menu/data";

interface NavigationMenuStore {
   selected: NavigationSlugs | null;
   setSelected: (selected: NavigationSlugs | null) => void;
}

export const useNavigationMenuStore = create<NavigationMenuStore>((set) => ({
   selected:
      typeof window === undefined
         ? "databases"
         : (window?.location?.pathname ?? "")?.startsWith("/terminals/")
           ? "terminals"
           : "databases",
   setSelected: (selected) => set({ selected }),
}));

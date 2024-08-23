import { create } from "zustand";

interface AsideStore {
   sheet: boolean;
   setSheet: (sheet: boolean) => void;
   search: string;
   setSearch: (search: string) => void;
}

export const useAsideStore = create<AsideStore>((set) => ({
   sheet: false,
   setSheet: (sheet) => set({ sheet }),
   search: "",
   setSearch: (search) => set({ search }),
}));

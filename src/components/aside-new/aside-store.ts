import { create } from "zustand";

interface AsideStore {
   sheet: boolean;
   setSheet: (create: boolean) => void;
}

export const useAsideStore = create<AsideStore>((set) => ({
   sheet: false,
   setSheet: (sheet) => set({ sheet }),
}));

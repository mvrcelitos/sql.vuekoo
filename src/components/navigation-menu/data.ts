import { Blocks, LucideIcon, Search, Table2, Terminal } from "lucide-react";

export const navigationSlugs = ["databases", "terminals", "search", "magic"] as const;
export type NavigationSlugs = (typeof navigationSlugs)[number];

export interface NavigationMenuItem {
   slug: NavigationSlugs;
   name: string;
   icon: LucideIcon;
   disabled?: boolean;
}

export const navigationMenuItems: NavigationMenuItem[] = [
   {
      slug: "databases",
      name: "Databases manager",
      icon: Table2,
   },
   {
      slug: "terminals",
      name: "SQL Terminal",
      icon: Terminal,
   },
   {
      slug: "search",
      name: "Search",
      icon: Search,
      disabled: true,
   },
   {
      slug: "magic",
      name: "Magic!",
      icon: Blocks,
      disabled: true,
   },
];

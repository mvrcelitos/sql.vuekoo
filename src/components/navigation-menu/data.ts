import { Blocks, LucideIcon, Search, Table2, Terminal } from "lucide-react";

export const navigationSlugs = ["databases", "sql", "search", "magic"] as const;
export type NavigationSlugs = (typeof navigationSlugs)[number];

export interface NavigationMenuItem {
   slug: NavigationSlugs;
   name: string;
   href: string;
   icon: LucideIcon;
   regex?: RegExp;
   disabled?: boolean;
}

export const navigationMenuItems: NavigationMenuItem[] = [
   {
      slug: "databases",
      name: "Databases manager",
      icon: Table2,
      href: "/",
      regex: /\/$|\/databases(\/(\w+))?/,
   },
   {
      slug: "sql",
      name: "SQL Terminal",
      icon: Terminal,
      href: "/sql",
      regex: /\/sql/g,
      disabled: true,
   },
   {
      slug: "search",
      name: "Search",
      icon: Search,
      href: "#",
      disabled: true,
   },
   {
      slug: "magic",
      name: "Magic!",
      icon: Blocks,
      href: "#",
      disabled: true,
   },
];

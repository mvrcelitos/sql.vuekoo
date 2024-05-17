import { Blocks, Search, Table2, Terminal } from "lucide-react";

export const NavigationMenuItems: NavigationMenuItem[] = [
   {
      name: "Databases manager",
      icon: Table2,
      href: "/",
      regex: /\/$|\/databases(\/(\w+))?/,
      forcedActive: true,
   },
   {
      name: "SQL Terminal",
      icon: Terminal,
      href: "/sql",
      regex: /\/sql/g,
   },
   {
      name: "Search",
      icon: Search,
      href: "#",
   },
   {
      name: "Magic!",
      icon: Blocks,
      href: "#",
   },
];

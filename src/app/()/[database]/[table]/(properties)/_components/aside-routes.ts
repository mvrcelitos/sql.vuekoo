import { FolderCog, FolderKanban, FolderKey, FolderTree } from "lucide-react";

export const AsideRoutes = [
   {
      name: "Columns",
      icon: FolderKanban,
      path: "",
      disabled: false,
   },
   {
      name: "Constraints",
      icon: FolderCog,
      path: "/properties/constraints",
      disabled: true,
   },
   {
      name: "Foreign Keys",
      icon: FolderKey,
      path: "/properties/foreign-keys",
      disabled: false,
   },
   {
      name: "Diagram",
      icon: FolderTree,
      path: "/properties/diagram",
      disabled: true,
   },
] as const;

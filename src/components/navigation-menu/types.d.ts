interface NavigationMenuItem {
   name: string;
   href: string;
   icon: LucideIcon;
   regex?: RegExp;
   forcedActive?: boolean;
}

import { AsideNew } from "@/components/aside-new";
import { NavigationMenu } from "@/components/navigation-menu/index";

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <NavigationMenu />
         <AsideNew />
         {/* <Aside /> */}
         {children}
      </>
   );
}

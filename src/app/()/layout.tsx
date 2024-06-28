import { AsideNew } from "@/components/aside-new";
import { NavigationMenu } from "@/components/navigation-menu/index";

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <div className="flex min-h-[calc(100svh-37px)] flex-initial flex-col md:flex-row">
            <NavigationMenu />
            <AsideNew />
            {/* <Aside /> */}
            {children}
         </div>
      </>
   );
}

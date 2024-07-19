import { AsideNew } from "@/components/aside-new";
import { NavigationMenu } from "@/components/navigation-menu/index";

export const metadata = {
   icons: {
      icon: "/logo.svg",
      shortcut: "/logo.svg",
      apple: "/logo.svg",
   },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <div className="flex min-h-[calc(100sdvh-var(--header-height))] flex-initial flex-col md:flex-row">
            <NavigationMenu />
            <AsideNew />
            {/* <Aside /> */}
            {children}
         </div>
      </>
   );
}

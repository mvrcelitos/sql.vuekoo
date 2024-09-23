import { Aside } from "@/components/aside-new";
import { Header } from "@/components/header";
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
         <Header />
         <div className="flex min-h-[calc(100dvh-33px)] flex-initial flex-col md:flex-row">
            <NavigationMenu />
            <Aside />
            {children}
         </div>
      </>
   );
}

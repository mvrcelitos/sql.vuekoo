import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { Aside } from "@/components/aside";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Flex } from "@/components/ui/layout";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

import "./globals.css";
import { NavigationMenu } from "@/components/navigation-menu/index";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: {
      default: "vuekoo/sql",
      template: "%s · vuekoo/sql",
   },
   description: "Database managers for the modern web.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={cn("flex h-dvh max-h-lvh min-h-svh flex-col overflow-hidden", dmSans.className)}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
               <Header />
               <div className="flex min-h-[calc(100svh-37px)] flex-initial flex-wrap md:flex-nowrap">{children}</div>
               <Toaster />
            </ThemeProvider>
            <Analytics />
         </body>
      </html>
   );
}

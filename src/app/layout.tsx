import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Aside } from "@/components/aside";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { FlexDiv } from "@/components/ui/layout";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: {
      default: "vuekoo/sql",
      template: "%s | vuekoo/sql",
   },
   description: "Database managers for the modern web.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={cn("flex h-dvh max-h-lvh min-h-svh flex-col overflow-hidden", inter.className)}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
               <Header />
               <FlexDiv className="min-h-[calc(100svh-37px)] flex-wrap md:flex-nowrap">
                  <Aside />
                  {children}
               </FlexDiv>
               <Toaster />
            </ThemeProvider>
         </body>
      </html>
   );
}

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
         <body className={cn("grid min-h-[100svh] grid-cols-1", inter.className)}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
               <Header />
               <FlexDiv className="min-h-[calc(100svh-37px)]">
                  <Aside />
                  {children}
               </FlexDiv>
               <Toaster />
            </ThemeProvider>
         </body>
      </html>
   );
}

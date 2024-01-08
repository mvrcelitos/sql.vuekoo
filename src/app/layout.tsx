import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import { cn } from "@/lib/utils";

import "./globals.css";
import Header from "@/components/header";
import { Aside } from "@/components/aside";
import { ThemeProvider } from "@/components/theme-provider";

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
               <div className="min-h-[calc(100svh-37px)] md:flex">
                  <Aside />
                  {children}
               </div>
               <Toaster />
            </ThemeProvider>
         </body>
      </html>
   );
}

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";

import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

import "./globals.css";

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
         <body className={cn("flex h-dvh max-h-lvh min-h-svh flex-col overflow-hidden", GeistSans.className)}>
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

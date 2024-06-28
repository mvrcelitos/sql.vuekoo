import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";

import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

import "./globals.css";
import { config } from "@/config/site";

export const metadata: Metadata = {
   title: {
      default: config.title,
      template: `%s · ${config.title}`,
   },
   description: "Database managers for the modern web.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={cn("flex h-dvh max-h-lvh min-h-svh flex-col overflow-hidden", GeistSans.className)}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
               <Header />
               {children}
               <Toaster />
            </ThemeProvider>
            <Analytics />
         </body>
      </html>
   );
}

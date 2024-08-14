import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";

import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { config } from "@/config/site";
import { cn } from "@/lib/utils";

import "./globals.css";
import { ScriptProvider } from "@/components/script-dialog";

export const metadata: Metadata = {
   title: {
      default: config.title,
      template: `%s · ${config.title}`,
   },
   description: "Database managers for the modern web.",
   icons: {
      icon: "/logo.svg",
      shortcut: "/logo.svg",
      apple: "/logo.svg",
   },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={cn("flex h-dvh max-h-lvh min-h-svh flex-col overflow-hidden", GeistSans.className)}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
               <ScriptProvider>
                  <Header />
                  {children}
                  <Toaster />
               </ScriptProvider>
            </ThemeProvider>
            <Analytics />
         </body>
      </html>
   );
}

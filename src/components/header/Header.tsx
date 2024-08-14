"use client";

import Link from "next/link";
import { Menu, User2 } from "lucide-react";

import { useAsideStore } from "@/components/aside-new/AsideStore";
import { ConfigButton } from "@/components/header-buttons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { config } from "@/config/site";
import { SaveChangesButton } from "@/components/header/buttons/SaveChangesButton";

export const Header = () => {
   const { sheet, setSheet } = useAsideStore();

   return (
      <header className="sticky left-0 top-0 z-40 flex h-[33px] w-full shrink-0 justify-between border-b border-b-muted bg-background text-foreground">
         <div className="flex items-center">
            <div aria-label="space" className="h-full w-[53px] border-r border-muted max-lg:hidden" />
            <Button
               intent="ghost"
               size="icon-xs"
               onClick={() => setSheet(!sheet)}
               className="rounded-none text-[13px] data-[state=open]:bg-zinc-200 data-[state=open]:text-zinc-800 dark:data-[state=open]:bg-zinc-800/70 dark:data-[state=open]:text-zinc-200 lg:hidden">
               <Menu className="size-4 shrink-0" height={16} width={16} />
            </Button>
            {/* <Separator orientation="vertical" className="h-4 w-px bg-zinc-300 dark:bg-zinc-700" /> */}
            <Link
               href="/"
               className="flex h-full select-none items-center self-center px-2 text-sm font-bold uppercase hocus:bg-accent">
               <span className="uppercase text-700">{config.company}</span>
               <span className="text-base text-primary">/</span>
               <span className="text-zinc-900 dark:text-zinc-50">SQL</span>
            </Link>
            <Separator orientation="vertical" />
            {/* <ScriptButton /> */}
            <SaveChangesButton />
            <Separator orientation="vertical" />
         </div>
         <div className="flex items-center justify-end">
            <Separator orientation="vertical" />
            <Button disabled intent="ghost" size="icon-xs" className="rounded-none hover:bg-accent">
               <User2 className="size-4" />
            </Button>
            <Separator orientation="vertical" />
            <ConfigButton />
         </div>
      </header>
   );
};

export default Header;

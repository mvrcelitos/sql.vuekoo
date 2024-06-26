"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { useAsideStore } from "@/components/aside-new/aside-store";
import { ScriptButton } from "@/components/header-buttons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { config } from "@/config/site";
import { cn } from "@/lib/utils";

export const Header = () => {
   const { sheet, setSheet } = useAsideStore();

   return (
      <header
         // @ts-expect-error
         style={{ "--header-height": "37px" }}
         className="sticky left-0 top-0 z-40 flex h-[--header-height] w-full shrink-0 border-b border-b-zinc-200 bg-background text-foreground dark:border-b-zinc-800">
         {/* <div data-tauri-drag-region={undefined} className="flex items-center justify-between"> */}
         {/* <div className="flex grow items-center gap-1"> */}
         <div aria-label="space" className="w-[52px] border-r border-muted max-lg:hidden" />
         <Button
            intent="ghost"
            size="icon-sm"
            onClick={() => setSheet(!sheet)}
            className={cn(
               "rounded-none text-[13px] data-[state=open]:bg-zinc-200 data-[state=open]:text-zinc-800 dark:data-[state=open]:bg-zinc-800/70 dark:data-[state=open]:text-zinc-200 lg:hidden",
            )}>
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
         <Separator orientation="vertical" className=" h-5 w-px self-center bg-zinc-200 dark:bg-zinc-800" />
         <ScriptButton />
         {/* </div> */}
         {/* <div className="-my-1.5 -mr-4 flex h-9 justify-center gap-1">
               <MinimizeButton />
               <MaximizeButton />
               <CloseButton />
            </div> */}
         {/* <div className="flex items-center gap-4">
               <DropdownMenu>
                  <DropdownMenuTrigger className="-my-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 dark:bg-zinc-100 dark:text-zinc-600">
                     <UserRound className="h-4 w-4 shrink-0" height={16} width={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent sideOffset={6} align="end" className="rounded-t-none">
                     <DropdownMenuItem className="cursor-pointer first:rounded-t-none" asChild>
                        <Link href="#">
                           <span>Sign in</span>
                           <LogIn className="opacity/70 ml-auto h-4 w-4 shrink-0" height={16} width={16} />
                        </Link>
                     </DropdownMenuItem>
                     <DropdownMenuItem className="cursor-pointer first:rounded-t-none" asChild>
                        <Link href="#">
                           <span>Sign up</span>
                           <UserRoundPlus className="opacity/70 ml-auto h-4 w-4 shrink-0" height={16} width={16} />
                        </Link>
                     </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem intent="danger">
                        Sign Out
                        <LogOut className="opacity/70 ml-auto h-4 w-4 shrink-0" height={16} width={16} />
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div> */}
         {/* </div> */}
      </header>
   );
};

export default Header;

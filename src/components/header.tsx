import * as React from "react";

import { HeaderThemeContent } from "@/components/header-theme-content";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const Header = () => {
   return (
      <header className="sticky left-0 top-0 z-40 w-full shrink-0 border-b border-b-zinc-200 bg-background px-4 py-1.5 text-foreground dark:border-b-zinc-800">
         <div data-tauri-drag-region className="flex items-center justify-between">
            <div className="flex items-center gap-1">
               <div className="select-none text-sm font-bold uppercase">
                  <span className="text-zinc-700 dark:text-zinc-300">VUEKOO</span>
                  <span className="text-base text-primary">/</span>
                  <span className="text-zinc-900 dark:text-zinc-50">SQL</span>
               </div>
               <hr className="ml-2 mr-1 h-4 w-px grow border-none bg-zinc-200 dark:bg-zinc-800" />
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button
                        intent="ghost"
                        size="alt"
                        className="text-[13px] data-[state=open]:bg-zinc-200 data-[state=open]:text-zinc-800 dark:data-[state=open]:bg-zinc-800/70 dark:data-[state=open]:text-zinc-200">
                        File
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" sideOffset={2}>
                     <DropdownMenuItem className="text-[13px]">New connection</DropdownMenuItem>
                     <DropdownMenuItem className="text-[13px]">Share</DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="text-[13px]">Preferences</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                           <DropdownMenuSub>
                              <DropdownMenuSubTrigger className="text-[13px]">Theme</DropdownMenuSubTrigger>
                              <HeaderThemeContent />
                           </DropdownMenuSub>
                        </DropdownMenuSubContent>
                     </DropdownMenuSub>
                  </DropdownMenuContent>
               </DropdownMenu>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button
                        intent="ghost"
                        size="alt"
                        className="text-[13px] data-[state=open]:bg-zinc-200 data-[state=open]:text-zinc-800 dark:data-[state=open]:bg-zinc-800/70 dark:data-[state=open]:text-zinc-200">
                        Edit
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" sideOffset={2}>
                     <DropdownMenuItem className="text-[13px]">Undo</DropdownMenuItem>
                     <DropdownMenuItem disabled>Redo</DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem className="text-[13px]">Cut</DropdownMenuItem>
                     <DropdownMenuItem className="text-[13px]">Copy</DropdownMenuItem>
                     <DropdownMenuItem className="text-[13px]">Paste</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button
                        intent="ghost"
                        size="alt"
                        className="text-[13px] data-[state=open]:bg-zinc-200 data-[state=open]:text-zinc-800 dark:data-[state=open]:bg-zinc-800/70 dark:data-[state=open]:text-zinc-200">
                        Help
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" sideOffset={2}>
                     <DropdownMenuItem asChild>
                        <Link href="https://github.com/mvrcelitos/sql.vuekoo">Source code</Link>
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <Link href="/welcome">Welcome</Link>
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
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
         </div>
      </header>
   );
};

export default Header;

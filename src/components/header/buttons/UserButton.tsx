import { LogIn, User2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GetUser } from "@/lib/auth";

export const UserButton = () => {
   const user = false;

   return (
      <Button
         intent="ghost"
         size="icon-xs"
         className="rounded-none hover:bg-accent aria-disabled:pointer-events-none aria-disabled:opacity-50"
         asChild>
         <Link href={user ? "/me" : "/sign-in"}>
            {user ? <User2 className="size-4 shrink-0" /> : <LogIn className="size-4 shrink-0" />}
         </Link>
      </Button>
   );
};

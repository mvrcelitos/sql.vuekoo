import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <Link
            className={cn(
               buttonVariants({ intent: "ghost", size: "sm" }),
               "absolute left-2 top-2 gap-2 font-normal md:left-4 md:top-4",
            )}
            href="/">
            <ChevronLeft className="size-4 shrink-0" />
            Back
         </Link>
         {children}
      </>
   );
}

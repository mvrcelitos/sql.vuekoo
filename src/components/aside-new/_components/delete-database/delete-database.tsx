import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogBody,
   DialogClose,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteDatabase } from "@/lib/database/functions";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface DeleteDatabaseProps {
   database: {
      uuid: string;
      name: string;
   };
}

export const DeleteDatabaseMenuItem = ({ database }: DeleteDatabaseProps) => {
   const router = useRouter();
   const [open, setOpen] = useState(false);
   const [isPending, startTransition] = useTransition();

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <DropdownMenuItem intent="danger" onSelect={(ev) => ev.preventDefault()}>
               <Trash2 className="mr-2 size-4 shrink-0" />
               Delete
            </DropdownMenuItem>
         </DialogTrigger>
         <DialogContent close={!isPending}>
            <DialogHeader>
               <DialogTitle>
                  Delete <span className="text-foreground">{database.name}</span>
               </DialogTitle>
            </DialogHeader>
            <DialogBody className="flex flex-col gap-2 text-sm text-700">
               <div className="mb-1 flex items-center gap-2 rounded-md border border-amber-600/30 bg-yellow-500/15 px-4 py-5">
                  <AlertTriangle className="size-5 shrink-0 text-yellow-400 dark:text-yellow-500" />
                  <p className="font-normal text-foreground">Please take a moment to consider the consequences.</p>
               </div>
               <p className="relative ml-2 pl-4 before:absolute before:-left-0 before:top-1/2 before:size-1 before:-translate-y-1/2 before:rounded-full before:bg-400">
                  Are you sure? This action will permanently delete :{" "}
                  <strong className="font-semibold text-foreground">{database.name}</strong>.
               </p>
               <p className="relative ml-2 pl-4 before:absolute before:-left-0 before:top-1/2 before:size-1 before:-translate-y-1/2 before:rounded-full before:bg-400">
                  This action will not affect your database, but it will remove it from the list of databases.
               </p>
            </DialogBody>
            <DialogFooter>
               <DialogClose asChild>
                  <Button disabled={isPending} intent="ghost" className="cursor-pointer">
                     Cancel
                  </Button>
               </DialogClose>
               <Button
                  disabled={isPending}
                  intent="destructive"
                  className="relative overflow-hidden"
                  onClick={(ev) => {
                     const width = ev?.currentTarget?.offsetWidth;
                     ev.currentTarget.style.width = `${width}px`;
                     startTransition(async () => {
                        // await new Promise((resolve) => setTimeout(resolve, 2000));
                        const res = await deleteDatabase(database.uuid);
                        if (!res) {
                           toast.error("Failed to delete database");
                           return;
                        }
                        toast.success("Database deleted successfully");
                        setOpen(false);
                        router.refresh();
                     });
                  }}>
                  <AnimatePresence mode="popLayout" initial={false}>
                     <motion.span
                        className="relative whitespace-nowrap"
                        key={isPending ? "loading" : "button"}
                        initial={{ opacity: 0, transform: "translateY(110%)" }}
                        animate={{ opacity: 1, transform: "translateY(0)" }}
                        exit={{ opacity: 0, transform: "translateY(-110%)" }}>
                        {isPending ? <Loader2 className="size-4 shrink-0 animate-spin" /> : "I'm sure, delete!"}
                     </motion.span>
                  </AnimatePresence>
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

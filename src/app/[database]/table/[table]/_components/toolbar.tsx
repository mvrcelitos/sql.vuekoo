import { Separator } from "@/components/ui/separator";
import { ExportTableButton, RefreshPageButton, ScriptPageButton } from "./buttons";

export interface ToolbarProps {
   rows?: number;
}

export const Toolbar = ({ rows }: ToolbarProps) => {
   return (
      <div className="flex w-full items-center justify-between gap-2 bg-transparent px-2 py-1">
         <ul aria-orientation="horizontal" className="space-x-1">
            <li className="inline-block align-middle">
               <RefreshPageButton />
            </li>
            <Separator orientation="vertical" className="inline-block h-6 align-middle" />
            <li className="inline-block align-middle">
               <ScriptPageButton />
            </li>
            <li className="inline-block align-middle">
               <ExportTableButton />
            </li>
         </ul>
         {!!rows && (
            <p className="pr-2 text-xs text-zinc-700 dark:text-zinc-300">
               {rows} {rows != 1 ? "rows" : "row"}
            </p>
         )}
      </div>
   );
};

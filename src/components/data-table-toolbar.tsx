import { ExportTableButton, RefreshButton,VisibilityButton } from "@/components/data-table-buttons";
import { Flex } from "@/components/ui/layout";
import { Separator } from "@/components/ui/separator";

export const DataTableToolbar = ({ rows }: { rows?: number | undefined | null }) => {
   return (
      <Flex className="h-10 flex-[0_0_auto] items-center justify-between gap-2 bg-transparent px-2 py-1">
         <ul aria-orientation="horizontal" className="space-x-1">
            <li className="inline-block align-middle">
               <RefreshButton />
            </li>
            <Separator orientation="vertical" className="inline-block h-6 align-middle" />
            <li className="inline-block align-middle">
               <VisibilityButton />
            </li>
            <li className="inline-block align-middle">
               <ExportTableButton />
            </li>
         </ul>
         <span className="pr-1 text-xs text-zinc-700 dark:text-zinc-300">
            {rows || 0} row{(rows || 0) != 1 ? "s" : ""}
         </span>
      </Flex>
   );
};

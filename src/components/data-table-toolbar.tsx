import {
   ExportTableButton,
   ExportTableButtonProps,
   RefreshButton,
   RowsTableButton,
   VisibilityButton,
} from "@/components/data-table-buttons";
import { Flex } from "@/components/ui/layout";
import { Separator } from "@/components/ui/separator";

export const buttons = [
   { name: "Visibility", component: VisibilityButton },
   { name: "Export", component: ExportTableButton },
   { name: "Rows", component: RowsTableButton },
] as const;

export type DataTableToolbarProps = {
   rows?: number | undefined | null;
   exportActions?: ExportTableButtonProps["actions"];
};

export const DataTableToolbar = ({ rows, ...props }: DataTableToolbarProps) => {
   return (
      <Flex className="h-10 flex-[0_0_auto] items-center justify-between gap-2 bg-transparent px-2 py-1">
         <ul aria-orientation="horizontal" className="space-x-1">
            <li className="inline-block align-middle">
               <RefreshButton />
            </li>
            <Separator orientation="vertical" className="inline-block h-6 align-middle" />
            {buttons.map((btn, index) => {
               if (btn.name === "Export" && props.exportActions) {
                  return (
                     <li className="inline-block align-middle">
                        <btn.component key={index} actions={props.exportActions} />
                     </li>
                  );
               }
               return (
                  <li className="inline-block align-middle">
                     <btn.component key={index} />
                  </li>
               );
            })}
         </ul>
         <span className="pr-1 text-xs text-zinc-700 dark:text-zinc-300">
            {rows || 0} row{(rows || 0) != 1 ? "s" : ""}
         </span>
      </Flex>
   );
};

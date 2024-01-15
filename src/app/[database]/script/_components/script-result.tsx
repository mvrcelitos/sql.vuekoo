"use client";

import { Flex } from "@/components/ui/layout";
import { TableWrapper } from "@/components/ui/table";

import { useScriptStore } from "./use-script-store";
import { DataTable } from "@/components/data-table";
import { DataTableToolbar } from "@/components/data-table-toolbar";

export const ScriptResult = () => {
   const { result } = useScriptStore();

   if (!result) return null;

   return (
      <Flex orientation="vertical" className="w-full">
         <TableWrapper className="border-t border-t-zinc-200 dark:border-t-zinc-800">
            <DataTable fields={result?.data?.fields} rows={result?.data?.rows} defaultHeader />
         </TableWrapper>
         <DataTableToolbar rows={result?.data?.rows?.length || 0} />
         {/* <ScriptResultToolbar rows={result?.data?.rows?.length || 0} /> */}
      </Flex>
   );
};

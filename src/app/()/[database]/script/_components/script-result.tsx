"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { DataTable } from "@/components/data-table";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Flex } from "@/components/ui/layout";
import { TableWrapper } from "@/components/ui/table";

import { useScriptStore } from "./use-script-store";

export const ScriptResult = () => {
   const hasPageRendered = React.useRef(false);
   const lastPathname = React.useRef("");
   const pathname = usePathname()?.split("?")?.[0];

   const { result, clearResult } = useScriptStore();

   React.useEffect(() => {
      if (!!hasPageRendered.current && lastPathname.current !== pathname) {
         clearResult();
         lastPathname.current = pathname;
      }

      if (!hasPageRendered.current) {
         hasPageRendered.current = true;
         lastPathname.current = pathname;
      }
   }, [pathname]);

   if (!result) return null;
   if (!result?.data?.fields?.length && !result?.data?.rows?.length) return null;

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

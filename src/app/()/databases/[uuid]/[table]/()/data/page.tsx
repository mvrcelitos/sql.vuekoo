import { getDatabase } from "@/lib/database.helpers";
import { getData as serverGetData } from "./actions";

import { paramsProps, searchParamsProps } from "./types";
import { DatabaseFactory } from "@/lib/database";

import { Table, TableWrapper, TBody, Td, Th, THead, TRow } from "@/components/ui/table";
import { TableColumnHeader } from "@/components/table-column-header";
import { TableCellFormatter } from "@/lib/table-cell-formatter";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DataTable } from "@/components/data-table";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { DefaultQueryParams } from "@/constants/default-query-params";

interface FieldProps<T extends string = string> {
   name: T;
   tableID: number;
   columnID: number;
   dataTypeID: number;
   dataTypeSize: number;
   dataTypeModifier: number;
   format: string;
}

const getData = async (params: paramsProps, searchParams: searchParamsProps) => {
   "use server";
   const database = getDatabase(params.uuid);
   if (!database) return;

   const connection = await DatabaseFactory(database.type)?.connectWithDatabase(database);
   if (!connection) return;

   const ordenation = searchParams.sortType?.toLowerCase() === "desc" ? "DESC" : "ASC";
   const limit = searchParams.limit?.replace(/\D/g, "") || DefaultQueryParams.limit;
   const sort = searchParams.sort ?? DefaultQueryParams.orderBy;

   const data = await connection.query<unknown, FieldProps>(
      `SELECT * FROM ${params.table} as t ORDER BY ${
         searchParams?.sort ? `t."${searchParams?.sort}"` : DefaultQueryParams.orderBy
      } ${ordenation} LIMIT ${limit}`,
   );
   if (!data) return;

   const hiddenColumns = searchParams?.hide?.split(",") ?? [];
   data.fields = data.fields.filter((field: any) => !hiddenColumns.includes(field.name));
   return data;
};

export default async function Page({ params, searchParams }: { params: paramsProps; searchParams: searchParamsProps }) {
   const data = await getData(params, searchParams);
   return (
      <main className="flex h-full flex-initial grow flex-col overflow-hidden">
         <TableWrapper className="border-t border-t-zinc-200 dark:border-t-zinc-800">
            <DataTable fields={data?.fields as any} rows={data?.rows as Record<string, any>[]} />
         </TableWrapper>
         <DataTableToolbar rows={data?.rowsCount} />
         {/* <PropertiesDataTableToolbar rows={data?.rows!} /> */}
         {/* </Flex> */}
      </main>
   );
}

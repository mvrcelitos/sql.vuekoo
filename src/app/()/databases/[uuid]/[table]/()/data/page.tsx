import { notFound } from "next/navigation";

import { DataTable } from "@/components/data-table";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { TableWrapper } from "@/components/ui/table";
import { DefaultQueryParams } from "@/constants/default-query-params";
import { DatabaseFactory } from "@/lib/database";
import { findDatabase } from "@/lib/database/functions";

import { paramsProps, searchParamsProps } from "./types";

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
   const database = await findDatabase(params.uuid);
   if (!database) return;

   const connection = await DatabaseFactory(database.type)?.connectWithDatabase(database);
   if (!connection) return;

   const ordenation = searchParams.sortType?.toLowerCase() === "desc" ? "DESC" : "ASC";
   const limit = searchParams.limit?.replace(/\D/g, "") || DefaultQueryParams.limit;
   const sort = searchParams.sort ?? DefaultQueryParams.orderBy;

   try {
      const data = await connection.query<unknown, FieldProps>(
         `SELECT * FROM ${params.table} as t ORDER BY ${sort} ${ordenation} LIMIT ${limit}`,
      );
      if (!data) return;
      const hiddenColumns = searchParams?.hide?.split(",") ?? [];
      data.fields = data.fields.filter((field: any) => !hiddenColumns.includes(field.name));
      return data;
   } catch (err) {
      // @ts-ignore
      if (err?.code === "42P01") {
         notFound();
      }
   }
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

import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import * as pg from "pg";

import { DataTable } from "@/components/data-table";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Flex } from "@/components/ui/layout";
import { TableWrapper } from "@/components/ui/table";
import { DefaultQueryParams } from "@/constants/default-query-params";

interface paramsProps {
   database: string;
   table: string;
}
interface searchParamsProps {
   sort?: string;
   sortType?: string;
   hide?: string;
   limit?: string;
}

export const generateMetadata = async ({ params }: { params: paramsProps }): Promise<Metadata> => {
   return { title: `${params?.table}` };
};

const getTable = async (uuid: string, table: string, params: searchParamsProps) => {
   let client;
   try {
      const c = cookies();

      const databases = c.get("databases")?.value;
      if (!databases) return;

      const database = JSON.parse(databases);
      client = new pg.Client({
         application_name: "vuekoo/sql",
         connectionTimeoutMillis: 30000,
         connectionString: database?.[uuid]?.url,
      });

      await client.connect();
      const ordenation = params.sortType?.toLowerCase() === "desc" ? "DESC" : "ASC";
      const limit = params.limit?.replace(/\D/g, "") || DefaultQueryParams.limit;
      const res = await client.query(
         `SELECT * FROM ${table} as t ORDER BY ${
            params?.sort ? `t."${params?.sort}"` : 1
         } ${ordenation} LIMIT ${limit}`,
      );

      const hiddenColumns = params?.hide?.split(",") ?? [];
      res.fields = res.fields.filter((field: any) => !hiddenColumns.includes(field.name));
      return res;
   } catch (err) {
      console.error(err);
   } finally {
      await client?.end();
   }
};

export default async function Page({ params, searchParams }: { params: paramsProps; searchParams: searchParamsProps }) {
   const table = await getTable(params.database, params.table, searchParams);

   return (
      <Flex child="main" orientation="vertical" className="grow">
         <TableWrapper className="border-t border-t-zinc-200 dark:border-t-zinc-800">
            <DataTable fields={table?.fields as any} rows={table?.rows} />
         </TableWrapper>
         <DataTableToolbar rows={table?.rowCount} />
         {/* <Toolbar rows={table?.rowCount ?? undefined} /> */}
      </Flex>
   );
}

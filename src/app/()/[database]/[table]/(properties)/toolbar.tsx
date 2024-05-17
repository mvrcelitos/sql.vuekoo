"use client";

import { GetTableReturn } from "@/app/()/[database]/[table]/(properties)/page";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { AvailableSQLTypes, sqlToTypescript, sqlToZod } from "@/constants/sql-types";

export const exportToTypescript = (rows: GetTableReturn["rows"]) => {
   const formatted = rows.reduce((acc: Record<string, string>, cur) => {
      const type = sqlToTypescript?.[cur.Type as AvailableSQLTypes] ?? "any";
      acc[cur.Column] = type + (cur["Null?"] === "YES" && type != "any" ? " | null" : "");
      return acc;
   }, {});
   return JSON.stringify(formatted, null, 2);
};

export const exportToZod = (rows: GetTableReturn["rows"]) => {
   const formatted = rows.reduce((acc: Record<string, string>, cur) => {
      const type = sqlToZod?.[cur.Type as AvailableSQLTypes] ?? "any";
      acc[cur.Column] = type + (cur["Null?"] === "YES" && type != "z.any()" ? ".nullable()" : "");
      return acc;
   }, {});
   return JSON.stringify(formatted, null, 2)?.replace(/\"\:/g, '": ');
};

export const PropertiesDataTableToolbar = ({ rows }: { rows: GetTableReturn["rows"] }) => {
   return (
      <DataTableToolbar
         rows={rows?.length || 0}
         exportActions={{
            interface: {
               typescript: () => {
                  const text = exportToTypescript(rows);
                  navigator.clipboard.writeText(text);
               },
               zod: () => {
                  const text = exportToZod(rows);
                  navigator.clipboard.writeText(text);
               },
            },
         }}
      />
   );
};

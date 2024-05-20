"use client";

import { GetTableReturn } from "@/app/[database]/[table]/(properties)/page";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { AvailableSQLTypes, sqlToTypescript, sqlToZod } from "@/constants/sql-types";

interface exportFunctionsOptions {
   spacement?: number;
}

interface exportFunction {
   format: () => this;
   end: () => string;
}

export class ExportClass implements exportFunction {
   protected declare rows: GetTableReturn["rows"];
   protected declare formatted: Record<string, string>;
   protected declare options: exportFunctionsOptions;

   constructor(rows: GetTableReturn["rows"], options: exportFunctionsOptions = { spacement: 2 }) {
      this.rows = rows;
      this.options = options;
   }

   public static create(rows: GetTableReturn["rows"], options?: exportFunctionsOptions) {
      return new this(rows, options);
   }

   public format() {
      this.formatted = this?.rows.reduce((acc: Record<string, string>, cur) => {
         acc[cur.Column] = cur.Type?.replace(/\((.*)\)$/g, "");
         return acc;
      }, {});
      return this;
   }

   public end() {
      const json = JSON.stringify(this.formatted, null, this?.options?.spacement);
      return json.replace(/": "(.*)",?$/gm, (_, replace) => `": ${replace};`);
   }
}

export class ExportToTypescript extends ExportClass implements exportFunction {
   public format() {
      this.formatted = this?.rows.reduce((acc: Record<string, string>, cur) => {
         const type = sqlToTypescript?.[cur.Type?.replace(/\((.*)\)$/g, "") as AvailableSQLTypes] ?? "any";
         acc[cur.Column] = type + (cur["Null?"] === "YES" && type != "any" ? " | null" : "");
         return acc;
      }, {});
      return this;
   }
}

export class ExportToZod extends ExportClass implements exportFunction {
   public format() {
      this.formatted = this?.rows.reduce((acc: Record<string, string>, cur) => {
         const type = sqlToZod?.[cur.Type?.replace(/\((.*)\)$/g, "") as AvailableSQLTypes] ?? "any";
         acc[cur.Column] = type + (cur["Null?"] === "YES" && type != "z.any()" ? ".nullable()" : "");
         return acc;
      }, {});
      return this;
   }

   public override end() {
      const string = super.end();
      return string?.replace(/^\{/, "z.object({")?.replace(/\}$/, "})");
   }
}

export const PropertiesDataTableToolbar = ({ rows }: { rows: GetTableReturn["rows"] }) => {
   return (
      <DataTableToolbar
         rows={rows?.length || 0}
         exportActions={{
            interface: {
               typescript: () => {
                  const text = ExportToTypescript.create(rows).format().end();
                  navigator.clipboard.writeText(text);
               },
               zod: () => {
                  const text = ExportToZod.create(rows).format().end();
                  navigator.clipboard.writeText(text);
               },
            },
         }}
      />
   );
};

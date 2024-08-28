"server-only";

import { DatabaseClass } from "@/lib/database";

export interface RowProps {
   "Column": string;
   "Position": number;
   "Type": string;
   "Null?": boolean;
   "Default": string | number;
   "Comment": string;
}
export interface FieldProps {
   name: keyof RowProps;
   tableID: number;
   columnID: number;
   dataTypeID: number;
   dataTypeSize: number;
   dataTypeModifier: number;
   format: string;
}

export const getProperties = async function (database: DatabaseClass, table: string) {
   return await database.query<RowProps, FieldProps>(
      `SELECT c.column_name as "Column", c.ordinal_position as "Position", case when c.character_maximum_length > 0 then concat(c.udt_name,'(',c.character_maximum_length,')') else c.udt_name end as "Type", c.is_nullable as "Null?", c.column_default as "Default", replace(pgd.description,'
','\n') as "Comment"
         FROM pg_catalog.pg_statio_all_tables as st
         INNER JOIN pg_catalog.pg_description pgd on pgd.objoid = st.relid
         RIGHT JOIN information_schema.columns c on pgd.objsubid = c.ordinal_position and c.table_schema = st.schemaname and c.table_name = st.relname
         WHERE c.table_schema = 'public' and c.table_name = $1
         ORDER BY c.ordinal_position`,
      [table],
   );
};

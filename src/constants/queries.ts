interface CreateTableConfig {
   name: string;
   columns: {
      name: string;
      type: string;
      unique?: boolean;
      notNull?: boolean;
      primaryKey?: boolean;
      default?: string;
   }[];
}

export const queries = {
   psql: {
      table: {
         create: (config: CreateTableConfig) => `CREATE TABLE IF NOT EXISTS ${config.name} ( )`,
         rename: (config: { old: string; new: string }) => `ALTER TABLE ${config.old} RENAME TO ${config.new}`,
         delete: (config: { name: string }) => `DROP TABLE IF EXISTS ${config.name}`,
      },
   },
   mysql: {
      table: {
         create: (config: CreateTableConfig) => `CREATE TABLE IF NOT EXISTS ${config.name} ( )`,
         rename: (config: { old: string; new: string }) => `ALTER TABLE ${config.old} RENAME TO ${config.new}`,
         delete: (config: { name: string }) => `DROP TABLE IF EXISTS ${config.name}`,
      },
   },
} as const;

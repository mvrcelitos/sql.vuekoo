export const availableDatabaseIds = ["psql", "mysql"] as const;
export type AvailableDatabaseIds = (typeof availableDatabaseIds)[number];

export const availableDatabases = [
   {
      id: "psql" satisfies AvailableDatabaseIds,
      label: "PostgreSQL",
      protocol: "postgresql",
   },
   {
      id: "mysql" satisfies AvailableDatabaseIds,
      label: "MySQL",
      protocol: "mysql",
   },
] as const;

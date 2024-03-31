export type DatabaseType = {
   uuid: string;
   name: string;
   url: string;
   created_at: string;
   updated_at: string;
};

export type DatabasesType = Record<string, DatabaseType>;

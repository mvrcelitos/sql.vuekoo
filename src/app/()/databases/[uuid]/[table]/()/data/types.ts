export interface paramsProps {
   uuid: string;
   table: string;
}

export interface searchParamsProps {
   sort?: string;
   sortType?: string;
   hide?: string;
   limit?: string;
}

export interface GetTableQueryReturn {
   "Column": string;
   "Position": number;
   "Type": string;
   "Null?": boolean;
   "Default": string | number;
   "Comment": string;
}

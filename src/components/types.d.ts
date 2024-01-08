type DatabaseType = {
   name: string;
   url: string;
   uuid: string;
   // connected: string;
   status: "connected" | "disconnected" | "connecting" | "refreshing" | "error";
   tables?: string[];
   // tables?: Record<string, any>[];
   views?: string[];
   indexes?: string[];
   functions?: string[];
   triggers?: string[];
};

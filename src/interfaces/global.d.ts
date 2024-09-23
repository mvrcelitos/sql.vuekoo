declare global {
   namespace Server {
      export interface ActionResponse<T extends unknown = unknown> {
         ok: true | false;
         message: string;
         meta?: T;
      }
   }
}

export default global;

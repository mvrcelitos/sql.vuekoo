export class SearchParamsManager {
   private declare _obj: Record<any, any>;

   constructor() {
      this._obj = Object.fromEntries(new URLSearchParams(window.location.search).entries());
      console.log(this._obj);
   }

   public get(key: string): any {
      return this._obj[key];
   }

   public set(key: string, value: any) {
      this._obj[key] = value;
      return this;
   }

   public delete(key: string) {
      delete this._obj[key];
      return this;
   }

   public end() {
      return this._obj;
   }

   public toString(): string {
      return Object.entries(this._obj)
         .reduce((acc: string[], [key, value]: any[]) => {
            return [...acc, `${key}=${value}`];
         }, [])
         .join("&");
   }
}

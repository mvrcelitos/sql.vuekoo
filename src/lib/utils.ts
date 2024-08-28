import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
   return twMerge(clsx(inputs));
};

export class localStorage {
   declare storage: any;

   get(key: string) {
      if (typeof window == "undefined") return this;
      this.storage = window.localStorage.getItem(key);
      return this;
   }

   // set the internal storage data
   set(value: any) {
      this.storage = value;
      return this;
   }

   // add item to local storage
   add(key: string, value?: string) {
      if (typeof window == "undefined") return this;
      window.localStorage.setItem(
         key,
         value ?? typeof this.storage == "string" ? this.storage : JSON.stringify(this.storage),
      );
      return this;
   }

   parse(value?: string) {
      try {
         this.storage = JSON.parse(value ?? this.storage);
      } catch (err) {
         console.error(err);
         this.storage = undefined;
      }
      return this;
   }

   stringify(value?: any) {
      try {
         this.storage = JSON.stringify(value ?? this.storage);
      } catch (err) {
         console.error(err);
         this.storage = undefined;
      }
      return this;
   }

   remove(key: string) {
      if (typeof window == "undefined") return this;
      window.localStorage.removeItem(key);
      return this;
   }

   clear() {
      if (typeof window == "undefined") return this;
      window.localStorage.clear();
      return this;
   }

   end() {
      return this.storage;
   }
}

export const tryCatch = <T extends unknown, F extends unknown>(fn: () => T, fallback: F) => {
   try {
      return fn?.();
   } catch (error) {
      return fallback;
   }
};

export const tryCatchAsync = async <T extends unknown, F extends unknown>(fn: () => Promise<T>, fallback: F) => {
   try {
      return await fn?.();
   } catch (error) {
      return fallback;
   }
};

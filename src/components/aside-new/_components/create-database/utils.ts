import {
   DatabaseConnectionParamsReturn,
   databaseConnectionParamsSchema,
} from "@/components/aside-new/_components/create-database/schema";
import { availableDatabases } from "@/constants/available-databases";

type PasteURLReturn = { message: string } & ({ ok: true; data: DatabaseConnectionParamsReturn } | { ok: false });

export const pasteURL = async (): Promise<PasteURLReturn> => {
   const clipboardText = await navigator.clipboard.readText();
   if (!clipboardText) {
      return { ok: false, message: "Clipboard is empty" };
   }

   const matched = clipboardText?.match(
      // @ts-ignore
      /(?<protocol>\w+(?=:\/{2}))?(?::\/{2})?(?<username>\w+?(?=:[^@\/]))\:(?<password>[^@]+?(?=@))(?:@)(?<host>.*?(?=:\d))(?::)(?<port>\d+(?=\/))(?:\/)(?<database>[^?]+(?=$|(\?.*)?))/,
   );
   if (!matched) return { ok: false, message: "Invalid URL" };

   let res: Record<string, string | number> = {};

   if (matched?.groups?.protocol) {
      const database = availableDatabases.find((x) => x.protocol == matched?.groups?.protocol);
      if (database) res["type"] = database.id;
   }
   res["host"] = matched?.groups?.host!;
   res["port"] = +matched?.groups?.port!;
   res["database"] = matched?.groups?.database!;
   res["username"] = matched?.groups?.username!;
   res["password"] = matched?.groups?.password!;

   const safeParse = databaseConnectionParamsSchema.safeParse(res);
   if (safeParse.success !== true) return { ok: false, message: "Invalid URL" };

   return { ok: true, message: "URL successfully pasted", data: safeParse.data } as const;
};

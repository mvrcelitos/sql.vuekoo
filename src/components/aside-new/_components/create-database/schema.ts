import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { availableDatabaseIds } from "@/constants/available-databases";

export const databaseConnectionParamsSchema = z.object({
   type: z.enum(availableDatabaseIds, { invalid_type_error: "Invalid value" }),
   host: z
      .string({
         invalid_type_error: "Invalid value",
         required_error: "Host can't be blank",
      })
      .min(1, "Host can't be blank"),
   port: z.coerce
      .number({
         invalid_type_error: "Invalid value",
         required_error: "Can't be blank",
      })
      .min(1, "Can't be blank"),
   database: z
      .string({
         invalid_type_error: "Invalid value",
         required_error: "Database can't be blank",
      })
      .min(1, "Database can't be blank"),
   username: z
      .string({
         invalid_type_error: "Invalid value",
         required_error: "Username can't be blank",
      })
      .min(1, "Username can't be blank"),
   password: z
      .string({
         invalid_type_error: "Invalid value",
         required_error: "Password can't be blank",
      })
      .min(1, "Password can't be blank"),
});

export const createDatabaseFormSchema = z
   .object({
      name: z
         .string({
            invalid_type_error: "Invalid value",
            required_error: "Name can't be blank",
         })
         .min(1, "Name can't be blank"),
   })
   .and(databaseConnectionParamsSchema);

export type CreateDatabaseFormInput = z.input<typeof createDatabaseFormSchema>;
export type CreateDatabaseFormReturn = z.infer<typeof createDatabaseFormSchema>;

export type DatabaseConnectionParamsInput = z.input<typeof databaseConnectionParamsSchema>;
export type DatabaseConnectionParamsReturn = z.infer<typeof databaseConnectionParamsSchema>;

export const databaseSchema = z
   .object({
      uuid: z
         .string()
         .uuid()
         .optional()
         .transform((x) => (x ? x : uuidv4())),
      name: z
         .string({
            invalid_type_error: "Invalid value",
            required_error: "Name can't be blank",
         })
         .min(1, "Name can't be blank"),
      readOnly: z
         .boolean({
            invalid_type_error: "Invalid value",
            required_error: "Read only can't be blank",
         })
         .optional()
         .default(false),

      created_at: z
         .string()
         .datetime()
         .nullish()
         .transform((x) => (x === undefined || x === null ? new Date().toISOString() : x)),
      updated_at: z.string().datetime().nullable().default(null),
   })
   .and(databaseConnectionParamsSchema);

export const databasesSchema = z.array(databaseSchema);

export type DatabaseReturn = z.infer<typeof databaseSchema>;
export type DatabasesReturn = z.infer<typeof databasesSchema>;

export const testConnectionSchema = z.object({
   host: z
      .string({
         invalid_type_error: "Invalid value",
         required_error: "Host can't be blank",
      })
      .min(1, "Host can't be blank"),
   port: z.coerce
      .number({
         invalid_type_error: "Invalid value",
         required_error: "Port can't be blank",
      })
      .min(1, "Port can't be blank")
      .optional()
      .default(5432),
   database: z
      .string({
         invalid_type_error: "Invalid value",
         required_error: "Database can't be blank",
      })
      .min(1, "Database can't be blank"),
   username: z
      .string({
         invalid_type_error: "Invalid value",
         required_error: "Username can't be blank",
      })
      .min(1, "Username can't be blank"),
   password: z
      .string({
         invalid_type_error: "Invalid value",
         required_error: "Password can't be blank",
      })
      .min(1, "Password can't be blank"),
});

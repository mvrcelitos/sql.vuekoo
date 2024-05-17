import { z } from "zod";

export const createDatabaseFormSchema = z.object({
   type: z.enum(["psql", "mysql"]),
   name: z
      .string({
         invalid_type_error: "Invalid value",
         required_error: "Name can't be blank",
      })
      .min(1, "Name can't be blank")
      .min(3, "Name too short, they must have at least 3 characters"),
   url: z
      .string({
         invalid_type_error: "Invalid value",
         required_error: "URL can't be blank",
      })
      .min(1, "URL can't be blank")
      .min(8, "URL must have at least 8 characters"),
});

export type CreateDatabaseFormInput = z.input<typeof createDatabaseFormSchema>;
export type CreateDatabaseFormReturn = z.infer<typeof createDatabaseFormSchema>;

export const DatabasesSchema = z.array(
   z.object({
      uuid: z.string(),
      name: z.string(),
      url: z.string(),
      created_at: z.string().date(),
      updated_at: z.string().date(),
   }),
);

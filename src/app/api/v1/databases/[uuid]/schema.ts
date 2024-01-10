import { z } from "zod";

export const postSchema = z.object({
   sql: z
      .string({
         invalid_type_error: "Invalid SQL",
         required_error: "SQL is required",
      })
      .min(1, "SQL is required"),
});

export interface postSchemaReturn extends z.infer<typeof postSchema> {}

export const putSchema = z.object({
   name: z
      .string({
         invalid_type_error: "Invalid name",
         required_error: "Name is required",
      })
      .min(1, "Name is required")
      .optional(),
   url: z
      .string({
         invalid_type_error: "Invalid URL",
         required_error: "URL is required",
      })
      .min(3, "URL is required")
      .optional(),
   created_at: z.string().optional(),
   updated_at: z.string(),
});
export interface putSchemaReturn extends Partial<z.infer<typeof putSchema>> {}

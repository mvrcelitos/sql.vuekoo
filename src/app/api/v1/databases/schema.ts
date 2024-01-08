import { z } from "zod";

export const postSchema = z.object({
   uuid: z
      .string({
         invalid_type_error: "Invalid UUID",
         required_error: "UUID is required",
      })
      .min(1, "UUID is required")
      .uuid("Invalid UUID"),
   name: z
      .string({
         invalid_type_error: "Invalid name",
         required_error: "Name is required",
      })
      .min(1, "Name is required"),
   url: z
      .string({
         invalid_type_error: "Invalid URL",
         required_error: "URL is required",
      })
      .min(3, "URL is required"),
   created_at: z.string(),
   updated_at: z.string(),
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

import * as z from "zod";

export const addDatabase = z.object({
   name: z
      .string({
         invalid_type_error: "Invalid name",
         required_error: "Name is required, can't be blank",
      })
      .min(1, "Name is required, can't be blank")
      .min(3, "Name must be at least 3 characters long"),
   url: z
      .string({
         invalid_type_error: "Invalid URL",
         required_error: "URL is required, can't be blank",
      })
      .min(1, "URL is required, can't be blank")
      .min(8, "URL must be at least 8 characters long"),
});

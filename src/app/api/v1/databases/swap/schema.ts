import { z } from "zod";

export const swapSchema = z.object({
   from: z.coerce.number({
      invalid_type_error: "Invalid 'from'",
      required_error: "'From' is required",
   }),
   to: z.coerce.number({
      invalid_type_error: "Invalid 'to'",
      required_error: "'To' is required",
   }),
});

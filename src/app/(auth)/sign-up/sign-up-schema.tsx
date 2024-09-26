import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const SignUpFormSchema = z.object({
   name: z
      .string({
         invalid_type_error: "Invalid type",
      })
      .min(1, "Can't be blank")
      .min(3, "Too short")
      .max(255, "Too long"),
   username: z
      .string({
         invalid_type_error: "Invalid type",
      })
      .min(1, "Can't be blank")
      .min(3, "Too short")
      .max(64, "Too long"),
   email: z
      .string({
         invalid_type_error: "Invalid type",
      })
      .min(1, "Can't be blank")
      .email("Isn't a valid email")
      .max(255, "Too long"),
   password: z
      .string({
         invalid_type_error: "Invalid type",
      })
      .min(1, "Can't be blank")
      .min(4, "Too short")
      .max(128, "Too long"),
});

export type SignUpFormReturn = z.infer<typeof SignUpFormSchema>;
export const SignUpFormResolver = zodResolver(SignUpFormSchema);

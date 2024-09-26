import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const SignInFormSchema = z.object({
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
      .max(255, "Too long")
      .optional(),
});

export type SignInFormReturn = z.infer<typeof SignInFormSchema>;
export const SignInFormResolver = zodResolver(SignInFormSchema);

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const SignInFormSchema = z.object({
   email: z.string().min(1).email(),
   password: z.string().min(4).max(255).optional(),
});

export type SignInFormReturn = z.infer<typeof SignInFormSchema>;
export const SignInFormResolver = zodResolver(SignInFormSchema);

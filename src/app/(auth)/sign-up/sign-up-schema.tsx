import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const SignUpFormSchema = z.object({
   name: z.string().min(3).max(255).optional(),
   username: z.string().min(3).max(255),
   email: z.string().min(1).email(),
   password: z.string().min(4).max(255),
});

export type SignUpFormReturn = z.infer<typeof SignUpFormSchema>;
export const SignUpFormResolver = zodResolver(SignUpFormSchema);

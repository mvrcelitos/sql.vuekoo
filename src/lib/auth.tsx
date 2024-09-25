"use server";

import { cookies } from "next/headers";
import { z } from "zod";

declare namespace Auth {
   interface User {
      sub: number;
      username: string;
      email: string;
   }
}

const TokenSchema = z
   .string({
      required_error: "Token not found",
      invalid_type_error: "Invalid token value",
   })
   .min(10, "Token too short");
export const GetUserOrThrow = async (): Promise<Auth.User | never> => {
   const c = cookies();
   TokenSchema.parse(c.get(process.env.AUTH_KEY!)?.value);
   return {
      sub: 1,
      username: "test",
      email: "test@gmail.com",
   };
};

export const GetUser = async (): Promise<Auth.User | null> => await GetUserOrThrow().catch(() => null);

"use server";

import { SignUpFormReturn } from "./sign-up-schema";

export const SignUp = async (data: SignUpFormReturn): Promise<Server.ActionResponse> => {
   return {
      ok: true,
      message: "Signed up",
   };
};

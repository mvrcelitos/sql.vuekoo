"use server";

import { SignInFormReturn } from "./sign-in-schema";

export const CheckEmailExists = async (data: SignInFormReturn): Promise<Server.ActionResponse> => {
   return {
      ok: true,
      message: "Email exists",
   };
};

export const SignIn = async (data: SignInFormReturn): Promise<Server.ActionResponse> => {
   return {
      ok: true,
      message: "Signed in",
   };
};

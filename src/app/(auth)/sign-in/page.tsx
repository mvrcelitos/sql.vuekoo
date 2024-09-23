import Link from "next/link";

import { SignInForm } from "./sign-in-form";

export default function Page() {
   return (
      <div className="flex grow flex-col items-center justify-center gap-4 px-4">
         <div className="flex w-full flex-col gap-4 xs:max-w-sm">
            <div className="text-center">
               <h1 className="text-2xl font-bold">Hello</h1>
               <span className="text-sm text-c500">Welcome back, we missed you!</span>
            </div>
            <SignInForm />
         </div>
         <p className="text-center text-sm text-c500">
            Are you new here?{" "}
            <Link
               href={"/sign-up"}
               className="text-primary outline-none transition-colors hover:underline focus-visible:underline">
               Create an account
            </Link>
         </p>
      </div>
   );
}

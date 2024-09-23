import Link from "next/link";

import { SignUpForm } from "./sign-up-form";

export default function Page() {
   return (
      <div className="flex grow flex-col items-center justify-center gap-4 px-4">
         <div className="flex w-full flex-col gap-4 xs:max-w-sm">
            <div className="text-center">
               <h1 className="text-2xl font-bold">First time?</h1>
               <span className="text-sm text-c500">Enter your credentials to create an account.</span>
            </div>
            <SignUpForm />
         </div>
         <p className="text-center text-sm text-c500">
            Already have an account?{" "}
            <Link
               href={"/sign-in"}
               className="text-primary outline-none transition-colors hover:underline focus-visible:underline">
               Sign in
            </Link>
         </p>
      </div>
   );
}

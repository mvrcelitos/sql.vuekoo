import { FlexDiv } from "@/components/ui/layout";

export default function Page() {
   return (
      <FlexDiv child="main" orientation="center" className="flex-col p-4 text-foreground">
         <span className="mb-2 text-5xl">👋</span>
         <h1 className="text-xl font-semibold uppercase">WELCOME!</h1>
         <p className="text-sm opacity-70">More about this application is being written...</p>
      </FlexDiv>
   );
}

import { FlexDiv } from "@/components/ui/layout";

export default function NotFound() {
   return (
      <FlexDiv child="main" orientation="center" className="max-h-[100dvh-37px]">
         <FlexDiv className="w-auto items-center gap-2">
            <span className="select-none text-4xl duration-150 active:scale-95">😰</span>
            <p className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50">NOT FOUND</p>
         </FlexDiv>
      </FlexDiv>
   );
}

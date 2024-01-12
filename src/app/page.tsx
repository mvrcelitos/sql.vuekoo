import { Flex } from "@/components/ui/layout";

export default function Page() {
   return (
      <Flex orientation="center" className="flex-col p-4 text-foreground">
         <span className="mb-2 text-5xl">👀</span>
         <h1 className="text-xl font-bold uppercase">SELECT A DATABASE TO START</h1>
         <p className="text-sm opacity-70">You can register a database too!</p>
      </Flex>
   );
}

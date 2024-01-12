import { Flex } from "@/components/ui/layout";

import { ScriptResult } from "./_components/script-result";
import { ScriptTextArea } from "./_components/script-textarea";
import { Toolbar } from "./_components/toolbar";

export default function Page() {
   return (
      <Flex child="main" orientation="vertical" className="grow gap-2 md:gap-4">
         <Flex className="shrink-0 grow gap-2 px-4 pt-4 last:pb-4 md:gap-4">
            <ScriptTextArea />
            <Toolbar />
         </Flex>

         <ScriptResult />
      </Flex>
   );
}

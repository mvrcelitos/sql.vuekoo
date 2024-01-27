import { Flex } from "@/components/ui/layout";

import { ScriptResult } from "./_components/script-result";
import { ScriptTextArea } from "./_components/script-textarea";
import { Toolbar } from "./_components/toolbar";

export default function Page() {
   return (
      <Flex child="main" orientation="vertical" className="grow">
         <div className="flex w-full shrink-0 grow overflow-hidden">
            <Toolbar />
            <ScriptTextArea />
         </div>

         <ScriptResult />
      </Flex>
   );
}

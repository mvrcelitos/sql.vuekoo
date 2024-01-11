import { Redo2, Undo2 } from "lucide-react";

import { ScriptResult } from "@/app/[database]/script/_components/script-result";
import { Button } from "@/components/ui/button";
import { FlexDiv } from "@/components/ui/layouts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { ClearButton, SubmitButton } from "./_components/buttons";
import { ScriptTextArea } from "./_components/script-textarea";

export default function Page() {
   return (
      <main className="flex h-full grow flex-col gap-2 overflow-hidden p-6 md:gap-4">
         <FlexDiv className="gap-2 md:gap-4">
            <FlexDiv orientation="vertical" className="shrink-0 gap-2">
               <Tooltip>
                  <TooltipTrigger asChild>
                     <SubmitButton />
                  </TooltipTrigger>
                  <TooltipContent>Run your script</TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button disabled intent="outline" size="icon-sm">
                        <Redo2 className="h-4 w-4 shrink-0" height={16} width={16} />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Redo your last action</TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button disabled intent="outline" size="icon-sm">
                        <Undo2 className="h-4 w-4 shrink-0" height={16} width={16} />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Undo the last action</TooltipContent>
               </Tooltip>

               <Tooltip>
                  <TooltipTrigger asChild>
                     <ClearButton />
                  </TooltipTrigger>
                  <TooltipContent>Clears all the content</TooltipContent>
               </Tooltip>
            </FlexDiv>
            <ScriptTextArea />
         </FlexDiv>

         <ScriptResult />
      </main>
   );
}

import { Redo2, Undo2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { ClearButton } from "./_components/buttons/clear";
import { SubmitButton } from "./_components/buttons/submit";
import { ScriptTextArea } from "./_components/script-text-area";

export default function Page() {
   return (
      <main className="grid h-full grow grid-cols-1 grid-rows-[max-content] gap-2 p-6 md:gap-4">
         <div data-toolbar className="flex w-full items-center gap-2">
            <Tooltip>
               <TooltipTrigger asChild>
                  <ClearButton />
               </TooltipTrigger>
               <TooltipContent>Clears all the content</TooltipContent>
            </Tooltip>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button intent="outline" size="icon-sm">
                     <Undo2 className="h-4 w-4 shrink-0" height={16} width={16} />
                  </Button>
               </TooltipTrigger>
               <TooltipContent>Undo the last action</TooltipContent>
            </Tooltip>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button intent="outline" size="icon-sm">
                     <Redo2 className="h-4 w-4 shrink-0" height={16} width={16} />
                  </Button>
               </TooltipTrigger>
               <TooltipContent>Redo your last action</TooltipContent>
            </Tooltip>
            <Tooltip>
               <TooltipTrigger asChild>
                  <SubmitButton />
               </TooltipTrigger>
               <TooltipContent>Run your script</TooltipContent>
            </Tooltip>
         </div>
         <ScriptTextArea />
      </main>
   );
}

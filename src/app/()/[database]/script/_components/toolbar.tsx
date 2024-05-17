import { Flex } from "@/components/ui/layout";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { ClearButton, SubmitButton } from "./buttons";

export const Toolbar = () => {
   return (
      <Flex orientation="vertical" className="shrink-0 gap-2 border-r border-zinc-200 p-2 dark:border-zinc-800">
         <Tooltip>
            <TooltipTrigger asChild>
               <SubmitButton />
            </TooltipTrigger>
            <TooltipContent>Run your script</TooltipContent>
         </Tooltip>

         <Tooltip>
            <TooltipTrigger asChild>
               <ClearButton />
            </TooltipTrigger>
            <TooltipContent>Clears all the content</TooltipContent>
         </Tooltip>
      </Flex>
   );
};

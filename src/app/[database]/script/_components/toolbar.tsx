import { FlexDiv } from "@/components/ui/layout";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { ClearButton, SubmitButton } from "./buttons";

export const Toolbar = () => {
   return (
      <FlexDiv orientation="vertical" className="shrink-0 gap-2">
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
      </FlexDiv>
   );
};

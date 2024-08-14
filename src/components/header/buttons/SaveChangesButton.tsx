import { useScriptStore } from "@/app/()/[database]/script/_components/use-script-store";
import { useScript } from "@/components/script-dialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Save } from "lucide-react";

export const SaveChangesButton = () => {
   const { scriptArr, show } = useScript();

   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <Button
               disabled={scriptArr?.length === 0}
               intent="ghost"
               size="icon-xs"
               className="rounded-none hocus:bg-accent hocus:shadow-inner"
               onClick={() => {
                  show();
               }}>
               <Save className="size-4 shrink-0" />
            </Button>
         </TooltipTrigger>
         <TooltipContent>Save changes</TooltipContent>
      </Tooltip>
   );
};

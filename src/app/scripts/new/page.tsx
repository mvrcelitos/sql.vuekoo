import { Form } from "@/components/form-components";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/textarea";
import { TooltipContent, Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronRight, Play, Redo2, Undo2, X } from "lucide-react";

export default function Page() {
   return (
      <main className="grid h-full grow grid-cols-1 grid-rows-[max-content] gap-2 p-6 md:gap-4">
         <div data-toolbar className="flex w-full items-center gap-2">
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button intent="outline" size="icon-sm">
                     <X className="h-4 w-4 shrink-0" height={16} width={16} />
                  </Button>
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
                  <Button intent="outline" size="icon-sm" className="group/button ml-auto">
                     <div className="relative h-4 w-4 shrink-0">
                        <ChevronRight
                           className="absolute inset-y-0 left-0 h-4 w-4 shrink-0 duration-150 group-hover/button:left-[4px]"
                           height={16}
                           width={16}
                        />
                        <div className="absolute right-[8px] top-1/2 h-px w-0 -translate-x-full -translate-y-1/2 bg-zinc-700 duration-150 group-hover/button:-right-[7px] group-hover/button:w-2.5 dark:bg-zinc-50" />
                     </div>
                  </Button>
               </TooltipTrigger>
               <TooltipContent>Run your script</TooltipContent>
            </Tooltip>
         </div>
         <TextArea className="h-full w-full grow" intent="primary" />
      </main>
   );
}

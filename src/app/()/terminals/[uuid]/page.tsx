import { TerminalResults } from "./_components/terminal-results";
import { TerminalToolbar } from "./_components/terminal-toolbar";
import { TerminalTextArea } from "./_components/terminal-textarea";

export default function Page() {
   return (
      <main className="relative flex h-full flex-initial grow flex-col overflow-hidden">
         <TerminalToolbar />
         <TerminalTextArea />
         <TerminalResults />
      </main>
   );
}

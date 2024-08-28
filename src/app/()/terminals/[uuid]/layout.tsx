import { TerminalProvider } from "@/app/()/terminals/[uuid]/context";

export default function Layout({ children }: React.PropsWithChildren) {
   return <TerminalProvider>{children}</TerminalProvider>;
}

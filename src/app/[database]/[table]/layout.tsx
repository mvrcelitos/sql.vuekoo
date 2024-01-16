import { Toolbar } from "./_components/toolbar";

export default function Layout({ children }: React.PropsWithChildren) {
   return (
      <div className="flex w-full flex-auto flex-col overflow-hidden">
         <Toolbar />
         {children}
      </div>
   );
}

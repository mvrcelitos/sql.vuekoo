import { Aside } from "./_components/aside";

export default function Layout({ children }: React.PropsWithChildren) {
   return (
      <div className="flex grow overflow-hidden">
         <Aside />
         {children}
      </div>
   );
}

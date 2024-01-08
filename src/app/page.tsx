export default function Page() {
   return (
      <main className="grid h-full grow grid-cols-1 gap-2 p-6 md:gap-4">
         <div className="flex h-full flex-col items-center justify-center text-foreground">
            {/* <span className="text-4xl"></span> */}
            <span className="mb-2 text-5xl">👀</span>
            <h1 className="text-xl font-semibold uppercase">SELECT A DATABASE TO START</h1>
            <p className="text-sm opacity-70">You can register a database too!</p>
         </div>
      </main>
   );
}

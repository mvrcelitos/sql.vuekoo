export default function NotFound() {
   return (
      <main className="grid h-full max-h-[100dvh-37px] w-full grid-cols-1 place-items-center">
         <div className="flex items-center gap-2">
            <span className="select-none text-4xl duration-150 active:scale-95">😰</span>
            <p className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50">NOT FOUND</p>
         </div>
      </main>
   );
}

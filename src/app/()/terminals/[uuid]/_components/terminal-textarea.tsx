"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { useTerminalContext } from "@/app/()/terminals/[uuid]/context";
import { TextArea } from "@/components/ui/textarea";

interface FormatLineReturn {
   type: "empty" | "oneline-comment" | "region-comment" | "block";
   start?: boolean | undefined;
   end?: boolean | undefined;
   text: string;
   length: number;
   blockIndex?: number;
}

export const TerminalTextArea = () => {
   const { submit, ref } = useTerminalContext();
   const pathname = usePathname();
   const uuid = pathname.split("/").pop();

   return useMemo(() => {
      return (
         <>
            <TextArea
               ref={ref}
               key={uuid}
               intent="none"
               className="flex-1 resize-none transition-none md:min-h-[6rem]"
               placeholder="Type some sql on me..."
               onKeyDown={(ev) => {
                  const selected = window.getSelection()?.toString();

                  if (ev.key === "Enter" && ev.ctrlKey) {
                     ev.preventDefault();
                     ev.stopPropagation();
                     return submit(selected || ev.currentTarget.value);
                  }

                  let blockIndex: number = 0;
                  const formatLine = ({
                     before,
                     line,
                     next: nextLine,
                  }: {
                     before?: FormatLineReturn;
                     line: string;
                     next?: string;
                  }): FormatLineReturn => {
                     if (line?.startsWith("--")) return { type: "oneline-comment", text: line, length: line.length };
                     if (line?.startsWith("/*") && line?.endsWith("*/"))
                        return { type: "oneline-comment", end: true, text: line, length: line.length };
                     if (line?.startsWith("/*"))
                        return { type: "region-comment", start: true, text: line, length: line.length };
                     if (line?.endsWith("*/"))
                        return { type: "region-comment", end: true, text: line, length: line.length };
                     if (before?.type === "region-comment" && !before?.end)
                        return { type: "region-comment", text: line, length: line.length };

                     if (line?.length === 0) return { type: "empty", text: line, length: 0 };

                     if (!before || before?.type !== "block") {
                        const bef: FormatLineReturn = {
                           type: "block",
                           start: true,
                           text: line,
                           length: line.length,
                           blockIndex,
                        };
                        if (!nextLine || formatLine({ before: bef, line: nextLine }).type != "block") {
                           return {
                              type: "block",
                              start: true,
                              end: true,
                              text: line,
                              length: line.length,
                              blockIndex: blockIndex++,
                           };
                        }
                        return { type: "block", start: true, text: line, length: line.length, blockIndex };
                     }

                     if (!nextLine || formatLine({ line: nextLine }).type != "block")
                        return { type: "block", end: true, text: line, length: line.length, blockIndex: blockIndex++ };

                     return { type: "block", text: line, length: line.length, blockIndex };
                  };
                  const formattedLines = ev.currentTarget.value
                     .split(/\n/g)
                     .reduce<FormatLineReturn[]>((acc, cur, idx, arr) => {
                        const line = cur?.trim();
                        return [...acc, formatLine({ line, before: acc?.[idx - 1], next: arr?.[idx + 1] })];
                     }, []);

                  console.log({ formattedLines });

                  if (ev.key === "ArrowUp" && ev.altKey) {
                     ev.preventDefault();
                     ev.stopPropagation();
                     const value = ev.currentTarget.value;
                     const current = value.slice(0, ev.currentTarget.selectionStart).split(/\n/g).length - 1;
                     const lines = value.split(/\n/g).reduce<string[]>((acc, cur, idx, arr) => {
                        if (idx === arr.length - 1) return [...acc, cur];
                        if (cur.trim()?.length > 0 && arr[idx + 1].trim()?.length > 0) return [...acc, ""];
                        return [...acc, cur];
                     }, []);

                     const next =
                        (current > 0 && lines.slice(0, current).findLastIndex((v) => v?.trim()?.length > 0)) || 0;
                     if (current === next) return;

                     // place the caret on the next line
                     const nextLine = lines[next];
                     const nextLineIndex = value.lastIndexOf(`${nextLine}\n`, ev.currentTarget.selectionStart - 1);
                     ev.currentTarget.selectionStart = nextLineIndex;
                     ev.currentTarget.selectionEnd = nextLineIndex;
                  }

                  if (ev.key === "ArrowDown" && ev.altKey) {
                     ev.preventDefault();
                     ev.stopPropagation();
                     const value = ev.currentTarget.value;
                     const current = value.slice(0, ev.currentTarget.selectionStart).split(/\n/g).length - 1;
                     const lines = value.split(/\n/g).reduceRight<string[]>((acc, cur, idx, arr) => {
                        if (idx === 0) return [cur, ...acc];
                        if (cur.trim()?.length > 0 && arr[idx - 1].trim()?.length > 0) return ["", ...acc];
                        return [cur, ...acc];
                     }, []);

                     console.log({ lines });

                     const difference =
                        (lines?.length > current && lines.slice(current + 1).findIndex((v) => v?.trim()?.length > 0)) ||
                        -1;
                     const next = current + 1 + difference;
                     if (current === next) return;

                     // place the caret on the next line
                     const nextLine = lines[next];
                     const nextLineIndex = value.indexOf(`\n${nextLine}`, ev.currentTarget.selectionStart + 1) + 1;
                     ev.currentTarget.selectionStart = nextLineIndex;
                     ev.currentTarget.selectionEnd = nextLineIndex;
                  }
               }}
            />
         </>
      );
   }, [uuid]);
};

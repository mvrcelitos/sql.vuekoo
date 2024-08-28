"use client";

import { useCallback, useEffect, useState } from "react";

export const getWidth = () => {
   const [width, setWidth] = useState<number>(0);

   useEffect(() => {
      if (typeof window === "undefined") return;
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   return width;
};

export const getHeight = () => {
   const [height, setHeight] = useState<number | null>(null);

   useEffect(() => {
      if (typeof window === "undefined") return;
      setHeight(window.innerHeight);
      const handleResize = () => setHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   return height;
};

export const getMeasures = () => {
   return { width: getWidth(), height: getHeight() };
};

const breakpoints = {
   "xs": 480,
   "sm": 640,
   "md": 768,
   "lg": 1024,
   "xl": 1280,
   "2xl": 1536,
} as const;

// export const getBreakpoints = () => {
//    const [value, setValue] = useState<keyof typeof breakpoints | null>(null);

//    const handleResize = useCallback(() => {
//       const entries = Object.entries(breakpoints);
//       const result = entries.reduce((acc, cur) => {
//          if (cur[1] < window.innerWidth) return acc;
//          return cur[1] < acc[1] ? cur : acc;
//       }, entries[0]);
//       setValue(result[0] as keyof typeof breakpoints);
//    }, []);

//    useEffect(() => {
//       if (typeof window === "undefined") return;
//       // setValue(window.innerWidth >= breakpoints[breakpoint]);
//       window.addEventListener("resize", handleResize);
//       return () => window.removeEventListener("resize", handleResize);
//    }, []);
// };

export const getBreakpoint = (breakpoint: keyof typeof breakpoints) => {
   const [value, setValue] = useState<boolean>(false);
   const breakpointWidth = breakpoints[breakpoint];

   const handleResize = useCallback(() => {
      setValue(window.innerWidth >= breakpointWidth);
   }, []);

   useEffect(() => {
      if (typeof window === "undefined") return;
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   return value;
};

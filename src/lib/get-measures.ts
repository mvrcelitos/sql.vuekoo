"use client";

import { useEffect, useState } from "react";

export const getWidth = () => {
   const [width, setWidth] = useState<number>(0);

   useEffect(() => {
      if (typeof window === "undefined") return;
      setWidth(window.innerWidth);
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
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
};
export const getBreakpoint = (breakpoint: keyof typeof breakpoints) => {
   const width = getWidth();
   return width >= breakpoints[breakpoint];
};

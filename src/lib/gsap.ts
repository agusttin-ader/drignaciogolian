"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function initGsap() {
  if (registered || typeof window === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export const motionEase = {
  reveal: "power3.out",
  scroll: "power2.inOut",
  hover: "power2.out",
} as const;

export { gsap, ScrollTrigger, useGSAP };

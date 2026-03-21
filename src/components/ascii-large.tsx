"use client";

import { useEffect, useState, useTransition } from "react";
import { fetchAsciiFrames } from "@/lib/ascii-cache";

// Hoist static JSX - Rule: rendering-hoist-jsx
const LOADING_PLACEHOLDER = (
  <div className="my-20 flex justify-center">
    <div className="w-20 h-24 flex items-center justify-center" />
  </div>
);

export function AsciiLarge() {
  const [frames, setFrames] = useState<string[][]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [, startTransition] = useTransition();

  useEffect(() => {
    // Use cached fetch - Rule: client-swr-dedup
    startTransition(() => {
      fetchAsciiFrames().then(setFrames);
    });
  }, []);

  useEffect(() => {
    if (frames.length === 0) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, 80);

    return () => clearInterval(interval);
  }, [frames.length]);

  if (frames.length === 0) return LOADING_PLACEHOLDER;

  return (
    <div className="mt-56 mb-24 flex justify-center">
      <div
        className="flex items-center justify-center"
        style={{
          width: "3rem",
          height: "3rem",
        }}
      >
        <pre
          className="text-[3px] leading-[3px] text-foreground/60 select-none m-0"
          style={{
            fontFamily: "monospace",
            transform: "scaleX(2)",
            transformOrigin: "center",
          }}
        >
          {frames[currentFrame]?.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </pre>
      </div>
    </div>
  );
}

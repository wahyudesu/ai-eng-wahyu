"use client";

import { useEffect, useState } from "react";

export function AsciiAi() {
  const [frames, setFrames] = useState<string[][]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    fetch("/ascii-frames (2).json")
      .then((res) => res.json())
      .then((data) => setFrames(data))
      .catch(() => setFrames([["  Loading...  "]]));
  }, []);

  useEffect(() => {
    if (frames.length === 0) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, 80);

    return () => clearInterval(interval);
  }, [frames.length]);

  if (frames.length === 0) {
    return (
      <div className="my-10 flex justify-start">
        <div className="w-10 h-12 flex items-center justify-start" />
      </div>
    );
  }

  return (
    <div className="my-16 flex justify-start">
      <div
        className="flex items-center justify-start"
        style={{
          width: "3rem",
          height: "3rem",
        }}
      >
        <pre
          className="text-[1.3px] leading-[1.3px] text-foreground/60 select-none m-0"
          style={{
            fontFamily: "monospace",
            transform: "scaleX(2)",
            transformOrigin: "left",
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

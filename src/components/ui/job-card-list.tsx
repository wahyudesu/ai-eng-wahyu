"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

export type Job = {
  id: string;
  title: string;
  company: string;
  type: string;
  href: string;
  icon: string;
};

type JobCardListProps = {
  jobs: Job[];
};

export function JobCardList({ jobs }: JobCardListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <motion.a
          key={job.id}
          href={job.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          onMouseEnter={() => setHoveredId(job.id)}
          onMouseLeave={() => setHoveredId(null)}
          className={`block group relative overflow-hidden rounded-xl border transition-all duration-200 ${
            hoveredId === job.id
              ? "border-primary/50 bg-primary/5 shadow-md"
              : hoveredId
                ? "border-neutral-200 dark:border-neutral-800 opacity-50"
                : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
          }`}
        >
          <div className="flex items-center gap-4 p-4">
            {/* Icon */}
            <div className="relative shrink-0">
              {job.icon.startsWith("http") ? (
                <Image
                  src={job.icon}
                  alt={job.company}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-lg object-cover"
                  quality={50}
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-2xl">
                  {job.icon}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground">
                  {job.company}
                </span>
                <span className="text-neutral-300 dark:text-neutral-700">•</span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  {job.type}
                </span>
              </div>
            </div>

            {/* Arrow indicator */}
            <div className="shrink-0">
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-400 dark:text-neutral-600 group-hover:text-primary transition-colors"
                animate={
                  hoveredId === job.id
                    ? { x: [0, 4, 0] }
                    : { x: 0 }
                }
                transition={{ duration: 0.4, repeat: hoveredId === job.id ? Infinity : 0 }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </motion.svg>
            </div>
          </div>

          {/* Hover border effect */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: hoveredId === job.id ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>
      ))}
    </div>
  );
}

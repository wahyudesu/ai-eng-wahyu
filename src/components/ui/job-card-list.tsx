"use client";

import { motion } from "motion/react";
import { IconRenderer } from "./icon-renderer";
import { useState } from "react";

export type Job = {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
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
            <div className="relative shrink-0 w-12 h-12">
              <IconRenderer icon={job.icon} size={48} className="w-12 h-12 rounded-lg" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                {job.company}
              </h3>
              <div className="text-sm text-muted-foreground">
                {job.title}
              </div>
            </div>

            {/* Location */}
            <div className="shrink-0 text-right">
              <div className="text-xs text-muted-foreground">
                {job.location}
              </div>
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-400 dark:text-neutral-600 group-hover:text-primary transition-colors ml-auto mt-1"
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

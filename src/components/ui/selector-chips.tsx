"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import {
  FileText,
  MessageCircle,
  Sparkles,
  Video,
  Briefcase,
  BookOpen,
  Wrench,
  Code,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  FileText,
  MessageCircle,
  Sparkles,
  Video,
  Briefcase,
  BookOpen,
  Wrench,
  Code,
};

export type FilterOption = {
  label: string;
  icon?: string;
};

export type SelectorChipsProps = {
  options: FilterOption[];
  onChange?: (selected: string[]) => void;
};

const SelectorChips: React.FC<SelectorChipsProps> = ({ options, onChange }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleChip = (label: string) => {
    const updated = selected.includes(label)
      ? selected.filter((s) => s !== label)
      : [...selected, label];
    setSelected(updated);
    onChange?.(updated);
  };

  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((option) => {
        const isSelected = selected.includes(option.label);
        const Icon = option.icon ? iconMap[option.icon] : undefined;
        return (
          <motion.button
            key={option.label}
            onClick={() => toggleChip(option.label)}
            initial={false}
            className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium transition-all ${
              isSelected
                ? "bg-blue-500 border-blue-500 text-white"
                : "bg-transparent border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:border-neutral-400 dark:hover:border-neutral-700"
            }`}
          >
            {Icon && <Icon size={14} />}
            <span>{option.label}</span>
            {isSelected && (
              <motion.svg
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                width="14"
                height="14"
                viewBox="0 0 12 12"
                fill="none"
                className="ml-1"
              >
                <motion.path
                  d="M2.5 6L4.5 8L9.5 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.svg>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export { SelectorChips };

"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

export type Tool = {
  id: string;
  name: string;
  href: string;
  icon: string;
};

export type ToolkitCategory = {
  id: string;
  label: string;
  icon: string;
  tools: Tool[];
};

type ToolkitGridProps = {
  categories: ToolkitCategory[];
};

export function ToolkitGrid({ categories }: ToolkitGridProps) {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <section key={category.id}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">{category.icon}</span>
            <h3 className="text-sm font-medium text-foreground">
              {category.label}
            </h3>
            <span className="text-muted-foreground text-sm">
              ({category.tools.length})
            </span>
          </div>

          {category.tools.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">
              Coming soon...
            </p>
          ) : (
            <div className="grid grid-cols-[repeat(16,minmax(0,1fr))] sm:grid-cols-[repeat(18,minmax(0,1fr))] md:grid-cols-[repeat(20,minmax(0,1fr))] gap-0.5">
              {category.tools.map((tool) => (
                <motion.a
                  key={tool.id}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square"
                  onMouseEnter={() => setHoveredTool(tool.id)}
                  onMouseLeave={() => setHoveredTool(null)}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.15 }}
                >
                  <div
                    className={`w-full h-full rounded overflow-hidden transition-all duration-200 ${
                      hoveredTool && hoveredTool !== tool.id
                        ? "opacity-75"
                        : "opacity-100"
                    }`}
                  >
                    {tool.icon.startsWith("http") ? (
                      <Image
                        src={tool.icon}
                        alt={tool.name}
                        width={16}
                        height={16}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs bg-neutral-100 dark:bg-neutral-800">
                        {tool.icon}
                      </div>
                    )}
                  </div>

                  {/* Tooltip */}
                  {hoveredTool === tool.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap z-10"
                    >
                      {tool.name}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-foreground" />
                    </motion.div>
                  )}
                </motion.a>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import { HoverPeek } from "./link-preview";

export type ListItemProps = {
  id: string;
  icon: string;
  title: string;
  description?: string;
  href?: string;
  previewUrl?: string; // For website hover preview (separate from href/twitter)
};

type InteractiveListProps = {
  items: ListItemProps[];
  onItemClick?: (item: ListItemProps) => void;
};

export function InteractiveList({ items, onItemClick }: InteractiveListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <ul className="space-y-1.5 text-sm">
      {items.map((item) => {
        const isHovered = hoveredId === item.id;
        const content = (
          <>
            {item.icon.startsWith?.("http") ? (
              <img src={item.icon} alt="" className="w-5 h-5 shrink-0" />
            ) : (
              <span className="text-base shrink-0">{item.icon}</span>
            )}
            <span className="flex-1 min-w-0 flex items-center">
              <span className="text-foreground font-medium relative after:absolute after:bg-primary after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 truncate">
                {item.title}
              </span>
              {item.description && (
                <>
                  <span className="text-muted-foreground mx-1 shrink-0">-</span>
                  <span className="text-muted-foreground truncate">
                    {item.description}
                  </span>
                </>
              )}
            </span>
          </>
        );

        const listItem = (
          <li
            key={item.id}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onItemClick?.(item)}
            className={`flex items-center gap-2 group transition-opacity duration-200 ${
              isHovered
                ? "opacity-100"
                : hoveredId !== null
                  ? "opacity-40"
                  : "opacity-100"
            }`}
          >
            {item.href ? (
              <HoverPeek url={item.previewUrl || item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full"
                >
                  {content}
                </a>
              </HoverPeek>
            ) : (
              <button className="flex items-center gap-2 w-full text-left">
                {content}
              </button>
            )}
          </li>
        );

        return listItem;
      })}
    </ul>
  );
}

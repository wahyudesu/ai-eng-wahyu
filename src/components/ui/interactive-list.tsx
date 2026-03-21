"use client";

import { useState, useEffect } from "react";
import { HoverPeek } from "./link-preview";
import Image from "next/image";

export type ListItemProps = {
  id: string;
  icon: string;
  title: string;
  description?: string;
  country?: string;
  href?: string;
  previewUrl?: string;
};

type InteractiveListProps = {
  items: ListItemProps[];
};

export function InteractiveList({ items }: InteractiveListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <ul className="space-y-2 text-sm">
      {items.map((item) => {
        const isHovered = hoveredId === item.id;
        const content = (
          <>
            {item.icon.startsWith?.("http") ? (
              <Image src={item.icon} alt="" width={24} height={24} className="w-6 h-6 shrink-0 rounded-full object-cover" quality={50} aria-hidden="true" />
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
              {item.country && (
                <span className="text-base ml-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.country}
                </span>
              )}
            </span>
          </>
        );

        const listItem = (
          <li
            key={item.id}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`flex items-center gap-2 group transition-opacity duration-200 ${
              isHovered
                ? "opacity-100"
                : hoveredId !== null
                  ? "opacity-40"
                  : "opacity-100"
            }`}
          >
            {item.href ? (
              isMobile ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full"
                >
                  {content}
                </a>
              ) : (
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
              )
            ) : (
              <button type="button" className="flex items-center gap-2 w-full text-left">
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

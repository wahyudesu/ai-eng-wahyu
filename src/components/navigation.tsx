"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { href: "/", label: "home" },
  { href: "/jobs", label: "jobs" },
  { href: "/courses", label: "courses" },
  { href: "/tools", label: "tools" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center py-5">
      <ul className="flex gap-7 text-sm text-muted-foreground">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`transition-colors duration-200 ${
                pathname === item.href
                  ? "text-foreground font-medium"
                  : "hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3">
        <a
          href="https://github.com/wahyudesu/ai-eng-why"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-md hover:bg-muted transition-colors"
          aria-label="GitHub Repository"
        >
          <Github size={18} />
        </a>
        <ThemeToggle />
      </div>
    </nav>
  );
}

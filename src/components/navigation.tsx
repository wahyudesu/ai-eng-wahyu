"use client";

import { FaGithub } from "react-icons/fa6";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

const navItems = [
  { href: "/", label: "home" },
  { href: "/jobs", label: "jobs" },
  { href: "/courses", label: "courses" },
  { href: "/tools", label: "tools" },
  { href: "/ai", label: "ai" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center py-2">
      <ul className="flex gap-4 text-sm text-muted-foreground">
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
          className="p-2 rounded-full hover:bg-muted transition-colors text-neutral-600 dark:text-neutral-400"
          aria-label="GitHub Repository"
        >
          <FaGithub size={18} />
        </a>
        <AnimatedThemeToggler className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-800/50 dark:hover:bg-neutral-800/50 transition-colors text-neutral-600 dark:text-neutral-400" />
      </div>
    </nav>
  );
}

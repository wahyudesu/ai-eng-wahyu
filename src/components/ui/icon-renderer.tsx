"use client";

import { memo, useState } from "react";
import Image from "next/image";

// Mapping of domains/keywords to @lobehub/icons provider names
const PROVIDER_MAP: Record<string, string> = {
  // AI/LLM Providers
  "openai.com": "openai",
  "anthropic.com": "anthropic",
  "claude.ai": "anthropic",
  "google.com": "google",
  "gemini.com": "google",
  "deepseek.com": "deepseek",
  "mistral.ai": "mistral",
  "cohere.com": "cohere",
  "perplexity.ai": "perplexity",
  "huggingface.co": "huggingface",
  "ollama.com": "ollama",
  "ollama.ai": "ollama",
  "replicate.com": "replicate",
  "groq.com": "groq",
  "together.ai": "together",
  "fireworks.ai": "fireworks",
  "x.ai": "xai",
  "midjourney.com": "midjourney",
  "elevenlabs.io": "elevenlabs",
  "runway.com": "runway",
  "runwayml.com": "runway",
  "stability.ai": "stability",
  "langchain.com": "langchain",
  "langchain.ai": "langchain",
  "cursor.sh": "cursor",
  "cursor.com": "cursor",
  "copilot.microsoft.com": "copilot",
  "github.com": "github",
  "notion.so": "notion",
  "notion.com": "notion",
  "figma.com": "figma",

  // Cloud/Infrastructure
  "aws.amazon.com": "aws",
  "amazonaws.com": "aws",
  "azure.microsoft.com": "azure",
  "azure.com": "azure",
  "vercel.com": "vercel",
  "netlify.com": "netlify",
  "cloudflare.com": "cloudflare",
  "supabase.com": "supabase",
  "firebase.google.com": "firebase",

  // Development Platforms
  "gitlab.com": "gitlab",
  "bitbucket.org": "bitbucket",
  "stackoverflow.com": "stackoverflow",
  "reddit.com": "reddit",

  // Social Media
  "x.com": "x",
  "twitter.com": "x",
  "linkedin.com": "linkedin",
  "youtube.com": "youtube",
  "youtu.be": "youtube",
  "discord.com": "discord",
  "telegram.org": "telegram",

  // Content Platforms
  "medium.com": "medium",
  "dev.to": "devto",
  "hashnode.com": "hashnode",
  "substack.com": "substack",

  // Tech Companies
  "microsoft.com": "microsoft",
  "apple.com": "apple",
  "meta.com": "meta",
  "facebook.com": "meta",
  "instagram.com": "instagram",
  "tiktok.com": "tiktok",
};

// Extract domain from URL
function extractDomain(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return null;
  }
}

// Check if icon value matches a known provider
function getProviderFromIcon(icon: string): string | null {
  // If icon is already a provider name (e.g., "openai", "anthropic")
  if (/^[a-z0-9-]+$/.test(icon) && !icon.startsWith("http")) {
    const provider = PROVIDER_MAP[icon] || icon;
    // Check if it's a known provider name
    if (Object.values(PROVIDER_MAP).includes(provider)) {
      return provider;
    }
  }

  // If icon is a URL, extract domain and check
  if (icon.startsWith("http")) {
    const domain = extractDomain(icon);
    if (domain) {
      // Check exact domain match
      if (PROVIDER_MAP[domain]) {
        return PROVIDER_MAP[domain];
      }
      // Check partial match (e.g., "openai.com" matches "api.openai.com")
      for (const [key, provider] of Object.entries(PROVIDER_MAP)) {
        if (domain.includes(key.replace("www.", "")) || key.includes(domain)) {
          return provider;
        }
      }
    }
  }

  return null;
}

// Inner component that dynamically loads ProviderIcon
function LobeIcon({ provider, size, className }: { provider: string; size: number; className?: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return null;
  }

  try {
    // Dynamic require to avoid SSR issues
    // @ts-ignore - dynamic import
    const { ProviderIcon } = require("@lobehub/icons");
    return <ProviderIcon provider={provider} size={size} className={className} type="color" />;
  } catch {
    setError(true);
    return null;
  }
}

export type IconRendererProps = {
  icon: string;
  size?: number;
  className?: string;
};

export const IconRenderer = memo(({ icon, size = 24, className }: IconRendererProps) => {
  const [imageError, setImageError] = useState(false);
  const provider = getProviderFromIcon(icon);

  // Use @lobehub/icons for known providers
  if (provider) {
    const lobeIcon = <LobeIcon provider={provider} size={size} className={className} />;
    // If LobeIcon returns null (error), fall through to other options
    if (lobeIcon) {
      return lobeIcon;
    }
  }

  // Fallback to image or emoji
  if (icon.startsWith?.("http")) {
    if (imageError) {
      // Image failed to load, show fallback emoji
      return <span className={className} style={{ fontSize: size }}>🔗</span>;
    }

    return (
      <Image
        src={icon}
        alt=""
        width={size}
        height={size}
        className={`${className} rounded-full object-cover`}
        quality={50}
        aria-hidden="true"
        unoptimized={icon.includes("licdn") || icon.includes("media.licdn")}
        onError={() => setImageError(true)}
      />
    );
  }

  // Fallback to emoji/text
  return <span className={className} style={{ fontSize: size }}>{icon}</span>;
});

IconRenderer.displayName = "IconRenderer";

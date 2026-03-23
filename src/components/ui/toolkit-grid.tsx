"use client";

import Image from "next/image";
import { memo, useState, useMemo } from "react";

// Map icon names to their direct component keys in @lobehub/icons
const DIRECT_ICON_MAP: Record<string, string> = {
  "OpenAI": "OpenAI",
  "Anthropic": "Anthropic",
  "Gemini": "Gemini",
  "Groq": "Groq",
  "OpenRouter": "OpenRouter",
  "Together": "Together",
  "Fireworks": "Fireworks",
  "Cohere": "Cohere",
  "Mistral": "Mistral",
  "Perplexity": "Perplexity",
  "XAI": "XAI",
  "DeepSeek": "DeepSeek",
  "Bedrock": "Bedrock",
  "AzureAI": "AzureAI",
  "LangChain": "LangChain",
  "LangGraph": "LangGraph",
  "Vercel": "Vercel",
  "LlamaIndex": "LlamaIndex",
  "CrewAI": "CrewAI",
  "Dify": "Dify",
  "Mastra": "Mastra",
  "VertexAI": "VertexAI",
  "LangSmith": "LangSmith",
  "Langfuse": "Langfuse",
  "N8n": "N8n",
  "Ollama": "Ollama",
  "LmStudio": "LmStudio",
  "OpenWebUI": "OpenWebUI",
  "Vllm": "Vllm",
  "HuggingFace": "HuggingFace",
  "Civitai": "Civitai",
  "ModelScope": "ModelScope",
  "Replicate": "Replicate",
  "Supabase": "Supabase",
};

// Direct icon component renderer
function LobeDirectIcon({
  iconName,
  size,
  className,
}: {
  iconName: string;
  size: number;
  className?: string;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return null;
  }

  try {
    // @ts-ignore - dynamic import
    const icons = require("@lobehub/icons");
    const componentKey = DIRECT_ICON_MAP[iconName];
    if (!componentKey || !icons[componentKey]) {
      setError(true);
      return null;
    }
    const IconComponent = icons[componentKey];
    // For brand icons, use the Avatar variant (e.g., N8n.Avatar)
    const Component = IconComponent.Avatar || IconComponent.Color || IconComponent;
    return <Component size={size} className={className} />;
  } catch {
    setError(true);
    return null;
  }
}

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

function ToolIcon({ tool }: { tool: Tool }) {
  if (tool.icon.startsWith("lobe:")) {
    const iconName = tool.icon.slice(5); // e.g., "LangChain"
    return (
      <div className="w-5 h-5 flex items-center justify-center">
        <LobeDirectIcon iconName={iconName} size={16} />
      </div>
    );
  }

  if (tool.icon.startsWith("http")) {
    return (
      <div className="w-5 h-5 relative">
        <Image
          src={tool.icon}
          alt={tool.name}
          fill
          className="object-contain rounded"
          unoptimized
        />
      </div>
    );
  }

  return (
    <div className="w-5 h-5 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded">
      <span className="text-xs">{tool.icon}</span>
    </div>
  );
}

function ToolButton({ tool }: { tool: Tool }) {
  return (
    <a
      href={tool.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 py-1.5 px-2.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors min-w-0"
    >
      <ToolIcon tool={tool} />
      <span className="text-xs text-foreground whitespace-nowrap">
        {tool.name}
      </span>
    </a>
  );
}

export function ToolkitGrid({ categories }: ToolkitGridProps) {
  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category.id} className="flex gap-8">
          <div className="w-40 flex-shrink-0 pt-1">
            <h3 className="text-sm font-medium text-foreground">
              {category.label}
            </h3>
          </div>

          <div className="flex-1 min-w-0">
            {category.tools.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">Coming soon...</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {category.tools.map((tool) => (
                  <ToolButton key={tool.id} tool={tool} />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

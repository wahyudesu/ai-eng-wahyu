import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { ToolkitGrid } from "@/components/ui/toolkit-grid";
import { parseReadme } from "@/lib/readme-parser";
import { AsciiAi } from "@/components/ascii-ai";

export const metadata: Metadata = {
  title: "Toolkit",
  description:
    "Essential AI engineering tools, frameworks, and platforms for building intelligent applications. Curated list of developer resources.",
  alternates: {
    canonical: "https://aieng.wahyuikbal.com/toolkit",
  },
  openGraph: {
    title: "AI Engineering - Toolkit",
    url: "https://aieng.wahyuikbal.com/toolkit",
  },
};

export default function ToolsPage() {
  const { toolkitData } = parseReadme();

  return (
    <div className="min-h-screen font-sans selection:bg-foreground/10 dark:selection:bg-foreground/20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Navigation />

        <main className="flex flex-col gap-8 py-6">
          <header>
            <AsciiAi />

            <h1 className="text-2xl font-medium text-foreground mb-3">
              AI Engineering
            </h1>
            <p className="text-base text-muted-foreground">
              The best AI & ML engineers on the internet, and everything you
              need to become one
            </p>
          </header>

          <section>
            <ToolkitGrid categories={toolkitData.categories} />
          </section>
        </main>
      </div>
    </div>
  );
}

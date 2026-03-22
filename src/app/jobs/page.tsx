import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "Explore curated AI engineering job opportunities at top companies like OpenAI, Anthropic, DeepMind, and more. Remote and on-site positions available.",
  alternates: {
    canonical: "https://aieng.wahyuikbal.com/jobs",
  },
  openGraph: {
    title: "AI Engineering - Jobs",
    url: "https://aieng.wahyuikbal.com/jobs",
  },
};

import { AsciiLarge } from "@/components/ascii-large";

export default function ToolsPage() {
  return (
    <div className="min-h-screen font-sans selection:bg-foreground/10 dark:selection:bg-foreground/20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Navigation />

        <main className="items-center">
          {/* ASCII Art */}
          <AsciiLarge />

          {/* Coming Soon */}
          <section className="py-20 text-center">
            <h2 className="text-xl font-medium text-foreground mb-2">
              Coming Soon
            </h2>
            <p className="text-base text-muted-foreground">
              We&apos;re working on something great. Stay tuned!
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

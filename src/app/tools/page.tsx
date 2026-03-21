import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Essential AI engineering tools, frameworks, and platforms for building intelligent applications. Curated list of developer resources.",
  alternates: {
    canonical: "https://aieng.wahyuikbal.com/tools",
  },
  openGraph: {
    title: "AI Engineering - Tools",
    url: "https://aieng.wahyuikbal.com/tools",
  },
};

import { AsciiLarge } from "@/components/ascii-large";

export default function ToolsPage() {
  return (
    <div className="min-h-screen font-sans selection:bg-foreground/10 dark:selection:bg-foreground/20">
      <div className="max-w-2xl mx-auto px-6 py-8">
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

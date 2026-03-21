import { Navigation } from "@/components/navigation";
import { Wrench } from "lucide-react";

export default function ToolsPage() {
  return (
    <div className="min-h-screen font-sans selection:bg-foreground/10 dark:selection:bg-foreground/20">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <Navigation />

        {/* Header */}
        <header className="mb-16">
          <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 dark:from-orange-500/10 dark:to-red-500/10 flex items-center justify-center">
            <Wrench
              size={28}
              className="text-orange-500 dark:text-orange-400"
            />
          </div>
          <h1 className="text-2xl font-medium text-foreground mb-3">Tools</h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md">
            Essential AI engineering tools, frameworks, and platforms
          </p>
        </header>

        {/* Coming Soon */}
        <section className="py-20 text-center">
          <h2 className="text-xl font-medium text-foreground mb-2">
            Coming Soon
          </h2>
          <p className="text-base text-muted-foreground">
            We&apos;re working on something great. Stay tuned!
          </p>
        </section>
      </div>
    </div>
  );
}

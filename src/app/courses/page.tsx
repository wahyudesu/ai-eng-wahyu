import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Learn AI engineering and machine learning from the best courses and educational resources in the industry. From fundamentals to advanced topics.",
  alternates: {
    canonical: "https://aieng.wahyuikbal.com/courses",
  },
  openGraph: {
    title: "AI Engineering - Courses",
    url: "https://aieng.wahyuikbal.com/courses",
  },
};

import { BookOpen } from "lucide-react";
import { AsciiLarge } from "@/components/ascii-large";

export default function CoursesPage() {
  return (
    <div className="min-h-screen font-sans selection:bg-foreground/10 dark:selection:bg-foreground/20">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <Navigation />

        <main>

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

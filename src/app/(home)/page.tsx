import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Home",
  description:
    "The best AI & ML engineers on the internet, and everything you need to become one. Explore curated resources, experts, and learning materials.",
  alternates: {
    canonical: "https://aieng.wahyuikbal.com",
  },
  openGraph: {
    title: "AI Engineering - Home",
    url: "https://aieng.wahyuikbal.com",
  },
};

// @ts-nocheck
import { AsciiAi } from "@/components/ascii-ai";
import { ResourcesFilter } from "@/components/resources-filter";
import { InteractiveList } from "@/components/ui/interactive-list";
import { parseReadme } from "@/lib/readme-parser";

export default function HomePage() {
  const { personData, resourcesData } = parseReadme();

  const persons = personData.persons.map((p) => {
    const sosmedUrl = p.sosmed || "";
    const websiteUrl = (p as { website?: string }).website;
    return {
      id: p.id,
      icon: p.icon,
      title: p.name,
      description: p.role,
      country: p.country,
      href: sosmedUrl || undefined,
      previewUrl: websiteUrl || sosmedUrl || undefined,
    };
  });

  const resources = resourcesData.resources
    .map((r) => ({
      id: r.id,
      icon: r.icon,
      title: r.title,
      description: r.description,
      href: r.href,
      category: r.category,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  // Get filter options from categories (using emoji icons)
  const filterOptions = resourcesData.categories.map((cat) => ({
    label: cat.label,
    icon: cat.icon, // Now emoji from resources.json
  }));

  return (
    <div className="min-h-screen font-sans selection:bg-foreground/10 dark:selection:bg-foreground/20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Navigation />
        <main className="flex flex-col gap-16 py-6">
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

          {/* AI Engineers Section */}
          <section className="gap-3">
            <h2 className="text-xl font-medium text-foreground mb-3">
              AI Engineers
            </h2>
            <InteractiveList items={persons} />
          </section>

          {/* Resources Section */}
          <section className="gap-3">
            <h2 className="text-xl font-medium text-foreground mb-3">Resources</h2>
            <p className="text-base text-muted-foreground mb-4">
              Learn AI engineering from the best resources
            </p>
            <ResourcesFilter
              resources={resources}
              filterOptions={filterOptions}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

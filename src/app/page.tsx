// @ts-nocheck
import { Navigation } from "@/components/navigation";
import { AsciiAi } from "@/components/ascii-ai";
import { InteractiveList } from "@/components/ui/interactive-list";
import { ResourcesFilter } from "@/components/resources-filter";
import { parseReadme } from "@/lib/readme-parser";

export default function HomePage() {
  const { personData, resourcesData } = parseReadme();

  const persons = personData.persons.map((p) => {
    const socialUrl = Object.values(p.social)[0];
    return {
      id: p.id,
      icon: p.icon,
      title: p.name,
      description: p.role,
      href: socialUrl || undefined,
    };
  });

  const resources = resourcesData.resources.map((r) => ({
    id: r.id,
    icon: r.icon,
    title: r.title,
    description: r.description,
    href: r.href,
    category: r.category,
  }));

  const filterOptions = [
    { label: "Articles", icon: "FileText" },
    { label: "Advice", icon: "MessageCircle" },
    { label: "Inspiration", icon: "Sparkles" },
    { label: "Videos", icon: "Video" },
    { label: "Code", icon: "Code" },
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-foreground/10 dark:selection:bg-foreground/20">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <Navigation />

        <header className="py-4">
          <AsciiAi/>

          <h1 className="text-2xl font-medium text-foreground mb-3">
            AI Engineering
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md">
            The best AI engineers and resources for building intelligent
            applications
          </p>
        </header>

        {/* AI Engineers Section */}
        <section className="mb-16">
          <h2 className="text-base font-medium text-foreground mb-2">
            AI Engineers
          </h2>
          <InteractiveList items={persons} />
        </section>

        {/* Resources Section */}
        <section>
          <h2 className="text-base font-medium text-foreground mb-2">
            Resources
          </h2>
          <p className="text-base text-muted-foreground mb-6">
            Learn AI engineering from the best resources
          </p>
          <ResourcesFilter
            resources={resources}
            filterOptions={filterOptions}
          />
        </section>
      </div>
    </div>
  );
}

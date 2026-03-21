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

import { Clock, DollarSign, MapPin } from "lucide-react";
import Image from "next/image";
import { AsciiAi } from "@/components/ascii-ai";
import { Button } from "@/components/ui/button";

export default function JobsPage() {
  const jobs = [
    {
      id: 1,
      role: "Senior AI Engineer",
      company: "OpenAI",
      companyLogo:
        "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop&crop=center",
      duration: "Full-time",
      location: "San Francisco, USA",
      salary: "$200k - $350k",
    },
    {
      id: 2,
      role: "ML Research Engineer",
      company: "Anthropic",
      companyLogo:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=center",
      duration: "Full-time",
      location: "Remote",
      salary: undefined,
    },
    {
      id: 3,
      role: "AI Platform Engineer",
      company: "DeepMind",
      companyLogo:
        "https://images.unsplash.com/photo-1676299081847-824916de030a?w=100&h=100&fit=crop&crop=center",
      duration: "Contract (6 months)",
      location: "London, UK",
      salary: "£150k - £200k",
    },
    {
      id: 4,
      role: "LLM Engineer",
      company: "LangChain",
      companyLogo:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&h=100&fit=crop&crop=center",
      duration: "Full-time",
      location: "Remote",
      salary: undefined,
    },
    {
      id: 5,
      role: "AI Infrastructure Engineer",
      company: "Together AI",
      companyLogo:
        "https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=100&h=100&fit=crop&crop=center",
      duration: "Full-time",
      location: "San Francisco, USA",
      salary: "$180k - $280k",
    },
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-foreground/10 dark:selection:bg-foreground/20">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <Navigation />

        <header className="py-4">
          <AsciiAi />

          <h1 className="text-2xl font-medium text-foreground mb-3">
            AI Engineering
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md">
            Curated opportunities for design engineers and frontend developers
          </p>
        </header>

        <main>
          {/* Job Listings */}
          <section aria-labelledby="job-listings-heading">
            <h2 id="job-listings-heading" className="sr-only">
              Job Listings
            </h2>
            <div className="space-y-3">
              {jobs.map((job) => (
                <article
                  key={job.id}
                  className="p-4 rounded-lg border border-border hover:border-foreground/20 hover:bg-muted/30 transition-all"
                >
                  <div className="flex items-start gap-3">
                    {/* Company Logo */}
                    <Image
                      src={job.companyLogo}
                      alt={`${job.company} logo`}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-lg object-cover"
                    />

                    {/* Job Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h2 className="text-base font-medium text-foreground">
                            {job.role}
                          </h2>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {job.company}
                          </p>
                        </div>

                        {/* Apply Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          aria-label={`Apply for ${job.role} at ${job.company}`}
                        >
                          Apply
                        </Button>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 mt-3 flex-wrap">
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin size={12} />
                          <span>{job.location}</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock size={12} />
                          <span>{job.duration}</span>
                        </span>
                        {job.salary && (
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <DollarSign size={12} />
                            <span>{job.salary}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

// Read directly from JSON files - now the source of truth
import personData from "@/data/person.json";
import resourcesData from "@/data/resources.json";

type PersonWithWebsite = {
  id: string;
  name: string;
  role: string;
  icon: string;
  social: { twitter: string };
  website: string;
};

export function parseReadme() {
  // Transform person data
  const persons = personData.persons.map((p: any): PersonWithWebsite => ({
    id: p.id,
    name: p.name,
    role: p.title, // title -> role for backward compatibility
    icon: p.icon,
    social: {
      twitter: p.twitter,
    },
    website: p.website,
  }));

  return {
    personData: {
      title: personData.title,
      description: personData.description,
      persons,
    },
    resourcesData: resourcesData, // Direct from resources.json
  };
}

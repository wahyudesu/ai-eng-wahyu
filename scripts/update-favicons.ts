import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

// Get favicon URL from domain - using IconHorse for more reliable favicons
function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://icon.horse/icon/${domain}`;
  } catch {
    return "🔗";
  }
}

// Check if icon is custom (not Google favicon or placeholder)
function isCustomIcon(icon: string | undefined): boolean {
  if (!icon) return false;
  // Preserve custom emojis and non-Google URLs
  return !icon.startsWith("https://www.google.com/s2/favicons") && icon !== "🔗";
}

// Update person favicons
async function updatePersonFavicons() {
  const personPath = join(process.cwd(), "src/data/person.json");
  const data = JSON.parse(readFileSync(personPath, "utf-8"));

  for (const person of data.persons) {
    if (person.website && !isCustomIcon(person.icon)) {
      person.icon = getFaviconUrl(person.website);
      console.log(`✓ Person: ${person.name}`);
    }
  }

  writeFileSync(personPath, JSON.stringify(data, null, 2));
  console.log("✅ Updated src/data/person.json with favicons\n");
}

// Update resource favicons (items only, not categories)
async function updateResourceFavicons() {
  const resourcePath = join(process.cwd(), "src/data/resources.json");
  const data = JSON.parse(readFileSync(resourcePath, "utf-8"));

  for (const resource of data.resources) {
    if (resource.href && resource.href !== "#" && !isCustomIcon(resource.icon)) {
      resource.icon = getFaviconUrl(resource.href);
      console.log(`✓ Resource: ${resource.title}`);
    }
  }

  writeFileSync(resourcePath, JSON.stringify(data, null, 2));
  console.log(
    "✅ Updated src/data/resources.json favicons (categories kept as react-icons)\n",
  );
}

// Update toolkit favicons
async function updateToolkitFavicons() {
  const toolkitPath = join(process.cwd(), "src/data/toolkit.json");
  const data = JSON.parse(readFileSync(toolkitPath, "utf-8"));

  for (const category of data.categories) {
    for (const tool of category.tools) {
      if (tool.href && tool.href !== "#" && !isCustomIcon(tool.icon)) {
        tool.icon = getFaviconUrl(tool.href);
        console.log(`✓ Tool: ${tool.name}`);
      }
    }
  }

  writeFileSync(toolkitPath, JSON.stringify(data, null, 2));
  console.log(
    "✅ Updated src/data/toolkit.json with favicons\n",
  );
}

// Update jobs favicons
async function updateJobsFavicons() {
  const jobsPath = join(process.cwd(), "src/data/jobs.json");
  const data = JSON.parse(readFileSync(jobsPath, "utf-8"));

  for (const job of data.jobs) {
    if (job.href && job.href !== "#" && !isCustomIcon(job.icon)) {
      job.icon = getFaviconUrl(job.href);
      console.log(`✓ Job: ${job.title} at ${job.company}`);
    }
  }

  writeFileSync(jobsPath, JSON.stringify(data, null, 2));
  console.log(
    "✅ Updated src/data/jobs.json with favicons\n",
  );
}

async function main() {
  console.log("🔄 Updating favicons...\n");
  await Promise.all([
    updatePersonFavicons(),
    updateResourceFavicons(),
    updateToolkitFavicons(),
    updateJobsFavicons(),
  ]);
  console.log("✨ All favicons updated!");
}

main();

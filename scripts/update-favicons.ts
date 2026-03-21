import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

// Get favicon URL from domain
function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch {
    return "🔗";
  }
}

// Update person favicons
async function updatePersonFavicons() {
  const personPath = join(process.cwd(), "src/data/person.json");
  const data = JSON.parse(readFileSync(personPath, "utf-8"));

  for (const person of data.persons) {
    if (person.website) {
      person.icon = getFaviconUrl(person.website);
      console.log(`✓ Person: ${person.name} → ${person.icon.substring(0, 60)}...`);
    }
  }

  writeFileSync(personPath, JSON.stringify(data, null, 2));
  console.log("✅ Updated src/data/person.json with favicons\n");
}

// Update resource favicons
async function updateResourceFavicons() {
  const resourcePath = join(process.cwd(), "src/data/resources.json");
  const data = JSON.parse(readFileSync(resourcePath, "utf-8"));

  for (const resource of data.resources) {
    if (resource.href && resource.href !== "#") {
      resource.icon = getFaviconUrl(resource.href);
      console.log(`✓ Resource: ${resource.title} → ${resource.icon.substring(0, 60)}...`);
    }
  }

  writeFileSync(resourcePath, JSON.stringify(data, null, 2));
  console.log("✅ Updated src/data/resources.json with favicons\n");
}

// Update category icons (remove lucide, use emoji)
function updateCategoryIcons() {
  const resourcePath = join(process.cwd(), "src/data/resources.json");
  const data = JSON.parse(readFileSync(resourcePath, "utf-8"));

  const categoryEmojis: Record<string, string> = {
    articles: "📄",
    advice: "💡",
    inspiration: "🚀",
    videos: "🎥",
    code: "💻",
  };

  for (const category of data.categories) {
    category.icon = categoryEmojis[category.id] || "📁";
    console.log(`✓ Category: ${category.label} → ${category.icon}`);
  }

  writeFileSync(resourcePath, JSON.stringify(data, null, 2));
  console.log("✅ Updated category icons to emojis\n");
}

async function main() {
  console.log("🔄 Updating favicons...\n");
  await updatePersonFavicons();
  await updateResourceFavicons();
  updateCategoryIcons();
  console.log("✨ All favicons updated!");
}

main();

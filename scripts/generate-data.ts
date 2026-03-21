import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const personInfo = {
  AndrewYNg: { name: "Andrew Ng", role: "AI/ML Expert & Founder at DeepLearning.AI" },
  karpathy: { name: "Andrej Karpathy", role: "AI Researcher & Founder of Eureka Labs" },
  jerryjliu: { name: "Jerry Liu", role: "Co-founder of LangChain & AI Engineer" },
  harrisonchase: { name: "Harrison Chase", role: "Founder & CEO of LangChain" },
  shyamal_anadkat: { name: "Shyamal Anadkat", role: "AI Engineer & LlamaIndex Contributor" },
  "sadie.stlawrence": { name: "Sadie St. Lawrence", role: "AI & Data Science Educator" },
};

function parseReadmeFile() {
  const readme = readFileSync(join(process.cwd(), "README.md"), "utf-8");

  // Parse AI Engineers section - from ### headers to ---
  const personsMatch = readme.match(/## 👥 AI Engineers to Follow\n([\s\S]+?)\n---/);
  const personsData: any[] = [];

  if (personsMatch) {
    const personsSection = personsMatch[1];
    // Split by ### and filter out empty strings and the first line which is description
    const personBlocks = personsSection
      .split(/^### /gm)
      .slice(1) // Skip first part (description text)
      .filter((block) => block.trim());

    for (const block of personBlocks) {
      const lines = block.trim().split("\n");
      const name = lines[0].trim();
      const roleMatch = block.match(/^> (.+)$/m);
      const socialMatch = block.match(/\[([^\]]+)\]\(([^)]+)\)/);

      const role = roleMatch ? roleMatch[1].trim() : "AI Engineer";

      // Extract just the emoji icon from the social link text
      let icon = "🔗";
      if (socialMatch) {
        const iconText = socialMatch[1].trim();
        const emojiMatch = iconText.match(/^(\p{Emoji})/u);
        icon = emojiMatch ? emojiMatch[1] : "🔗";
      }

      const url = socialMatch ? socialMatch[2].trim() : "";

      let platform = "twitter";
      if (url.includes("instagram")) platform = "instagram";
      else if (url.includes("linkedin")) platform = "linkedin";
      else if (url.includes("github")) platform = "github";

      const id = Object.keys(personInfo).find(
        (key) => personInfo[key as keyof typeof personInfo].name === name
      ) || name.toLowerCase().replace(/\s+/g, "");

      personsData.push({ id, name, role, icon, social: { [platform]: url } });
    }
  }

  // Parse Resources section
  const resourcesMatch = readme.match(/## 📚 Resources([\s\S]+)$/);
  const resourcesData: any[] = [];

  if (resourcesMatch) {
    const resourcesSection = resourcesMatch[1];
    const categoryMap: Record<string, string> = {
      "📄 Articles": "Articles",
      "💡 Advice": "Advice",
      "🚀 Inspiration": "Inspiration",
      "🎥 Videos": "Videos",
      "💻 Code": "Code",
    };

    const categoryHeaders = Object.keys(categoryMap);
    let currentCategory = "Articles";

    const lines = resourcesSection.split("\n");
    for (const line of lines) {
      // Check for category header
      const matchedHeader = categoryHeaders.find((h) => line.trim() === "### " + h);
      if (matchedHeader) {
        currentCategory = categoryMap[matchedHeader];
        continue;
      }

      // Parse link format: #### [Title](url)
      const linkMatch = line.match(/^#### \[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const title = linkMatch[1];
        const href = linkMatch[2];
        resourcesData.push({
          id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          title,
          description: "AI Engineering Resource",
          category: currentCategory,
          href,
          icon: "🔗",
        });
        continue;
      }

      // Parse plain format: #### Title
      const plainMatch = line.match(/^#### (.+)$/);
      if (plainMatch) {
        const title = plainMatch[1];
        resourcesData.push({
          id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          title,
          description: "AI Engineering Resource",
          category: currentCategory,
          href: "#",
          icon: "🔗",
        });
      }
    }
  }

  const categories = [
    { id: "articles", label: "Articles", icon: "FileText" },
    { id: "advice", label: "Advice", icon: "MessageCircle" },
    { id: "inspiration", label: "Inspiration", icon: "Sparkles" },
    { id: "videos", label: "Videos", icon: "Video" },
    { id: "code", label: "Code", icon: "Code" },
  ];

  return {
    personData: {
      title: "AI Engineers to Follow",
      description: "Follow these amazing AI engineers on social media",
      persons: personsData,
    },
    resourcesData: {
      resources: resourcesData,
      categories,
    },
  };
}

// Generate and write
const data = parseReadmeFile();
writeFileSync(
  join(process.cwd(), "src/data/generated.json"),
  JSON.stringify(data, null, 2)
);

console.log("✅ Generated src/data/generated.json from README.md");

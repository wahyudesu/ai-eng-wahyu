import { readFileSync, existsSync } from "fs";
import { join } from "path";

// Validate JSON files - source of truth validation
function validateDataFiles() {
  const files = [
    "src/data/person.json",
    "src/data/resources.json",
    "src/data/jobs.json",
    "src/data/toolkit.json",
  ];

  const errors: string[] = [];

  for (const file of files) {
    const filePath = join(process.cwd(), file);

    if (!existsSync(filePath)) {
      errors.push(`❌ Missing file: ${file}`);
      continue;
    }

    try {
      const content = readFileSync(filePath, "utf-8");
      JSON.parse(content);
      console.log(`✅ Valid: ${file}`);
    } catch (error) {
      errors.push(`❌ Invalid JSON in ${file}: ${(error as Error).message}`);
    }
  }

  if (errors.length > 0) {
    console.error("\n❌ Validation errors:");
    errors.forEach((err) => console.error(err));
    process.exit(1);
  }

  console.log("\n✨ All data files are valid!");
}

// Run validation
validateDataFiles();

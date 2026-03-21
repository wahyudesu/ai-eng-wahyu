// Static data parser for Vercel compatibility
// Data is pre-generated during build time from README.md
import generatedData from "@/data/generated.json";

const icons = { twitter: "𝕏", instagram: "📷", linkedin: "💼", github: "🔗" };

const personInfo = {
  AndrewYNg: { name: "Andrew Ng", role: "AI/ML Expert & Founder at DeepLearning.AI" },
  karpathy: { name: "Andrej Karpathy", role: "AI Researcher & Founder of Eureka Labs" },
  jerryjliu: { name: "Jerry Liu", role: "Co-founder of LangChain & AI Engineer" },
  harrisonchase: { name: "Harrison Chase", role: "Founder & CEO of LangChain" },
  shyamal_anadkat: { name: "Shyamal Anadkat", role: "AI Engineer & LlamaIndex Contributor" },
  "sadie.stlawrence": { name: "Sadie St. Lawrence", role: "AI & Data Science Educator" },
};

export function parseReadme() {
  return generatedData;
}

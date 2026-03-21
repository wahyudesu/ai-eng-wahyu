declare module "*.json" {
  export interface Resource {
    id: string;
    title: string;
    description: string;
    category: "Articles" | "Advice" | "Inspiration" | "Videos";
    url: string;
    emoji: string;
  }

  export interface Category {
    id: string;
    label: string;
    icon: string;
  }

  export interface ResourcesData {
    resources: Resource[];
    categories: Category[];
  }

  const value: ResourcesData;
  export default value;
}

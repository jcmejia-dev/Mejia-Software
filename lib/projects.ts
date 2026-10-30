export type ProjectStatus = "Beta" | "Prototype";
export type ProjectKind = "Product" | "Lab";

export type Project = {
  name: string;
  slug: string;
  description: string;
  status: ProjectStatus;
  kind: ProjectKind;
  platform: string;
  technologies: string[];
  pricing: "Free";
  openSource: boolean;
  repoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "HomeTayo",
    slug: "hometayo",
    description:
      "A mobile-first Philippine rental marketplace for property discovery, owner listings, moderation, and renter workflows.",
    status: "Beta",
    kind: "Product",
    platform: "Web + Android preview",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Vercel"],
    pricing: "Free",
    openSource: true,
    repoUrl: "https://github.com/jcmejia-dev/hometayo",
    liveUrl: "https://hometayoph.vercel.app/",
    featured: true,
  },
  {
    name: "Lakbay",
    slug: "lakbay",
    description:
      "A motorcycle riding companion with ride history, route planning, saved trips, fuel estimates, maintenance, and weather-aware travel tools.",
    status: "Beta",
    kind: "Product",
    platform: "Responsive web app",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "PWA"],
    pricing: "Free",
    openSource: true,
    repoUrl: "https://github.com/jcmejia-dev/lakbay-app",
    featured: true,
  },
  {
    name: "ShortForge",
    slug: "shortforge",
    description:
      "An AI-assisted short-form content production studio spanning ideation, research, scripting, production, editing, publishing, and analytics.",
    status: "Prototype",
    kind: "Lab",
    platform: "Web",
    technologies: ["AI", "Automation", "Content workflow"],
    pricing: "Free",
    openSource: false,
    featured: true,
  },
];

export const products = projects.filter((project) => project.kind === "Product");
export const labs = projects.filter((project) => project.kind === "Lab");
export const openSourceProjects = projects.filter((project) => project.openSource);

import type { Metadata } from "next";
import { GitFork, Star } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { getRepositoryStats } from "@/lib/github";
import { openSourceProjects } from "@/lib/projects";

export const metadata: Metadata = { title: "Open Source", description: "Public source code from Mejia Software." };

export default async function OpenSourcePage() {
  const stats = await Promise.all(
    openSourceProjects.map(async (project) => {
      if (!project.repoUrl) return null;
      const fullName = project.repoUrl.replace("https://github.com/", "");
      return getRepositoryStats(fullName);
    }),
  );

  return (
    <>
      <section className="page-hero">
        <div className="shell page-heading">
          <p className="eyebrow">Open source</p>
          <h1>Inspect the work.</h1>
          <p>Repository metadata is requested from GitHub at runtime and cached. If GitHub is unavailable, the page keeps working without invented statistics.</p>
        </div>
      </section>
      <section className="section">
        <div className="shell project-grid">
          {openSourceProjects.map((project, index) => (
            <div key={project.slug}>
              <ProjectCard project={project} />
              {stats[index] ? (
                <div className="repo-stats" aria-label={`${project.name} GitHub statistics`}>
                  <span><Star size={13} /> {stats[index]!.stars} stars</span>
                  <span><GitFork size={13} /> {stats[index]!.forks} forks</span>
                  {stats[index]!.language ? <span>{stats[index]!.language}</span> : null}
                  <span>Updated {new Date(stats[index]!.updatedAt).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" })}</span>
                </div>
              ) : (
                <p className="repo-error">GitHub metadata is temporarily unavailable.</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

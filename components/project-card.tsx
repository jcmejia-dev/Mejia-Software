import { ArrowUpRight, GitBranch } from "lucide-react";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="card-topline">
        <span className={`status status-${project.status.toLowerCase()}`}>{project.status}</span>
        <span className="pricing">{project.pricing}</span>
      </div>
      <div>
        <p className="eyebrow">{project.kind} · {project.platform}</p>
        <h3>{project.name}</h3>
        <p className="card-description">{project.description}</p>
      </div>
      <div className="tag-row" aria-label={`${project.name} technologies`}>
        {project.technologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>
      <div className="card-actions">
        {project.liveUrl ? (
          <a className="button button-small" href={project.liveUrl} target="_blank" rel="noreferrer">
            Open app <ArrowUpRight size={15} />
          </a>
        ) : (
          <span className="muted-label">No public release yet</span>
        )}
        {project.repoUrl ? (
          <a className="text-link" href={project.repoUrl} target="_blank" rel="noreferrer">
            <GitBranch size={15} /> Source
          </a>
        ) : null}
      </div>
    </article>
  );
}

import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { labs } from "@/lib/projects";

export const metadata: Metadata = { title: "Labs", description: "Experimental software and prototypes from Mejia Software." };

export default function LabsPage() {
  return (
    <>
      <section className="page-hero"><div className="shell page-heading"><p className="eyebrow">Labs</p><h1>Experiments stay labeled as experiments.</h1><p>Labs are prototypes, research, and unfinished ideas that may become products later. Their status is intentionally explicit.</p></div></section>
      <section className="section"><div className="shell project-grid">{labs.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></section>
    </>
  );
}

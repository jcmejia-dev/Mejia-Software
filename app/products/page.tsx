import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { products } from "@/lib/projects";

export const metadata: Metadata = { title: "Products", description: "Products built and maintained by Mejia Software." };

export default function ProductsPage() {
  return (
    <>
      <section className="page-hero"><div className="shell page-heading"><p className="eyebrow">Products</p><h1>Software meant to solve something.</h1><p>Production direction, public access, source availability, and status are shown without inflating unfinished work.</p></div></section>
      <section className="section"><div className="shell project-grid">{products.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></section>
    </>
  );
}

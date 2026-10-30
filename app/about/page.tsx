import type { Metadata } from "next";
import { GitBranch } from "lucide-react";

export const metadata: Metadata = { title: "About", description: "About Jamie Mejia and the engineering approach behind Mejia Software." };

export default function AboutPage() {
  return (
    <>
      <section className="page-hero"><div className="shell page-heading"><p className="eyebrow">About</p><h1>One developer. A serious software practice.</h1><p>Mejia Software is an independent software studio by Jamie Mejia, a BS Information Technology graduate and AI-augmented full-stack developer.</p></div></section>
      <div className="shell content-stack">
        <div className="about-grid">
          <section className="panel"><p className="eyebrow">Technology</p><h3>Full-stack foundations</h3><ul><li>Laravel, PHP, JavaScript, TypeScript, React, Next.js and Vue</li><li>MySQL, PostgreSQL, REST APIs, webhooks and JSON</li><li>React Native, Git, GitHub, CI/CD and Vercel</li><li>Automation and AI-assisted software development</li></ul></section>
          <section className="panel"><p className="eyebrow">Responsibility</p><h3>AI does not replace ownership.</h3><p>AI is used to accelerate research, implementation, debugging, and iteration. Jamie remains responsible for understanding the system, reviewing code, validating behavior, securing data, testing releases, and maintaining what ships.</p></section>
        </div>
        <div className="panel"><p className="eyebrow">Source</p><h3>Engineering should be inspectable.</h3><p>Public work is linked through GitHub so employers, developers, and users can inspect the actual repositories rather than relying on screenshots or claims.</p><p><a className="button button-small" href="https://github.com/jcmejia-dev" target="_blank" rel="noreferrer"><GitBranch size={16} /> GitHub profile</a></p></div>
      </div>
    </>
  );
}

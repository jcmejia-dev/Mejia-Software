import Link from "next/link";
import { Github } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <strong>MEJIA SOFTWARE</strong>
          <p>Software, automation, and AI tools built and maintained by Jamie Mejia.</p>
        </div>
        <div className="footer-links" aria-label="Footer links">
          <Link href="/products">Products</Link>
          <Link href="/tools">Free Tools</Link>
          <Link href="/open-source">Open Source</Link>
          <Link href="/about">About</Link>
          <a href="https://github.com/jcmejia-dev" target="_blank" rel="noreferrer">
            <Github size={16} /> GitHub
          </a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Mejia Software.</span>
        <span>Build useful software for real problems.</span>
      </div>
    </footer>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitBranch, Menu, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  ["Home", "/"],
  ["Products", "/products"],
  ["Free Tools", "/tools"],
  ["Open Source", "/open-source"],
  ["Labs", "/labs"],
  ["About", "/about"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Mejia Software home" onClick={() => setOpen(false)}>
          <Image className="brand-signature" src="/mejia-signature.svg" alt="" width={72} height={34} priority />
          <span>
            <strong>MEJIA SOFTWARE</strong>
            <small>Independent software studio</small>
          </span>
        </Link>

        <button className="menu-button" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
          {navigation.map(([label, href]) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return <Link key={href} href={href} className={active ? "nav-link is-active" : "nav-link"} onClick={() => setOpen(false)}>{label}</Link>;
          })}
          <a className="nav-github" href="https://github.com/jcmejia-dev" target="_blank" rel="noreferrer"><GitBranch size={17} /> GitHub</a>
        </nav>
      </div>
    </header>
  );
}

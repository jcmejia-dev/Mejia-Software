import type { Metadata } from "next";
import { Wrench } from "lucide-react";

export const metadata: Metadata = { title: "Free Tools", description: "Free utilities from Mejia Software." };

export default function ToolsPage() {
  return (
    <>
      <section className="page-hero"><div className="shell page-heading"><p className="eyebrow">Free tools</p><h1>Small utilities. No pretend buttons.</h1><p>This area is ready for developer, data, file, and business utilities. Tools will appear only after their functionality is implemented and tested.</p></div></section>
      <div className="shell content-stack"><div className="empty-state"><Wrench size={28} strokeWidth={1.6} /><h2>Tool catalog is being built.</h2><p>The platform structure is live, but there are no fake utilities here. The first tools can be added independently without redesigning the site.</p></div></div>
    </>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BrowserDeterrents } from "@/components/browser-deterrents";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";
import "./weather.css";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: configuredSiteUrl ? new URL(configuredSiteUrl) : undefined,
  title: {
    default: "Mejia Software — Software built for real problems",
    template: "%s — Mejia Software",
  },
  description: "Independent software studio by Jamie Mejia building useful software, automation, open-source projects, and AI-powered tools.",
  applicationName: "Mejia Software",
  icons: {
    icon: [{ url: "/mejia-signature.svg", type: "image/svg+xml" }],
    shortcut: "/mejia-signature.svg",
    apple: "/mejia-signature.svg",
  },
  openGraph: {
    type: "website",
    title: "Mejia Software",
    description: "Software built for real problems.",
    siteName: "Mejia Software",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <BrowserDeterrents />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

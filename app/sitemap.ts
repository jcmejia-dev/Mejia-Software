import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!configuredUrl) return [];

  const baseUrl = configuredUrl.replace(/\/$/, "");
  const routes = ["", "/products", "/tools", "/open-source", "/labs", "/about"];
  return routes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date() }));
}

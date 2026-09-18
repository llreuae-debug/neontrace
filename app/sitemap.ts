import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://neontrace.app";
  const routes = [
    "",
    "/auth/login",
    "/auth/signup",
    "/auth/forgot-password",
    "/auth/verify-email",
    "/features",
    "/how-it-works",
    "/download",
    "/privacy",
    "/terms",
    "/security",
    "/contact",
    "/main/dashboard",
    "/main/map",
    "/main/people",
    "/main/activity",
    "/main/places",
    "/main/journey",
    "/main/notifications",
    "/main/profile",
    "/main/settings",
    "/main/privacy",
    "/main/share",
    "/main/ghost-mode",
    "/main/safe-arrival",
    "/main/emergency",
    "/main/trust-circle",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/main") ? 0.8 : 0.7,
  }));
}


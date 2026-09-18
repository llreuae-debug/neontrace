import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    { url: "https://neontrace.app", lastModified: new Date() },
    { url: "https://neontrace.app/auth/login", lastModified: new Date() },
    { url: "https://neontrace.app/auth/signup", lastModified: new Date() },
    { url: "https://neontrace.app/auth/forgot-password", lastModified: new Date() },
    { url: "https://neontrace.app/auth/verify-email", lastModified: new Date() },
    { url: "https://neontrace.app/features", lastModified: new Date() },
    { url: "https://neontrace.app/how-it-works", lastModified: new Date() },
    { url: "https://neontrace.app/privacy", lastModified: new Date() },
    { url: "https://neontrace.app/security", lastModified: new Date() },
    { url: "https://neontrace.app/contact", lastModified: new Date() },
    { url: "https://neontrace.app/download", lastModified: new Date() },
    {
      url: "https://neontrace.app/main/dashboard",
      lastModified: new Date(),
    },
    { url: "https://neontrace.app/main/map", lastModified: new Date() },
    { url: "https://neontrace.app/main/people", lastModified: new Date() },
    { url: "https://neontrace.app/main/activity", lastModified: new Date() },
    { url: "https://neontrace.app/main/places", lastModified: new Date() },
    { url: "https://neontrace.app/main/journey", lastModified: new Date() },
    { url: "https://neontrace.app/main/notifications", lastModified: new Date() },
    { url: "https://neontrace.app/main/profile", lastModified: new Date() },
    { url: "https://neontrace.app/main/settings", lastModified: new Date() },
    { url: "https://neontrace.app/main/privacy", lastModified: new Date() },
    { url: "https://neontrace.app/main/share", lastModified: new Date() },
    { url: "https://neontrace.app/main/ghost-mode", lastModified: new Date() },
    {
      url: "https://neontrace.app/main/safe-arrival",
      lastModified: new Date(),
    },
    { url: "https://neontrace.app/main/emergency", lastModified: new Date() },
    { url: "https://neontrace.app/main/trust-circle", lastModified: new Date() },
  ];
}

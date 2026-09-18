import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NEONTRACE — Your people. Your places. Your world — live.",
    template: "%s | NEONTRACE",
  },
  description:
    "Share your live location with the people you trust. See them on the map. Stay in control. Location sharing with privacy at its core.",
  keywords: [
    "location sharing",
    "live tracking",
    "family tracking",
    "privacy",
    "NEONTRACE",
    "real-time location",
    "trust circle",
    "safe arrival",
  ],
  authors: [{ name: "NEONTRACE" }],
  creator: "NEONTRACE",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://neontrace.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://neontrace.app",
    siteName: "NEONTRACE",
    title: "NEONTRACE — Your people. Your places. Your world — live.",
    description:
      "Share your live location with the people you trust. See them on the map. Stay in control. Location sharing with privacy at its core.",
    images: [
      {
        url: "/icons/og-image.png",
        width: 1200,
        height: 630,
        alt: "NEONTRACE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEONTRACE — Your people. Your places. Your world — live.",
    description:
      "Share your live location with the people you trust. See them on the map. Stay in control.",
    images: ["/icons/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050508",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-bg-primary text-text-primary font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

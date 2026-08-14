import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import { AuditModalProvider } from "@/components/AuditModalContext";
import AuditModal from "@/components/AuditModal";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import OrganizationSchema from "@/components/OrganizationSchema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — AI Search Visibility for Local Businesses`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} — AI Search Visibility for Local Businesses`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — AI Search Visibility for Local Businesses`,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <OrganizationSchema />
        <AuditModalProvider>
          {children}
          <AuditModal />
        </AuditModalProvider>
        <ScrollDepthTracker />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

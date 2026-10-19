import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/site";
import { CallModalProvider } from "@/components/CallModalContext";
import CallModal from "@/components/CallModal";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import OrganizationSchema from "@/components/OrganizationSchema";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});



const title = `${SITE_NAME} — ${SITE_TAGLINE}`;
const keywords = ["YouTube editing", "YouTube video editor", "short-form repurposing", "YouTube Shorts editing", "content packaging", "YouTube thumbnails", "business YouTube", "creator studio"];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <OrganizationSchema />
        <CallModalProvider>
          {children}
          <CallModal />
        </CallModalProvider>
        <ScrollDepthTracker />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

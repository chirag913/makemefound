import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SOCIAL_LINKS, OWN_CHANNELS } from "@/lib/site";

// Organization schema is used here rather than LocalBusiness because MakeMeFound serves
// clients nationally rather than operating from a single physical storefront.
//
// [ADDRESS — add real US business address before adding LocalBusiness schema]
// Do not add a `LocalBusiness` type or an `address` field to this object until a real,
// verified US business address is available — a placeholder address is a factual claim
// to search engines and should never ship.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: "hello@makemefound.com",
  sameAs: [...SOCIAL_LINKS.map((s) => s.href), ...OWN_CHANNELS.map((c) => c.url)],
};

export default function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}

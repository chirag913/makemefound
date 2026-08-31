import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How MakeMeFound collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-fg-subtle">Last updated: [Effective Date]</p>

          <div className="mt-10 space-y-10 text-sm leading-relaxed text-fg-muted">
            <section>
              <h2 className="text-lg font-semibold text-fg">Who We Are</h2>
              <p className="mt-3">
                MakeMeFound (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is a brand
                operated by CHIRAG DIGITAL PRIVATE LIMITED. CHIRAG DIGITAL PRIVATE LIMITED operates
                and manages the MakeMeFound website and the services available through{" "}
                <a href="https://www.makemefound.com" className="text-accent hover:text-accent-hover">
                  www.makemefound.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-fg">1. Overview</h2>
              <p className="mt-3">
                MakeMeFound (&ldquo;MakeMeFound,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
                &ldquo;our&rdquo;) provides client-acquisition and outbound growth services to
                commercial cleaning companies in the United States. This Privacy Policy explains
                what information we collect through makemefound.com (the &ldquo;Site&rdquo;), how
                we use it, and the choices you have.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-fg">2. Information We Collect</h2>
              <p className="mt-3">When you submit the Growth Call form, we collect:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Your name and contact details (email, phone)</li>
                <li>Your company name, website, and service area</li>
                <li>Any additional information you choose to share about your ideal accounts</li>
              </ul>
              <p className="mt-3">
                We also collect standard analytics data automatically through Google Analytics 4,
                such as pages visited, referral source, device type, and general engagement
                events (for example, scroll depth and button clicks).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-fg">3. How We Use Your Information</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>To respond to your Growth Call request and provide the services you asked for</li>
                <li>To communicate with you about your account or engagement with us</li>
                <li>To improve our website, services, and marketing</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-fg">4. How We Share Your Information</h2>
              <p className="mt-3">
                We do not sell your personal information. We do not share the information you
                submit through the Growth Call form with third parties for their own marketing
                purposes.
                We may share information with service providers who help us operate the Site and
                deliver our services (for example, hosting, database, and email-delivery
                providers), under obligations to protect it.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-fg">5. Data Retention</h2>
              <p className="mt-3">
                We retain information you submit for as long as necessary to respond to your
                request, deliver services, and meet legal or business record-keeping requirements.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-fg">6. Your Choices</h2>
              <p className="mt-3">
                You may request access to, correction of, or deletion of your personal information
                by contacting us at{" "}
                <a href="mailto:hello@makemefound.com" className="text-accent hover:text-accent-hover">
                  hello@makemefound.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-fg">7. Cookies and Analytics</h2>
              <p className="mt-3">
                The Site uses Google Analytics 4 to understand how visitors use the Site. You can
                opt out of Google Analytics tracking using your browser settings or available
                opt-out tools.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-fg">8. Contact Us</h2>
              <p className="mt-3">
                Questions about this Privacy Policy can be sent to{" "}
                <a href="mailto:hello@makemefound.com" className="text-accent hover:text-accent-hover">
                  hello@makemefound.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

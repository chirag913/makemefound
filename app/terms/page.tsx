import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the MakeMeFound website and services.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-fg-subtle">Last updated: [Effective Date]</p>

          <div className="mt-10 space-y-10 text-sm leading-relaxed text-fg-muted">
            <section>
              <h2 className="text-lg font-semibold text-fg">About MakeMeFound</h2>
              <p className="mt-3">
                MakeMeFound is a brand and business operated by CHIRAG DIGITAL PRIVATE LIMITED, a
                company incorporated under the Companies Act, 2013 in India.
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Legal Entity: CHIRAG DIGITAL PRIVATE LIMITED</li>
                <li>Brand: MakeMeFound</li>
                <li>
                  Website:{" "}
                  <a href="https://www.makemefound.com" className="text-accent hover:text-accent-hover">
                    www.makemefound.com
                  </a>
                </li>
              </ul>
              <p className="mt-3">
                All services provided through MakeMeFound are offered and operated by CHIRAG
                DIGITAL PRIVATE LIMITED.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-fg">1. Agreement to Terms</h2>
              <p className="mt-3">
                By accessing or using makemefound.com (the &ldquo;Site&rdquo;) or submitting a
                request through the Site, you agree to these Terms of Service. If you do not
                agree, please do not use the Site.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-fg">2. Description of Services</h2>
              <p className="mt-3">
                MakeMeFound provides client-acquisition and outbound growth services to B2B
                service companies, including prospect research, decision-maker identification,
                outbound outreach campaigns, and follow-up. Details of any specific engagement are
                governed by a separate agreement between MakeMeFound and the client.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-fg">3. No Guaranteed Results</h2>
              <p className="mt-3">
                MakeMeFound does not guarantee a specific number of clients, contracts, or sales
                outcomes. Our goal is to generate qualified sales opportunities; you control
                pricing, sales conversations, proposals, and closing. Any metrics, sample data, or
                illustrative dashboards shown on this Site are for explanatory purposes only and do
                not represent guaranteed outcomes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-fg">4. Growth Call Requests</h2>
              <p className="mt-3">
                Submitting the Growth Call form is a request for information and does not create a
                service agreement. By submitting the form, you consent to be contacted by
                MakeMeFound about your request.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-fg">5. Intellectual Property</h2>
              <p className="mt-3">
                All content on the Site, including text, graphics, and design, is the property of
                MakeMeFound or its licensors and may not be reproduced without permission.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-fg">6. Limitation of Liability</h2>
              <p className="mt-3">
                To the fullest extent permitted by law, MakeMeFound is not liable for indirect,
                incidental, or consequential damages arising from your use of the Site or reliance
                on any information it contains.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-fg">7. Changes to These Terms</h2>
              <p className="mt-3">
                We may update these Terms from time to time. Continued use of the Site after
                changes are posted constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-fg">8. Governing Law</h2>
              <p className="mt-3">
                These Terms are governed by the laws of India, without regard to conflict-of-law
                principles.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-fg">9. Contact Us</h2>
              <p className="mt-3">
                Questions about these Terms can be sent to{" "}
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

import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/container";
import { SiteShell } from "@/components/layout/site-shell";
import { FIRM } from "@/lib/firm";

export const Route = createFileRoute("/privacy")({ component: Privacy });

function Privacy() {
  return (
    <SiteShell>
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-crimson">
            Notices
          </p>
          <h1 className="mt-4 font-display text-5xl text-paper">
            Privacy and advertising
          </h1>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-muted">
            <p>
              This website is attorney advertising on behalf of {FIRM.legalName}.
              Prior results do not guarantee a similar outcome. The information
              here is general. It is not legal advice.
            </p>
            <p>
              Sending an inquiry, including through the intake form or{" "}
              {FIRM.email}, does not create an attorney-client relationship.
              That relationship begins only when a written engagement is signed.
              Do not send confidential information until you are asked to do so.
            </p>
            <p>
              Inquiries submitted through this site are received in the firm
              inbox so that law firm staff may contact you. We do not sell
              intake information. We handle matters throughout California.
            </p>
            <p>
              Call {FIRM.phoneVanity} ({FIRM.phoneNumeric}) for urgent matters.
            </p>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}

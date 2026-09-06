import { createFileRoute } from "@tanstack/react-router";
import { IntakeForm } from "@/components/intake-form";
import { Container } from "@/components/layout/container";
import { SiteShell } from "@/components/layout/site-shell";
import { FIRM } from "@/lib/firm";

export const Route = createFileRoute("/intake")({ component: Intake });

function Intake() {
  return (
    <SiteShell>
      <section className="py-16 sm:py-20">
        <Container className="grid items-start gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-xs uppercase tracking-widest text-crimson">
              Confidential intake
            </p>
            <h1 className="mt-4 font-display text-5xl text-paper">
              Tell us what happened.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted">
              Law firm staff stands ready to contact you upon inquiry. Your
              note goes to the firm inbox at {FIRM.email}. We handle matters
              throughout California.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-subtle">
              Submitting this form does not create an attorney-client
              relationship. If you need someone immediately, call{" "}
              <a
                href={FIRM.phoneTel}
                className="text-paper underline-offset-4 hover:underline"
              >
                {FIRM.phoneVanity}
              </a>{" "}
              ({FIRM.phoneNumeric}).
            </p>
            <img
              src="/photos/conference.jpg"
              alt="Intake meeting"
              className="mt-8 hidden aspect-4/3 w-full rounded-xl object-cover lg:block"
            />
          </div>
          <div className="lg:col-span-3">
            <IntakeForm />
            <p className="mt-4 text-xs leading-relaxed text-subtle">
              The first inquiry to a new inbox may require a one-time
              confirmation from {FIRM.email}. After that, notices arrive
              automatically. Attorney advertising. Prior results do not
              guarantee a similar outcome.
            </p>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}

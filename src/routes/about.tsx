import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/container";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { FIRM } from "@/lib/firm";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <SiteShell>
      <section className="border-b border-line py-16 sm:py-20">
        <Container className="grid items-end gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-widest text-crimson">
              The firm
            </p>
            <h1 className="mt-4 font-display text-5xl text-paper">
              Built for riders. Tried in California courts.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
              {FIRM.legalName} practices from Irvine and handles matters
              throughout California. {FIRM.industryLine} We specialize in legal
              services tailored for the power sports industry — motorcyclists
              and the families who call after a crash.
            </p>
          </div>
          <img
            src="/photos/team-plaza.jpg"
            alt="Counsel for Bike911 outside the office"
            className="aspect-4/3 w-full rounded-xl object-cover object-top"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-widest text-crimson">
              Founding counsel
            </p>
            <h2 className="mt-3 font-display text-4xl text-paper">
              Alessandro G. Assanti, Esq.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              University of Colorado, with honors, 1988. UC Berkeley MBA, 1991.
              Western State University College of Law, 1995. Thirty years of
              practice. Licensed in all California state courts, federal courts
              in the Ninth Circuit, and federal courts in Nebraska and New
              York. Multiple jury verdicts, defense verdicts, and arbitration
              awards.
            </p>
            <p className="mt-4 font-display text-2xl text-paper">
              {FIRM.recoveries}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              He is the only trial attorney in the country with a professional
              racing background in motorcycle racing. Multiple regional
              Superbike titles. AMA professional experience from 1988 through
              2008. The staff includes qualified paralegals, litigation
              attorneys, and support staff.
            </p>
          </div>
          <img
            src="/photos/championships.jpg"
            alt="Assanti with championship number plates"
            className="aspect-4/3 w-full rounded-xl object-cover"
          />
        </Container>
      </section>

      <section className="border-y border-line bg-elevated py-16 sm:py-24">
        <Container className="grid gap-6 sm:grid-cols-2">
          <figure>
            <img
              src="/photos/courthouse-trio.jpg"
              alt="Counsel conferring in a courthouse hallway"
              className="aspect-4/3 w-full rounded-xl object-cover"
            />
            <figcaption className="mt-3 text-sm text-muted">
              Trial work is still done in hallways, chambers, and on the record.
            </figcaption>
          </figure>
          <figure>
            <img
              src="/photos/conference.jpg"
              alt="Working session in the conference room"
              className="aspect-4/3 w-full rounded-xl object-cover"
            />
            <figcaption className="mt-3 text-sm text-muted">
              Files are prepared here. Inquiries are answered here. Statewide.
            </figcaption>
          </figure>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <img
            src="/photos/team-plaza-grey.jpg"
            alt="The Bike911 team"
            className="aspect-4/3 w-full rounded-xl object-cover object-top"
          />
          <div>
            <h2 className="font-display text-4xl text-paper">
              Matters throughout California
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              {FIRM.jurisdiction} Crashes on the 5, potholes in the mountains,
              and left-turn wrecks on Pacific Coast Highway. The office is in
              Irvine. The practice is the state.
            </p>
            <p className="mt-4 text-sm text-muted">
              {FIRM.addressLine1}
              <br />
              {FIRM.addressLine2}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="crimson">
                <Link to="/intake">Start intake</Link>
              </Button>
              <Button asChild variant="outline">
                <a href={FIRM.phoneTel}>{FIRM.phoneVanity}</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { FIRM, JOURNAL, PRACTICE_AREAS, STATS } from "@/lib/firm";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden border-b border-line">
        <p
          aria-hidden="true"
          className="pointer-events-none absolute -left-6 top-8 select-none font-display text-watermark leading-none text-paper/5 lg:left-0"
        >
          911
        </p>
        <Container className="relative grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-xs uppercase tracking-widest text-crimson">
              {FIRM.legalName}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-none text-paper sm:text-6xl lg:text-7xl">
              Trial counsel for riders. Throughout California.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
              {FIRM.industryLine} Expert legal services for power sports
              enthusiasts. The only trial lawyer in the country with a
              professional motorcycle-racing background.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" variant="crimson">
                <Link to="/intake">
                  Start confidential intake
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={FIRM.phoneTel}>
                  <Phone />
                  {FIRM.phoneVanity}
                </a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-subtle">{FIRM.phoneNumeric}</p>
          </div>
          <div className="overflow-hidden rounded-xl">
            <img
              src="/photos/courthouse-portrait.jpg"
              alt="Founding counsel at the courthouse"
              className="h-96 w-full object-cover object-top sm:h-hero"
            />
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-elevated">
        <Container className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl text-paper">{stat.value}</p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-16 sm:py-24" id="services">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-crimson">
                Practice
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-4xl text-paper">
                Crashes, dangerous roads, and the ride home.
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/practice">
                All services
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICE_AREAS.map((area) => (
              <Link
                key={area.id}
                to="/practice"
                hash={area.id}
                className="group relative overflow-hidden rounded-xl"
              >
                <img
                  src={area.image}
                  alt={area.title}
                  className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-2xl text-paper">{area.title}</p>
                  <p className="mt-1 text-sm text-muted">{area.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-elevated py-16 sm:py-24">
        <Container>
          <p className="text-xs uppercase tracking-widest text-crimson">
            The firm
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl text-paper">
            Capturing our journey: a glimpse into our commitment to the power
            sports community.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNAL.map((shot) => (
              <figure key={shot.src}>
                <img
                  src={shot.src}
                  alt={shot.alt}
                  className="aspect-4/3 w-full rounded-lg object-cover object-top"
                />
                <figcaption className="mt-2 text-xs uppercase tracking-widest text-subtle">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <img
            src="/photos/championships.jpg"
            alt="Championship number plates from a professional racing career"
            className="aspect-4/3 w-full rounded-xl object-cover"
          />
          <div>
            <p className="text-xs uppercase tracking-widest text-crimson">
              Founding counsel
            </p>
            <h2 className="mt-3 font-display text-4xl text-paper">
              Alessandro G. Assanti, Esq.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              University of Colorado, with honors, 1988. UC Berkeley MBA, 1991.
              Western State University College of Law, 1995. Multiple regional
              Superbike titles. AMA professional experience from 1988 through
              2008. Licensed in all California state courts and in federal
              courts in the Ninth Circuit, Nebraska, and New York.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {FIRM.recoveries}. {FIRM.jurisdiction}
            </p>
            <Button asChild className="mt-8" variant="outline">
              <Link to="/about">
                Meet the firm
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-elevated py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-widest text-crimson">
              Confidential intake
            </p>
            <h2 className="mt-3 font-display text-4xl text-paper">
              Law firm staff stands ready to contact you upon inquiry.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Better yet, see us in person. We are in Irvine, Monday through
              Friday, 8:00 AM to 4:00 PM. Or tell us what happened — the form is
              confidential. Submitting it does not create an attorney-client
              relationship until a written engagement is signed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="crimson" size="lg">
                <Link to="/intake">Begin intake</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a>
              </Button>
            </div>
          </div>
          <img
            src="/photos/team-plaza-grey.jpg"
            alt="Counsel for Bike911"
            className="aspect-video w-full rounded-xl object-cover object-top"
          />
        </Container>
      </section>
    </SiteShell>
  );
}

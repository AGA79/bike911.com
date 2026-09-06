import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/container";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { FIRM, PRACTICE_AREAS } from "@/lib/firm";

export const Route = createFileRoute("/practice")({ component: Practice });

function Practice() {
  return (
    <SiteShell>
      <section className="border-b border-line py-16 sm:py-20">
        <Container className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-crimson">
            Practice
          </p>
          <h1 className="mt-4 font-display text-5xl text-paper">
            Rider injury law, statewide.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted">
            Motorcycle and automobile crashes, and dangerous roads.{" "}
            {FIRM.jurisdiction}
          </p>
        </Container>
      </section>

      {PRACTICE_AREAS.map((area, index) => (
        <section
          key={area.id}
          id={area.id}
          className={
            index % 2 === 1
              ? "scroll-mt-20 bg-elevated"
              : "scroll-mt-20 bg-ink"
          }
        >
          <Container className="grid items-center gap-10 py-16 lg:grid-cols-2 sm:py-20">
            <img
              src={area.image}
              alt={area.title}
              className={`aspect-video w-full rounded-xl object-cover ${index % 2 === 1 ? "lg:order-2" : ""}`}
            />
            <div>
              <p className="text-xs uppercase tracking-widest text-crimson">
                0{index + 1}
              </p>
              <h2 className="mt-3 font-display text-4xl text-paper">
                {area.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                {area.body}
              </p>
            </div>
          </Container>
        </section>
      ))}

      <section className="border-t border-line py-16">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl text-paper">Ready to talk.</h2>
            <p className="mt-2 text-sm text-muted">
              Law firm staff stands ready to contact you upon inquiry.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="crimson">
              <Link to="/intake">Start intake</Link>
            </Button>
            <Button asChild variant="outline">
              <a href={FIRM.phoneTel}>{FIRM.phoneVanity}</a>
            </Button>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}

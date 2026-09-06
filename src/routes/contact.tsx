import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { FIRM } from "@/lib/firm";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  return (
    <SiteShell>
      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-widest text-crimson">
              Contact
            </p>
            <h1 className="mt-4 font-display text-5xl text-paper">
              {FIRM.phoneVanity}
            </h1>
            <p className="mt-2 text-lg text-muted">{FIRM.phoneNumeric}</p>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
              Law firm staff stands ready to contact you upon inquiry.{" "}
              {FIRM.jurisdiction}
            </p>

            <ul className="mt-10 space-y-6">
              <li className="flex gap-4">
                <Phone className="mt-1 size-5 text-crimson" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-subtle">
                    Call
                  </p>
                  <a href={FIRM.phoneTel} className="text-paper hover:underline">
                    {FIRM.phoneVanity}
                  </a>
                  <p className="text-sm text-muted">{FIRM.phoneNumeric}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 size-5 text-crimson" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-subtle">
                    Write
                  </p>
                  <a
                    href={`mailto:${FIRM.email}`}
                    className="text-paper hover:underline"
                  >
                    {FIRM.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin className="mt-1 size-5 text-crimson" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-subtle">
                    Office
                  </p>
                  <p className="text-paper">
                    {FIRM.addressLine1}
                    <br />
                    {FIRM.addressLine2}
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-10">
              <p className="text-xs uppercase tracking-widest text-subtle">
                Hours
              </p>
              <ul className="mt-3 space-y-1">
                {FIRM.hours.map((row) => (
                  <li
                    key={row.days}
                    className="flex justify-between gap-6 text-sm text-muted sm:max-w-xs"
                  >
                    <span>{row.days}</span>
                    <span className="text-paper">{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button asChild variant="crimson" className="mt-10">
              <Link to="/intake">Start confidential intake</Link>
            </Button>
          </div>

          <img
            src="/photos/courthouse-portrait.jpg"
            alt="Founding counsel"
            className="aspect-3/4 w-full rounded-xl object-cover object-top"
          />
        </Container>
      </section>
    </SiteShell>
  );
}

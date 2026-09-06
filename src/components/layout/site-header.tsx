import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FIRM, NAV } from "@/lib/firm";
import { Container } from "./container";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ink/95 backdrop-blur-sm">
      <div className="border-b border-line bg-elevated">
        <Container className="flex h-9 items-center justify-between gap-4 text-xs uppercase tracking-widest text-muted">
          <span className="truncate">Throughout California</span>
          <a href={FIRM.phoneTel} className="shrink-0 text-paper hover:underline">
            {FIRM.phoneVanity}
            <span className="hidden text-subtle sm:inline">
              {" "}
              {FIRM.phoneNumeric}
            </span>
          </a>
        </Container>
      </div>
      <div className="border-b border-line">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link
            to="/"
            className="flex min-h-11 items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <span className="font-display text-2xl tracking-tight text-paper">
              {FIRM.shortName}
            </span>
            <span className="hidden text-xs uppercase tracking-widest text-muted sm:block">
              Assanti Law
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-muted transition-colors duration-150 hover:text-paper"
                activeProps={{ className: "text-paper" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              variant="crimson"
              className="hidden md:inline-flex"
            >
              <Link to="/intake">Start intake</Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </Container>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-b border-line bg-ink lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex min-h-11 items-center text-base text-paper"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={FIRM.phoneTel}
              className="flex min-h-11 items-center gap-2 text-paper"
            >
              <Phone className="size-4 text-crimson" />
              {FIRM.phoneVanity}
              <span className="text-muted">{FIRM.phoneNumeric}</span>
            </a>
            <Button asChild variant="crimson" className="mt-2">
              <Link to="/intake" onClick={() => setOpen(false)}>
                Start intake
              </Link>
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

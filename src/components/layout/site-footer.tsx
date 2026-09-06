import { Link } from "@tanstack/react-router";
import { FIRM, NAV } from "@/lib/firm";
import { Container } from "./container";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-elevated">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-display text-3xl text-paper">{FIRM.shortName}</p>
          <p className="mt-2 text-sm text-muted">{FIRM.legalName}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            {FIRM.tagline} {FIRM.jurisdiction}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-subtle">Visit</p>
          <p className="mt-3 text-sm leading-relaxed text-paper">
            {FIRM.addressLine1}
            <br />
            {FIRM.addressLine2}
          </p>
          <a
            href={FIRM.phoneTel}
            className="mt-4 block text-sm text-paper hover:underline"
          >
            {FIRM.phoneVanity}
            <span className="mt-1 block text-muted">{FIRM.phoneNumeric}</span>
          </a>
          <a
            href={`mailto:${FIRM.email}`}
            className="mt-2 block text-sm text-paper hover:underline"
          >
            {FIRM.email}
          </a>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-subtle">Pages</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/" className="text-sm text-muted hover:text-paper">
                Home
              </Link>
            </li>
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-muted hover:text-paper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/privacy"
                className="text-sm text-muted hover:text-paper"
              >
                Privacy & notices
              </Link>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="border-t border-line py-6">
        <p className="text-xs leading-relaxed text-subtle">
          Attorney advertising. Prior results do not guarantee a similar
          outcome. No attorney-client relationship is formed until a written
          engagement is signed. {FIRM.jurisdiction} {FIRM.recoveries}. ©{" "}
          {new Date().getFullYear()} {FIRM.legalName}
        </p>
      </Container>
    </footer>
  );
}

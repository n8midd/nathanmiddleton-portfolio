import { Check } from "lucide-react";
import { contactOfferings } from "@/lib/data/contact";

export function ContactOfferings() {
  return (
    <section className="space-y-4" data-testid="contact-offerings">
      <h2 className="text-lg font-semibold">Looking for someone to</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {contactOfferings.map((offering) => (
          <li
            key={offering.id}
            className="flex gap-3 rounded-lg border border-border/60 bg-card/40 p-4"
            data-testid="contact-offering-item"
            data-offering-id={offering.id}
          >
            <Check
              className="mt-0.5 size-5 shrink-0 text-[var(--status-pass)]"
              aria-hidden="true"
            />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">{offering.label}</p>
              {offering.description ? (
                <p className="text-sm text-muted-foreground">{offering.description}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

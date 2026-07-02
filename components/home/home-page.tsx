import Link from "next/link";
import { SectionHeader } from "@/components/dashboard/section-header";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getHomeSections,
  homeFeaturedLinks,
  homeHero,
  homePriorityLinks,
} from "@/lib/data/home";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function HomePage() {
  const sections = getHomeSections();

  return (
    <div className="space-y-10" data-testid="home-page">
      <SectionHeader
        title={siteConfig.name}
        description={`${siteConfig.author} · ${siteConfig.tagline}`}
      />
      <p className="max-w-3xl text-muted-foreground" data-testid="home-hero">
        {homeHero}
      </p>

      <section className="space-y-4" data-testid="home-priority-links">
        <h2 className="text-lg font-semibold">Quick links</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homePriorityLinks.map((link) => (
            <Card key={link.id} className="border-border/60 bg-card/80">
              <CardHeader>
                <CardTitle className="text-base">
                  {link.external ? (
                    <a
                      href={link.href}
                      target={link.id === "email" ? undefined : "_blank"}
                      rel={link.id === "email" ? undefined : "noopener noreferrer"}
                      data-testid={`priority-link-${link.id}`}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} data-testid={`priority-link-${link.id}`}>
                      {link.label}
                    </Link>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4" data-testid="home-sections">
        <h2 className="text-lg font-semibold">Explore by section</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {sections.map((section) => (
            <Card key={section.group} className="border-border/60 bg-card/80" data-testid={`section-${section.group.toLowerCase()}`}>
              <CardHeader>
                <CardTitle className="text-base">{section.group}</CardTitle>
                <p className="text-sm text-muted-foreground">{section.summary}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.features.map((feature) => (
                    <li key={feature.href}>
                      <Link
                        href={feature.href}
                        className="text-sm text-[var(--status-pass)] underline-offset-4 hover:underline"
                        data-testid="section-feature-link"
                      >
                        {feature.label}
                      </Link>
                      <span className="text-sm text-muted-foreground"> — {feature.description}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4" data-testid="home-featured">
        <h2 className="text-lg font-semibold">Start here</h2>
        <div className="flex flex-wrap gap-3">
          {homeFeaturedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(buttonVariants({ variant: "outline" }))}
              data-testid="featured-link"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          {homeFeaturedLinks.map((link) => link.description).join(" · ")}
        </p>
      </section>
    </div>
  );
}

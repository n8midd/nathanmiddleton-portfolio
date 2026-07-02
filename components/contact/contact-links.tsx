import { Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { contactCta } from "@/lib/data/contact";
import { siteConfig } from "@/lib/site-config";

export function ContactLinks() {
  return (
    <Card className="border-border/60 bg-card/80" data-testid="contact-cta">
      <CardHeader>
        <CardTitle className="text-xl">{contactCta.headline}</CardTitle>
        <p className="text-sm text-muted-foreground">{contactCta.subtext}</p>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        <a
          href={`mailto:${siteConfig.email}`}
          className={cn(buttonVariants({ variant: "outline" }))}
          data-testid="contact-link-email"
        >
          <Mail className="size-4" aria-hidden="true" />
          Email
        </a>
        <a
          href={siteConfig.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline" }))}
          data-testid="contact-link-linkedin"
        >
          LinkedIn
        </a>
        <a
          href={siteConfig.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline" }))}
          data-testid="contact-link-github"
        >
          GitHub
        </a>
      </CardContent>
    </Card>
  );
}

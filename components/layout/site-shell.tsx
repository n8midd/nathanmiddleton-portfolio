"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { features, getNavFeatures, navGroups, siteConfig, type NavGroup } from "@/lib/site-config";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const grouped = navGroups.reduce<Record<NavGroup, typeof features>>(
    (acc, group) => {
      acc[group] = getNavFeatures().filter((feature) => feature.group === group);
      return acc;
    },
    {} as Record<NavGroup, typeof features>,
  );

  return (
    <nav className="space-y-6">
      {navGroups.map((group) => (
        <div key={group} className="space-y-2">
          <p className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {group}
          </p>
          <ul className="space-y-1">
            {grouped[group].map((feature) => {
              const isActive = pathname === feature.href;

              return (
                <li key={feature.href}>
                  <Link
                    href={feature.href}
                    onClick={onNavigate}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                    )}
                  >
                    <span>{feature.label}</span>
                    {feature.status === "planned" ? (
                      <Badge variant="outline" className="ml-2 hidden font-mono text-[10px] lg:inline-flex">
                        soon
                      </Badge>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 flex-col">
          <span className="truncate font-mono text-sm font-semibold tracking-tight">
            {siteConfig.name}
          </span>
          <span className="truncate text-xs text-muted-foreground">{siteConfig.author}</span>
        </Link>

        <div className="ml-auto lg:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" aria-label="Open navigation menu" />
              }
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="font-mono text-left">{siteConfig.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border/60 lg:block">
      <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-4">
        <NavLinks />
      </div>
    </aside>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {siteConfig.author}. Quality Engineering Lab.
        </p>
        <div className="flex gap-4">
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import { siteConfig, type SiteFeature } from "./site-config";

export function createPageMetadata(feature: SiteFeature): Metadata {
  return {
    title: `${feature.label} | ${siteConfig.name}`,
    description: feature.description,
  };
}

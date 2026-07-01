"use client";

import type { ComponentType } from "react";
import { getDemoBySlug } from "@/lib/data/playground";
import { AlertsDemo } from "./demos/alerts-demo";
import { ApiCallsDemo } from "./demos/api-calls-demo";
import { DragAndDropDemo } from "./demos/drag-and-drop-demo";
import { DownloadsDemo } from "./demos/downloads-demo";
import { DropdownsDemo } from "./demos/dropdowns-demo";
import { DynamicIdsDemo } from "./demos/dynamic-ids-demo";
import { FormsDemo } from "./demos/forms-demo";
import { IframesDemo } from "./demos/iframes-demo";
import { InfiniteScrollDemo } from "./demos/infinite-scroll-demo";
import { LoginDemo } from "./demos/login-demo";
import { ModalsDemo } from "./demos/modals-demo";
import { ShadowDomDemo } from "./demos/shadow-dom-demo";
import { TablesDemo } from "./demos/tables-demo";
import { UploadsDemo } from "./demos/uploads-demo";
import type { PlaygroundDemo } from "@/lib/data/playground";

const demoComponents: Record<string, ComponentType<{ demo: PlaygroundDemo }>> = {
  login: LoginDemo,
  forms: FormsDemo,
  dropdowns: DropdownsDemo,
  alerts: AlertsDemo,
  "shadow-dom": ShadowDomDemo,
  "infinite-scroll": InfiniteScrollDemo,
  tables: TablesDemo,
  modals: ModalsDemo,
  uploads: UploadsDemo,
  downloads: DownloadsDemo,
  "drag-and-drop": DragAndDropDemo,
  iframes: IframesDemo,
  "api-calls": ApiCallsDemo,
  "dynamic-ids": DynamicIdsDemo,
};

interface PlaygroundDemoViewProps {
  slug: string;
}

export function PlaygroundDemoView({ slug }: PlaygroundDemoViewProps) {
  const demo = getDemoBySlug(slug);
  const DemoComponent = demoComponents[slug];

  if (!demo || !DemoComponent) {
    return null;
  }

  return <DemoComponent demo={demo} />;
}

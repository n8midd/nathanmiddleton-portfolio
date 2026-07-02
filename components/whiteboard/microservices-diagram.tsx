"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  defaultMicroserviceId,
  getMicroserviceById,
  microservices,
  whiteboardIntro,
  type Microservice,
} from "@/lib/data/whiteboard";
import { ServiceDetailPanel } from "./service-detail-panel";

function MicroserviceNode({
  service,
  isSelected,
  onSelect,
}: {
  service: Microservice;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      data-testid="microservice-node"
      data-service-id={service.id}
      aria-label={service.label}
      aria-pressed={isSelected}
      onClick={onSelect}
      className={cn(
        "w-full min-w-[9rem] rounded-lg border px-4 py-3 text-left transition-colors",
        isSelected
          ? "border-[var(--status-pass)]/50 bg-[var(--status-pass)]/10"
          : "border-border/60 bg-card/80 hover:bg-accent/50",
      )}
    >
      <span className="font-mono text-sm font-semibold">{service.label}</span>
      <p className="mt-1 text-xs text-muted-foreground">{service.summary}</p>
    </button>
  );
}

function FlowArrow({ direction = "down" }: { direction?: "down" | "right" }) {
  return (
    <span className="text-muted-foreground" aria-hidden="true">
      {direction === "down" ? "↓" : "→"}
    </span>
  );
}

export function MicroservicesDiagram() {
  const [selectedId, setSelectedId] = useState(defaultMicroserviceId);
  const selectedService = getMicroserviceById(selectedId);

  const users = getMicroserviceById("users")!;
  const orders = getMicroserviceById("orders")!;
  const inventory = getMicroserviceById("inventory")!;
  const payments = getMicroserviceById("payments")!;
  const catalog = getMicroserviceById("catalog")!;
  const shipping = getMicroserviceById("shipping")!;
  const notifications = getMicroserviceById("notifications")!;

  return (
    <section className="space-y-6" data-testid="microservices-diagram">
      <p className="text-sm text-muted-foreground">{whiteboardIntro}</p>

      <div className="flex flex-col items-center gap-2">
        <MicroserviceNode
          service={users}
          isSelected={selectedId === users.id}
          onSelect={() => setSelectedId(users.id)}
        />
        <FlowArrow />

        <div className="flex w-full max-w-2xl flex-col items-center gap-2 sm:flex-row sm:justify-center">
          <MicroserviceNode
            service={orders}
            isSelected={selectedId === orders.id}
            onSelect={() => setSelectedId(orders.id)}
          />
          <FlowArrow direction="right" />
          <MicroserviceNode
            service={inventory}
            isSelected={selectedId === inventory.id}
            onSelect={() => setSelectedId(inventory.id)}
          />
        </div>

        <div className="flex w-full max-w-3xl flex-col items-center gap-2 lg:flex-row lg:justify-center">
          <MicroserviceNode
            service={payments}
            isSelected={selectedId === payments.id}
            onSelect={() => setSelectedId(payments.id)}
          />
          <FlowArrow direction="right" />
          <MicroserviceNode
            service={catalog}
            isSelected={selectedId === catalog.id}
            onSelect={() => setSelectedId(catalog.id)}
          />
          <FlowArrow direction="right" />
          <MicroserviceNode
            service={shipping}
            isSelected={selectedId === shipping.id}
            onSelect={() => setSelectedId(shipping.id)}
          />
        </div>

        <FlowArrow />
        <MicroserviceNode
          service={notifications}
          isSelected={selectedId === notifications.id}
          onSelect={() => setSelectedId(notifications.id)}
        />
      </div>

      <p className="text-xs text-muted-foreground" data-testid="microservice-count">
        {microservices.length} services in this topology
      </p>

      {selectedService ? <ServiceDetailPanel service={selectedService} /> : null}
    </section>
  );
}

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Microservice } from "@/lib/data/whiteboard";

interface ServiceDetailPanelProps {
  service: Microservice;
}

export function ServiceDetailPanel({ service }: ServiceDetailPanelProps) {
  return (
    <Card className="border-border/60 bg-card/80" data-testid="service-detail-panel">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-base">{service.label}</CardTitle>
          <Badge variant="outline" className="text-xs" data-testid="service-role-badge">
            {service.role}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{service.summary}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {service.testStrategy.map((layer) => (
          <section
            key={layer.id}
            className="space-y-2"
            data-testid="test-strategy-layer"
            data-layer-id={layer.id}
          >
            <h3 className="text-sm font-semibold text-foreground">{layer.label}</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {layer.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </CardContent>
    </Card>
  );
}

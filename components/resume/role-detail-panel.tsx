import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateRange, type CareerRole } from "@/lib/data/resume";

interface RoleDetailPanelProps {
  role: CareerRole | undefined;
}

export function RoleDetailPanel({ role }: RoleDetailPanelProps) {
  if (!role) {
    return (
      <Card className="border-dashed border-border/60 bg-card/40" data-testid="role-detail-placeholder">
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          Select a role on the timeline to view highlights and technologies.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="border-border/60 bg-card/80"
      data-testid="role-detail"
      data-role-id={role.id}
    >
      <CardHeader>
        <CardTitle className="text-base">{role.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {role.company} · {formatDateRange(role.startDate, role.endDate)}
        </p>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
        <p>{role.summary}</p>

        {role.subRoles && role.subRoles.length > 0 ? (
          <div className="space-y-2" data-testid="role-sub-roles">
            <h3 className="text-sm font-semibold text-foreground">Role progression</h3>
            <ul className="space-y-2">
              {role.subRoles.map((subRole) => (
                <li
                  key={`${subRole.title}-${subRole.startDate}`}
                  className="rounded-md border border-border/60 bg-muted/20 px-3 py-2"
                >
                  <span className="font-medium text-foreground">{subRole.title}</span>
                  <span className="ml-2 font-mono text-xs">
                    {formatDateRange(subRole.startDate, subRole.endDate)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Highlights</h3>
          <ul className="list-disc space-y-1 pl-5">
            {role.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        {role.technologies && role.technologies.length > 0 ? (
          <div className="space-y-2" data-testid="role-technologies">
            <h3 className="text-sm font-semibold text-foreground">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {role.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="font-mono text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

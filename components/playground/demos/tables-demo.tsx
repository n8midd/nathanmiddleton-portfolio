"use client";

import { useMemo, useState } from "react";
import { tableRows } from "@/lib/data/playground";
import { PlaygroundDemoShell } from "../playground-demo-shell";
import type { PlaygroundDemo } from "@/lib/data/playground";

interface TablesDemoProps {
  demo: PlaygroundDemo;
}

type SortKey = "name" | "role" | "status";

export function TablesDemo({ demo }: TablesDemoProps) {
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortAsc, setSortAsc] = useState(true);

  const rows = useMemo(() => {
    const filtered = tableRows.filter((row) =>
      row.name.toLowerCase().includes(filter.toLowerCase()),
    );

    return [...filtered].sort((a, b) => {
      const comparison = a[sortKey].localeCompare(b[sortKey]);
      return sortAsc ? comparison : -comparison;
    });
  }, [filter, sortKey, sortAsc]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc((asc) => !asc);
      return;
    }
    setSortKey(key);
    setSortAsc(true);
  };

  return (
    <PlaygroundDemoShell demo={demo}>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Filter by name..."
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="w-full max-w-xs rounded-md border border-border bg-background px-3 py-2 text-sm"
          data-testid="table-filter"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-testid="data-table">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 pr-4">
                  <button
                    type="button"
                    onClick={() => handleSort("name")}
                    data-testid="table-sort-name"
                  >
                    Name {sortKey === "name" ? (sortAsc ? "↑" : "↓") : ""}
                  </button>
                </th>
                <th className="pb-2 pr-4">
                  <button
                    type="button"
                    onClick={() => handleSort("role")}
                    data-testid="table-sort-role"
                  >
                    Role {sortKey === "role" ? (sortAsc ? "↑" : "↓") : ""}
                  </button>
                </th>
                <th className="pb-2">
                  <button
                    type="button"
                    onClick={() => handleSort("status")}
                    data-testid="table-sort-status"
                  >
                    Status {sortKey === "status" ? (sortAsc ? "↑" : "↓") : ""}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-border/60" data-testid="table-row">
                  <td className="py-2 pr-4" data-testid="table-cell-name">
                    {row.name}
                  </td>
                  <td className="py-2 pr-4">{row.role}</td>
                  <td className="py-2">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground" data-testid="table-first-row">
          First row: {rows[0]?.name ?? "None"}
        </p>
      </div>
    </PlaygroundDemoShell>
  );
}

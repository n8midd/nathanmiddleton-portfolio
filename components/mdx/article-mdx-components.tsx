import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

function ArticleTable({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-border/60 bg-card/40">
      <table
        className={cn("w-full min-w-[20rem] border-collapse text-sm", className)}
        {...props}
      />
    </div>
  );
}

export const articleMdxComponents = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mt-10 mb-4 text-2xl font-semibold first:mt-0" {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-8 mb-4 text-xl font-semibold" {...props} />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-6 mb-3 text-lg font-semibold" {...props} />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-7 text-muted-foreground" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground" {...props} />
  ),
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6 text-muted-foreground" {...props} />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-7" {...props} />
  ),
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 border-[var(--status-pass)]/60 bg-muted/30 py-3 pr-4 pl-4 text-muted-foreground italic"
      {...props}
    />
  ),
  hr: (props: HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-border/60" {...props} />
  ),
  strong: (props: HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg border border-border/60 bg-muted/50 p-4 font-mono text-sm leading-6 text-foreground"
      {...props}
    />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => {
    const { className, ...rest } = props;

    if (className) {
      return <code className={cn("font-mono text-sm", className)} {...rest} />;
    }

    return (
      <code
        className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-[var(--status-pass)]"
        {...rest}
      />
    );
  },
  table: ArticleTable,
  thead: (props: HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="border-b border-border/60 bg-muted/50" {...props} />
  ),
  tbody: (props: HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-border/40" {...props} />
  ),
  tr: (props: HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="transition-colors hover:bg-muted/20" {...props} />
  ),
  th: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 text-left font-semibold text-foreground" {...props} />
  ),
  td: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 text-muted-foreground" {...props} />
  ),
};

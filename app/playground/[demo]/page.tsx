import { notFound } from "next/navigation";
import { PlaygroundDemoView } from "@/components/playground/playground-demo-registry";
import { getDemoBySlug, getAllDemoSlugs } from "@/lib/data/playground";

interface PlaygroundDemoPageProps {
  params: Promise<{ demo: string }>;
}

export async function generateStaticParams() {
  return getAllDemoSlugs().map((demo) => ({ demo }));
}

export async function generateMetadata({ params }: PlaygroundDemoPageProps) {
  const { demo: demoSlug } = await params;
  const demo = getDemoBySlug(demoSlug);

  if (!demo) {
    return { title: "Demo not found" };
  }

  return {
    title: `${demo.label} | Testing Playground`,
    description: demo.description,
  };
}

export default async function PlaygroundDemoPage({ params }: PlaygroundDemoPageProps) {
  const { demo: demoSlug } = await params;
  const demo = getDemoBySlug(demoSlug);

  if (!demo) {
    notFound();
  }

  return <PlaygroundDemoView slug={demoSlug} />;
}

import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/coming-soon";
import { getFeatureBySlug, playgroundDemos } from "@/lib/site-config";

interface PlaygroundDemoPageProps {
  params: Promise<{ demo: string }>;
}

export async function generateStaticParams() {
  return playgroundDemos.map((demo) => ({ demo: demo.slug }));
}

export async function generateMetadata({ params }: PlaygroundDemoPageProps) {
  const { demo: demoSlug } = await params;
  const demo = playgroundDemos.find((item) => item.slug === demoSlug);

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
  const demo = playgroundDemos.find((item) => item.slug === demoSlug);
  const feature = getFeatureBySlug("playground")!;

  if (!demo) {
    notFound();
  }

  return (
    <ComingSoon
      feature={{
        ...feature,
        label: `${feature.label}: ${demo.label}`,
        description: demo.description,
      }}
    />
  );
}

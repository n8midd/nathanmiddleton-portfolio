import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Footer, Header, Sidebar } from "@/components/layout/site-shell";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "A Quality Engineering Lab showcasing automation architecture, leadership thinking, and interactive testing tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}

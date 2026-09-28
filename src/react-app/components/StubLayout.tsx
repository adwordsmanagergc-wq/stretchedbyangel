import { SiteHeader, FooterLinks } from "@/react-app/components/SiteNav";

export default function StubLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">{title}</h1>
        {intro && <p className="text-lg text-muted-foreground mb-10 leading-relaxed">{intro}</p>}
        <div className="prose prose-invert max-w-none text-muted-foreground space-y-6 leading-relaxed">
          {children}
        </div>
      </main>

      <footer className="py-8 border-t border-border text-center text-sm text-muted-foreground">
        <FooterLinks className="mb-4" />
        © {new Date().getFullYear()} Stretched By Angel. Gold Coast, Australia.
      </footer>
    </div>
  );
}

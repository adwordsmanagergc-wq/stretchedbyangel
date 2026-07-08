import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const LOGO = "/stretched-by-angel-transparent-logo.png";

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
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to home</span>
          </Link>
          <Link to="/">
            <img src={LOGO} alt="Stretched By Angel" className="h-10 w-10" />
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">{title}</h1>
        {intro && <p className="text-lg text-muted-foreground mb-10 leading-relaxed">{intro}</p>}
        <div className="prose prose-invert max-w-none text-muted-foreground space-y-6 leading-relaxed">
          {children}
        </div>
      </main>

      <footer className="py-8 border-t border-border text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Stretched By Angel. Gold Coast, Australia.
      </footer>
    </div>
  );
}

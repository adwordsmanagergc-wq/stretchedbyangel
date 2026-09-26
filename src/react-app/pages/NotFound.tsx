import { Link } from "react-router";
import StubLayout from "@/react-app/components/StubLayout";
import { usePageHead } from "@/seo/head";

/**
 * Rendered for any unknown URL. The prerender writes this page to
 * dist/404.html, which Vercel serves with an HTTP 404 status.
 */
export default function NotFoundPage() {
  usePageHead({
    title: "Page Not Found | Stretched By Angel",
    description:
      "Sorry, this page could not be found. Head back to Stretched By Angel for assisted stretching and personal training on the Gold Coast.",
    robots: "noindex",
  });

  return (
    <StubLayout
      title="Page not found"
      intro="Sorry, the page you were looking for doesn't exist or has moved."
    >
      <p>Here are some good places to start instead:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <Link to="/" className="text-primary hover:underline">
            Assisted stretching on the Gold Coast
          </Link>
        </li>
        <li>
          <Link to="/personal-training" className="text-primary hover:underline">
            Personal training
          </Link>
        </li>
        <li>
          <Link to="/areas-i-service" className="text-primary hover:underline">
            Areas I service
          </Link>
        </li>
      </ul>
    </StubLayout>
  );
}

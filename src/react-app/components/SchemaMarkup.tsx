import { usePageHead } from "@/seo/head";
import { ANGEL, AREAS_SERVED, BUSINESS } from "@/react-app/lib/business";

type SchemaType = "home" | "personal-training";

/** Canonical personal training URL (/personal-training 301-redirects here). */
const PT_PATH = "/personal-training-gold-coast";

const STRETCHING_FAQS = [
  {
    q: "What is PNF stretching?",
    a: "PNF (Proprioceptive Neuromuscular Facilitation) stretching is an advanced technique that combines passive stretching with isometric contractions. It's scientifically proven to be more effective than traditional stretching methods, helping you achieve greater flexibility gains in less time.",
  },
  {
    q: "How is assisted stretching different from stretching on my own?",
    a: "With assisted stretching, a trained professional guides your body into deeper, more effective stretches than you could achieve alone. I can apply the right amount of pressure, ensure proper form, and target muscles you might not be able to reach yourself.",
  },
  {
    q: "Who can benefit from PNF stretching?",
    a: "Everyone! Whether you're an athlete looking to improve performance, someone with chronic pain or stiffness, an office worker with tight shoulders and neck, or just want to move and feel better—assisted stretching can help you.",
  },
  {
    q: "How often should I get stretched?",
    a: "For best results, I recommend 1-2 sessions per week. However, even a single session can provide noticeable relief. We'll discuss a schedule that works for your goals and lifestyle.",
  },
  {
    q: "What should I wear to a session?",
    a: "Wear comfortable, flexible clothing you can move in—activewear, leggings, shorts, or athletic gear works great. Avoid jeans or restrictive clothing.",
  },
  {
    q: "Do I need to be flexible to start?",
    a: "Absolutely not! I work with people of all flexibility levels. In fact, the less flexible you are, the more you'll benefit from assisted stretching. Every session is tailored to your current ability.",
  },
];

function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${BUSINESS.url}/#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: BUSINESS.description,
    url: BUSINESS.url,
    logo: BUSINESS.logo,
    image: BUSINESS.image,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    currenciesAccepted: BUSINESS.currency,
    address: {
      "@type": "PostalAddress",
      ...BUSINESS.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: BUSINESS.openingHours.dayOfWeek,
      opens: BUSINESS.openingHours.opens,
      closes: BUSINESS.openingHours.closes,
    },
    sameAs: [BUSINESS.instagram],
    areaServed: AREAS_SERVED.map((name) => ({
      "@type": "City",
      name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Queensland, Australia",
      },
    })),
  };
}

function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BUSINESS.url}/#angel`,
    name: ANGEL.name,
    jobTitle: ANGEL.jobTitle,
    image: ANGEL.image,
    worksFor: { "@id": `${BUSINESS.url}/#business` },
    knowsAbout: ANGEL.knowsAbout,
    description: `${ANGEL.jobTitle} with ${ANGEL.yearsExperience}+ years of experience on the Gold Coast.`,
  };
}

function stretchingServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BUSINESS.url}/#stretching-service`,
    name: "Assisted PNF Stretching Gold Coast",
    serviceType: "Assisted Stretching",
    provider: { "@id": `${BUSINESS.url}/#business` },
    areaServed: AREAS_SERVED.map((name) => ({ "@type": "City", name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Assisted Stretching Sessions",
      itemListElement: [
        {
          "@type": "Offer",
          name: "30 Minute Session",
          price: "60",
          priceCurrency: "AUD",
          itemOffered: { "@type": "Service", name: "30 Minute Assisted Stretching Session" },
        },
        {
          "@type": "Offer",
          name: "60 Minute Session",
          price: "90",
          priceCurrency: "AUD",
          itemOffered: { "@type": "Service", name: "60 Minute Assisted Stretching Session" },
        },
        {
          "@type": "Offer",
          name: "60 Minute Home Visit",
          price: "130",
          priceCurrency: "AUD",
          itemOffered: { "@type": "Service", name: "60 Minute Home Visit Stretching Session" },
        },
        {
          "@type": "Offer",
          name: "10 Pack — 30 Minute Sessions",
          price: "550",
          priceCurrency: "AUD",
          itemOffered: { "@type": "Service", name: "10x 30 Minute Sessions" },
        },
        {
          "@type": "Offer",
          name: "10 Pack — 60 Minute Sessions",
          price: "800",
          priceCurrency: "AUD",
          itemOffered: { "@type": "Service", name: "10x 60 Minute Sessions" },
        },
      ],
    },
  };
}

function ptServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BUSINESS.url}/#pt-service`,
    name: "Personal Training Gold Coast",
    serviceType: "Personal Training",
    provider: { "@id": `${BUSINESS.url}/#business` },
    areaServed: AREAS_SERVED.map((name) => ({ "@type": "City", name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Personal Training Options",
      itemListElement: [
        {
          "@type": "Offer",
          name: "In-Person Training",
          itemOffered: {
            "@type": "Service",
            name: "One-on-one personal training sessions on the Gold Coast",
          },
        },
        {
          "@type": "Offer",
          name: "Online Coaching",
          itemOffered: {
            "@type": "Service",
            name: "Online personal training with custom programs and weekly check-ins",
          },
        },
        {
          "@type": "Offer",
          name: "Custom Training Programs",
          itemOffered: {
            "@type": "Service",
            name: "Personalised workout programs to follow independently",
          },
        },
      ],
    },
  };
}

type Faq = { q: string; a: string };

function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

function webPageSchema(type: SchemaType) {
  const isHome = type === "home";
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BUSINESS.url}${isHome ? "/" : PT_PATH}#webpage`,
    url: `${BUSINESS.url}${isHome ? "/" : PT_PATH}`,
    name: isHome
      ? "Assisted Stretching Gold Coast | Stretched By Angel"
      : "Personal Training Gold Coast | Stretched By Angel",
    isPartOf: { "@id": `${BUSINESS.url}/#website` },
    about: { "@id": `${BUSINESS.url}/#business` },
    primaryImageOfPage: BUSINESS.image,
  };
}

function buildSchemas(type: SchemaType, faqs?: Faq[]) {
  if (type === "home") {
    return [
      businessSchema(),
      personSchema(),
      stretchingServiceSchema(),
      faqSchema(STRETCHING_FAQS),
      webPageSchema("home"),
    ];
  }
  return [
    businessSchema(),
    personSchema(),
    ptServiceSchema(),
    ...(faqs?.length ? [faqSchema(faqs)] : []),
    webPageSchema("personal-training"),
  ];
}

const META = {
  home: {
    title: "Assisted Stretching Gold Coast | Stretched By Angel",
    description:
      "Assisted stretching Gold Coast with Angel Elliott. PNF stretching for flexibility, pain relief and recovery at Wicked Bodz, Surfers Paradise, or at home.",
    ogImage: BUSINESS.image,
  },
  "personal-training": {
    title: "Personal Training Gold Coast | Stretched By Angel",
    description:
      "Personal training Gold Coast with Angel Elliott, 10+ years experience. In-person sessions at Wicked Bodz, Surfers Paradise, online coaching and custom programs.",
    ogImage: BUSINESS.image,
  },
} satisfies Record<SchemaType, { title: string; description: string; ogImage: string }>;

export default function SchemaMarkup({ type, faqs }: { type: SchemaType; faqs?: Faq[] }) {
  const meta = META[type];
  usePageHead({
    title: meta.title,
    description: meta.description,
    canonical: type === "home" ? "/" : PT_PATH,
    ogImage: meta.ogImage,
    jsonLd: buildSchemas(type, faqs),
  });
  return null;
}

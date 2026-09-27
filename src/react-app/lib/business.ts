export const BUSINESS = {
  name: "Stretched By Angel",
  legalName: "Stretched By Angel",
  url: "https://www.stretchedbyangel.com",
  logo: "https://www.stretchedbyangel.com/stretched-by-angel-transparent-logo.png",
  image: "https://www.stretchedbyangel.com/assisted-stretching-gold-coast-hero.webp",
  description:
    "Professional assisted PNF stretching and personal training on the Gold Coast by Angel Elliott.",
  email: "angelfitnessjsyci@icloud.com",
  telephone: "+61434773815",
  phoneDisplay: "0434 773 815",
  whatsapp: "https://wa.me/61434773815",
  instagram: "https://instagram.com/angelfitnessau",
  instagramHandle: "@angelfitnessau",
  priceRange: "$$",
  currency: "AUD",
  /** Studio venue (Angel trains out of this gym). */
  venue: "Wicked Bodz Fitness Centre",
  address: {
    streetAddress: "Level 1, 45 Cavill Ave",
    addressLocality: "Surfers Paradise",
    addressRegion: "QLD",
    postalCode: "4217",
    addressCountry: "AU",
  },
  /** Display versions of the address. Must match the Google Business Profile exactly. */
  addressLine: "Level 1, 45 Cavill Ave, Surfers Paradise QLD 4217",
  geo: { latitude: -28.0014685, longitude: 153.4277109 },
  /** Google Business Profile (Maps) listing. */
  googleMapsUrl: "https://maps.google.com/?cid=10841806488396252302",
  /** Opening hours, kept in sync with the Google Business Profile. */
  openingHours: [
    { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "05:30", closes: "19:00" },
    { dayOfWeek: ["Friday"], opens: "05:30", closes: "14:00" },
    { dayOfWeek: ["Saturday"], opens: "06:00", closes: "12:00" },
  ],
  /** Human-readable hours for the page. */
  hoursDisplay: [
    ["Mon to Thu", "5:30am to 7pm"],
    ["Friday", "5:30am to 2pm"],
    ["Saturday", "6am to 12pm"],
    ["Sunday", "Closed"],
  ] as [string, string][],
};

export const AREAS_SERVED = [
  "Surfers Paradise",
  "Broadbeach",
  "Burleigh Heads",
  "Palm Beach",
  "Coolangatta",
  "Southport",
  "Labrador",
  "Main Beach",
  "Mermaid Beach",
  "Miami",
  "Robina",
  "Varsity Lakes",
  "Currumbin",
  "Tugun",
  "Kirra",
  "Bilinga",
  "Runaway Bay",
  "Paradise Point",
  "Coomera",
  "Helensvale",
  "Nerang",
  "Mudgeeraba",
  "Ashmore",
  "Benowa",
  "Carrara",
  "Gold Coast",
  "Upper Coomera",
  "Pimpama",
  "Ormeau",
  "Oxenford",
  "Pacific Pines",
  "Arundel",
];

export const ANGEL = {
  name: "Angel Elliott",
  jobTitle: "Certified Stretch Therapist & Personal Trainer",
  yearsExperience: 10,
  // Self-hosted copy of the original portrait (see scripts/localize-remote-images.mjs).
  image: "https://www.stretchedbyangel.com/images/angel-elliott-stretch-therapist-gold-coast.webp",
  knowsAbout: [
    "PNF Stretching",
    "Assisted Stretching",
    "Personal Training",
    "Flexibility Training",
    "Muscle Recovery",
    "Sports Massage",
  ],
};

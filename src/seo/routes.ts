import { SUBURBS, slugify } from "@/data/suburbs";

/** Every indexable-or-not route the site serves, used by the prerender. */
export const STATIC_ROUTES = [
  "/",
  "/areas-i-service",
  "/assisted-stretching-gold-coast",
  "/personal-training-gold-coast",
  "/disclaimer",
  "/waiver",
];

export const SUBURB_ROUTES = SUBURBS.flatMap((name) => [
  `/assisted-stretching/${slugify(name)}`,
  `/personal-training/${slugify(name)}`,
]);

export const ALL_ROUTES = [...STATIC_ROUTES, ...SUBURB_ROUTES];

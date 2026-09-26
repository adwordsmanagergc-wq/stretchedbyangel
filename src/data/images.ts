/**
 * Every image used in page content, self-hosted under /public with its
 * intrinsic size. Spread one into an <img> to get src, width and height,
 * which lets the browser reserve space before the image loads (no layout
 * shift). CSS classes still control the rendered size.
 *
 *   <img {...IMG.logo} alt="..." className="h-12 w-12" />
 *
 * Remote originals (formerly on mochausercontent.com) are downloaded and
 * converted to WebP by scripts/localize-remote-images.mjs.
 */
export type ImageAsset = { src: string; width: number; height: number };

export const IMG = {
  logo: { src: "/stretched-by-angel-logo.webp", width: 512, height: 512 },
  heroAngel: { src: "/assisted-stretching-gold-coast-hero.webp", width: 896, height: 1195 },
  promo: { src: "/assisted-stretching-gold-coast.webp", width: 900, height: 1117 },
  studio1: { src: "/assisted-stretching-gold-coast-1.webp", width: 900, height: 985 },
  angelPortrait: {
    src: "/images/angel-elliott-stretch-therapist-gold-coast.webp",
    width: 900,
    height: 1205,
  },
  ptOnlineCoaching: {
    src: "/images/personal-training-gold-coast-online-coaching.webp",
    width: 910,
    height: 1236,
  },
  ptGymSession: { src: "/images/personal-training-gold-coast-gym-session.webp", width: 692, height: 968 },
  ptPhysique: { src: "/images/personal-training-gold-coast-physique.webp", width: 1016, height: 1048 },
  ptTransformation: {
    src: "/images/personal-training-gold-coast-transformation.webp",
    width: 772,
    height: 772,
  },
  pnfSession: { src: "/images/pnf-stretching-session-gold-coast.webp", width: 1200, height: 901 },
} satisfies Record<string, ImageAsset>;

export const absoluteImage = (img: ImageAsset) => `https://www.stretchedbyangel.com${img.src}`;

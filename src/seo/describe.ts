/**
 * Build a meta description that lands in the 150 to 160 character range.
 *
 * `parts` is a list of slots; each slot lists alternative phrasings from
 * most to least detailed. The first combination (in that preference order)
 * whose total length is within range wins. If nothing fits, the closest
 * combination at or under the max is used so the page still renders.
 */
export const DESC_MIN = 150;
export const DESC_MAX = 160;

export function fitDescription(parts: string[][], min = DESC_MIN, max = DESC_MAX): string {
  let best = "";
  const walk = (i: number, acc: string): string | null => {
    if (i === parts.length) {
      if (acc.length <= max && acc.length > best.length) best = acc;
      return acc.length >= min && acc.length <= max ? acc : null;
    }
    for (const option of parts[i]) {
      const hit = walk(i + 1, acc + option);
      if (hit) return hit;
    }
    return null;
  };
  return walk(0, "") ?? best;
}

/** "18 minutes away" style drive-time phrase from the studio in Surfers Paradise. */
export function drivePhrase(studioMin: number) {
  return studioMin <= 1 ? "right on Cavill Avenue" : `${studioMin} minutes away`;
}

export function suburbStretchDescription(suburb: string, studioMin: number) {
  return fitDescription([
    [`Assisted stretching in ${suburb} with Angel Elliott.`],
    [
      " PNF stretching for flexibility, pain relief and faster recovery.",
      " PNF stretching for flexibility, pain relief and recovery.",
      " PNF stretching for flexibility and pain relief.",
      " PNF stretching for tight muscles.",
      " PNF stretching.",
    ],
    studioMin <= 1
      ? [" Studio sessions at Wicked Bodz on Cavill Avenue, or home visits."]
      : [
          ` Studio sessions in Surfers Paradise, ${drivePhrase(studioMin)}, or home visits.`,
          ` Surfers Paradise studio, ${drivePhrase(studioMin)}, or home visits.`,
        ],
    [" Book today.", " Book now.", ""],
  ]);
}

export function suburbPTDescription(suburb: string, studioMin: number) {
  return fitDescription([
    [`Personal training in ${suburb} with Angel Elliott, 10+ years experience.`],
    [
      " Strength, fat loss and fitness coaching.",
      " Strength and fat loss coaching.",
      " Strength coaching.",
      "",
    ],
    studioMin <= 1
      ? [" Train at Wicked Bodz on Cavill Avenue, or online."]
      : [
          ` Train at Wicked Bodz, Surfers Paradise, ${drivePhrase(studioMin)}, or online.`,
          ` Train in Surfers Paradise, ${drivePhrase(studioMin)}, or online.`,
        ],
    [" Book today.", " Book now.", ""],
  ]);
}

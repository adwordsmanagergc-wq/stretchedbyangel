export const SUBURBS = [
  "Advancetown","Arundel","Ashmore","Benowa","Biggera Waters","Bilinga","Bonogin",
  "Broadbeach","Broadbeach Waters","Bundall","Burleigh Heads","Burleigh Waters",
  "Carrara","Chevron Island","Clagiraba","Clear Island Waters","Coolangatta",
  "Coombabah","Coomera","Currumbin","Currumbin Valley","Currumbin Waters","Elanora",
  "Gaven","Gilston","Guanaba","Helensvale","Highland Park","Hollywell","Hope Island",
  "Isle of Capri","Jacobs Well","Kirra","Labrador","Lower Beechmont","Main Beach",
  "Maudsland","Mermaid Beach","Mermaid Waters","Merrimac","Miami","Midway",
  "Molendinar","Mudgeeraba","Nerang","Neranwood","Norwell","Ormeau","Ormeau Hills",
  "Oxenford","Pacific Pines","Palm Beach","Paradise Point","Paradise Waters",
  "Parkwood","Pimpama","Reedy Creek","Robina","Runaway Bay","Sanctuary Cove",
  "South Stradbroke Island","Southport","Springbrook","Stapylton","Steiglitz",
  "Surfers Paradise","Tallai","Tallebudgera","Tallebudgera Valley","Tugun",
  "Upper Coomera","Varsity Lakes","Willow Vale","Wongawallan","Woongoolba",
  "Worongary","Yatala",
] as const;

export type Suburb = (typeof SUBURBS)[number];

export const slugify = (s: string) =>
  s.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");

export const unslugify = (slug: string): Suburb | undefined =>
  SUBURBS.find((s) => slugify(s) === slug);

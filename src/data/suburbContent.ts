/**
 * Suburb tiers and hand-written Tier 1 page content.
 *
 * Tier 1: the suburbs closest to the Wicked Bodz studio in Surfers Paradise
 * and/or with the largest populations. Their stretching and personal
 * training pages get fully unique copy (intro, who books, suburb FAQs) and
 * are indexed and listed in sitemap.xml.
 *
 * Tier 2: every other suburb. Pages stay live for visitors and internal
 * linking but ship <meta name="robots" content="noindex,follow"> and are
 * left out of sitemap.xml until unique content is written for them. To
 * promote a suburb: write its entry in TIER1_CONTENT and set tier: 1.
 *
 * Drive times come from studioMin in suburbProfiles.ts (typical off-peak
 * drive to Wicked Bodz Fitness Centre, 45 Cavill Ave, Surfers Paradise).
 */
import { SUBURBS, slugify } from "@/data/suburbs";

export type Tier = 1 | 2;

const TIER1_SLUGS = [
  "surfers-paradise",
  "main-beach",
  "broadbeach",
  "bundall",
  "broadbeach-waters",
  "benowa",
  "mermaid-beach",
  "mermaid-waters",
  "southport",
  "ashmore",
  "miami",
  "labrador",
  "burleigh-heads",
  "robina",
  "varsity-lakes",
] as const;

export const SUBURB_TIERS: { name: string; slug: string; tier: Tier }[] = SUBURBS.map((name) => {
  const slug = slugify(name);
  return { name, slug, tier: (TIER1_SLUGS as readonly string[]).includes(slug) ? 1 : 2 };
});

export function getTier(slug: string): Tier {
  return SUBURB_TIERS.find((s) => s.slug === slug)?.tier ?? 2;
}

export const TIER2_ROBOTS = "noindex,follow";

/**
 * Nearby Tier 1 suburbs for the "Nearby areas" block on Tier 1 pages. Only
 * Tier 1 (indexed) suburbs are listed so the block never links to noindex
 * pages. Ordered roughly by distance.
 */
const TIER1_NEARBY: Record<(typeof TIER1_SLUGS)[number], (typeof TIER1_SLUGS)[number][]> = {
  "surfers-paradise": ["main-beach", "broadbeach", "bundall", "benowa", "southport"],
  "main-beach": ["surfers-paradise", "southport", "labrador", "bundall"],
  broadbeach: ["surfers-paradise", "mermaid-beach", "broadbeach-waters", "mermaid-waters", "bundall"],
  bundall: ["surfers-paradise", "benowa", "broadbeach-waters", "ashmore", "main-beach"],
  "broadbeach-waters": ["broadbeach", "mermaid-waters", "bundall", "benowa", "surfers-paradise"],
  benowa: ["bundall", "ashmore", "broadbeach-waters", "surfers-paradise", "robina"],
  "mermaid-beach": ["broadbeach", "miami", "mermaid-waters", "broadbeach-waters"],
  "mermaid-waters": ["mermaid-beach", "broadbeach-waters", "miami", "robina", "broadbeach"],
  southport: ["main-beach", "labrador", "ashmore", "surfers-paradise", "benowa"],
  ashmore: ["southport", "benowa", "bundall", "labrador"],
  miami: ["mermaid-beach", "burleigh-heads", "mermaid-waters", "broadbeach"],
  labrador: ["southport", "main-beach", "ashmore"],
  "burleigh-heads": ["miami", "mermaid-beach", "varsity-lakes", "robina"],
  robina: ["varsity-lakes", "mermaid-waters", "burleigh-heads", "benowa"],
  "varsity-lakes": ["robina", "burleigh-heads", "miami", "mermaid-waters"],
};

export function getTier1Nearby(slug: string): string[] {
  return (TIER1_NEARBY as Record<string, string[]>)[slug] ?? [];
}

export type Faq = { q: string; a: string };
export type ServiceCopy = {
  /** Unique 80+ word introduction about the suburb. */
  intro: string;
  /** Who typically books from this suburb. */
  whoBooks: string;
  /** 2 to 3 suburb-specific FAQs. */
  faqs: Faq[];
};

export const TIER1_CONTENT: Record<
  (typeof TIER1_SLUGS)[number],
  { stretch: ServiceCopy; pt: ServiceCopy }
> = {
  "surfers-paradise": {
    stretch: {
      intro:
        "Surfers Paradise is where the studio lives. Wicked Bodz Fitness Centre sits at 45 Cavill Avenue, a short walk from the Esplanade, the beach and the Q1 tower, so if you live or work in Surfers there is no drive at all. Most locals I see here work on their feet or at a screen: bar and restaurant crews finishing late, tower residents who train in their building gym, and remote workers living in apartments with a sea view and a terrible chair. A 30 or 60 minute assisted stretch fits between a shift and a swim.",
      whoBooks:
        "Hospitality staff after a double, apartment residents who train hard but never stretch, FIFO workers home for a week, and visitors who have flown in stiff and want to walk the beach without a sore back.",
      faqs: [
        {
          q: "Can I walk to the studio from anywhere in Surfers Paradise?",
          a: "From most of Surfers, yes. The studio is inside Wicked Bodz Fitness Centre at 45 Cavill Avenue, a few minutes on foot from the Esplanade and the light rail at Cavill Avenue station. Tower residents further north or south usually walk or jump on the G:link.",
        },
        {
          q: "I work late hospitality shifts in Surfers. Can I book around them?",
          a: "Yes. Sessions run from 6am to 8pm every day, so early mornings before a lunch shift or a mid-afternoon gap both work. Many Surfers hospitality clients book the 30 minute session for their knees, hips and lower back between shifts.",
        },
        {
          q: "I'm visiting the Gold Coast. Can I book a one-off session?",
          a: "Of course. Plenty of Surfers Paradise visitors book a single 60 minute session after a long flight or a big weekend. Call or message to check availability for the days you're in town.",
        },
      ],
    },
    pt: {
      intro:
        "Personal training in Surfers Paradise happens at Wicked Bodz Fitness Centre on Cavill Avenue, so for anyone living in the towers along the Esplanade or working in the Cavill Mall precinct, your trainer is a short walk away. Surfers is a busy place to live. Shift rosters change weekly, the beach is always calling, and the building gym is easy to skip. Structured one-on-one sessions give you a fixed time, a clear plan and someone checking your form, which is usually what turns occasional workouts into steady strength gains.",
      whoBooks:
        "Apartment residents who want more than the building gym, hospitality and casino staff on rotating rosters, FIFO workers who need a program for their weeks away, and beginners who find a busy commercial gym intimidating.",
      faqs: [
        {
          q: "Where do Surfers Paradise personal training sessions happen?",
          a: "At Wicked Bodz Fitness Centre, 45 Cavill Avenue. Sessions use the gym's full range of equipment, so there's no improvising in a park.",
        },
        {
          q: "My roster changes every week. Can I still train consistently?",
          a: "Yes. Sessions are booked week to week around your roster, and online coaching covers the weeks you can't make it in. Many Surfers clients combine one or two in-person sessions with a program they follow on their own.",
        },
        {
          q: "I'm FIFO. What happens when I'm on site?",
          a: "You get a program built for the gym you'll have on site, with video form checks and check-ins while you're away, then in-person sessions in Surfers when you're home.",
        },
      ],
    },
  },

  "main-beach": {
    stretch: {
      intro:
        "Main Beach is about six minutes from the studio, just north of Surfers Paradise along Main Beach Parade. It's a suburb of long walks and water: Tedder Avenue coffee in the morning, a loop out to The Spit, paddleboarding on the Broadwater behind Marina Mirage, and plenty of residents who work in the restaurants and shops that line it all. Those habits are good for you, but they tighten the calves, hips and shoulders in predictable ways. Assisted stretching releases exactly those areas so the walks and paddles stay enjoyable.",
      whoBooks:
        "Retirees who walk The Spit every day, paddleboarders on the Broadwater, Tedder Avenue and Marina Mirage hospitality staff, and apartment owners who prefer a home visit to parking in Surfers.",
      faqs: [
        {
          q: "How long does it take to get from Main Beach to the studio?",
          a: "About six minutes by car down Main Beach Parade, or a short G:link ride to Cavill Avenue. Home visits across Main Beach are also available if you'd rather stay put.",
        },
        {
          q: "I paddleboard on the Broadwater most mornings. Will stretching help my shoulders?",
          a: "It's one of the most common reasons Main Beach clients book. Paddling loads the lats, rotator cuff and upper back, and PNF stretching works through those areas more effectively than stretching on your own.",
        },
        {
          q: "Is assisted stretching suitable for older Main Beach residents?",
          a: "Yes. Sessions are gentle and paced to your body on the day. Many older clients use it to keep their hips, knees and calves comfortable for their daily walk to The Spit and back.",
        },
      ],
    },
    pt: {
      intro:
        "Main Beach sits a six minute drive north of the Wicked Bodz studio, which makes Surfers Paradise the closest proper gym for many Tedder Avenue and Marina Mirage locals. Life here is active but rarely structured. People walk to The Spit, swim at the Main Beach Pavilion end, and paddle the Broadwater, yet very few do the strength work that protects their joints and keeps them independent later in life. Personal training fills that gap with a program matched to your age, your goals and the activities you already love.",
      whoBooks:
        "Retirees building strength to stay independent, professionals living in the beachfront apartments, hospitality staff wanting a proper routine, and couples who train together.",
      faqs: [
        {
          q: "Do you train older clients from Main Beach?",
          a: "Yes, regularly. Programs for older clients focus on leg strength, balance, posture and bone health, progressed carefully and adjusted every session.",
        },
        {
          q: "Can my partner and I train together?",
          a: "Yes. Couples from Main Beach often book shared sessions. Each person gets exercises and loads suited to them, even when you train side by side.",
        },
        {
          q: "Is it easy to get to Wicked Bodz from Main Beach?",
          a: "Very. It's around six minutes by car, and the G:link runs from Main Beach to Cavill Avenue station, a short walk from the gym.",
        },
      ],
    },
  },

  broadbeach: {
    stretch: {
      intro:
        "Broadbeach is roughly seven minutes south of the studio, and it's one of the busiest suburbs I work in. The Oracle Boulevard café strip, Pacific Fair and The Star casino employ a lot of people who stand for long shifts, while the Esplanade and Kurrawa Beach fill up with runners, dog walkers and Pilates regulars every morning. That mix creates two common problems: tired, locked-up legs and lower backs from shift work, and tight calves and hips from running. Assisted PNF stretching addresses both, either at the studio or at home.",
      whoBooks:
        "Casino and Pacific Fair staff, runners who train along the Esplanade, Pilates and F45 members wanting more range, and apartment owners who prefer a home visit.",
      faqs: [
        {
          q: "I work shifts at The Star or Pacific Fair. What session suits me?",
          a: "Most shift workers start with the 30 minute session focused on the lower back, hips and legs. It's short enough to fit before or after a shift and makes a noticeable difference to how your legs feel the next day.",
        },
        {
          q: "I run along the Broadbeach Esplanade. How often should I stretch?",
          a: "Runners usually do well with one session a week while training for an event, dropping to fortnightly for maintenance. Calves, hamstrings, hip flexors and the IT band area are the usual focus.",
        },
        {
          q: "Can you come to my Broadbeach apartment?",
          a: "Yes. Home visits are available across Broadbeach for the 60 minute session. You just need a quiet space and room for a yoga mat.",
        },
      ],
    },
    pt: {
      intro:
        "Broadbeach is seven minutes from Wicked Bodz on the G:link or by car, so training in Surfers Paradise fits easily into a Broadbeach routine. The suburb is full of people who already move a lot, whether that's running the Esplanade, walking dogs at Kurrawa or doing group classes, but group fitness rarely builds real strength. One-on-one personal training adds progressive resistance work, technique coaching and a plan for your specific goal, whether that's losing fat, getting stronger or training around a demanding hospitality roster.",
      whoBooks:
        "Group class regulars ready for heavier lifting, runners adding strength to prevent injury, casino and retail staff on shifts, and professionals living in the Broadbeach towers.",
      faqs: [
        {
          q: "I already do F45 or Pilates in Broadbeach. Why add personal training?",
          a: "Group classes are great for fitness, but they can't progress your lifts individually or correct technique closely. Personal training builds measurable strength, which makes your classes better too.",
        },
        {
          q: "Can personal training help my running?",
          a: "Yes. Lower body and core strength work reduces common running injuries and improves efficiency. Many Broadbeach runners train with me once a week alongside their running plan.",
        },
        {
          q: "How do I get from Broadbeach to the gym?",
          a: "It's about seven minutes by car, or take the G:link from any Broadbeach station to Cavill Avenue, then walk a couple of minutes to Wicked Bodz.",
        },
      ],
    },
  },

  bundall: {
    stretch: {
      intro:
        "Bundall is only eight minutes from the studio, but it has a very different rhythm to the beachfront suburbs. This is where a lot of the Gold Coast goes to the office: Bundall Road's business strip, council and government workplaces, and the Gold Coast Turf Club with its racing staff and early starts. Long days at a desk shorten the hip flexors and stiffen the neck and lower back, and a lunch-break gym session rarely fixes it. Assisted stretching is a focused, efficient way to undo a week of sitting.",
      whoBooks:
        "Office workers from the Bundall Road business precinct, managers who sit through back-to-back meetings, racing industry staff with physical early starts, and runners using the Nerang River paths after work.",
      faqs: [
        {
          q: "Can I fit a session into a Bundall lunch break?",
          a: "Yes. The studio is about eight minutes away, so the 30 minute session fits into a long lunch. It's focused on the hips, lower back and neck, where desk work hits hardest.",
        },
        {
          q: "I sit all day. What will assisted stretching actually change?",
          a: "Most desk workers notice easier standing and walking, less lower back ache at the end of the day and more movement in the neck and shoulders. Consistency matters most, so weekly sessions for a month is a good start.",
        },
        {
          q: "Do you offer early morning sessions before work?",
          a: "Sessions start from 6am, which suits Bundall office workers and racing staff who want to be done before the working day begins.",
        },
      ],
    },
    pt: {
      intro:
        "For Bundall professionals, Wicked Bodz in Surfers Paradise is about eight minutes away, close enough for a before-work or lunchtime session. Bundall is the Gold Coast's office district, and office life follows a familiar pattern: long hours sitting, meetings that run over, and gym plans that slip when work gets busy. Personal training gives you a booked time that's harder to cancel, a program built around the time you actually have, and strength work that counters the posture problems desk jobs create.",
      whoBooks:
        "Corporate and government professionals, business owners who want efficient sessions, racing industry workers needing strength for physical work, and anyone who has joined a gym but stopped going.",
      faqs: [
        {
          q: "How long are sessions? I only have a lunch break.",
          a: "Sessions can be planned to fit a lunch break, and the gym is about eight minutes from Bundall Road. Each workout is planned in advance so no time is wasted.",
        },
        {
          q: "Can personal training help with desk posture?",
          a: "Yes. Strengthening the upper back, glutes and core and improving hip mobility is one of the most useful things you can do if you sit all day.",
        },
        {
          q: "What if work travel interrupts my training?",
          a: "Online coaching keeps you on track. You get a program for hotel gyms or bodyweight work while you're away, then pick up in-person sessions when you're back.",
        },
      ],
    },
  },

  "broadbeach-waters": {
    stretch: {
      intro:
        "Broadbeach Waters is a quiet, canal-lined suburb tucked behind Broadbeach, about nine minutes from the studio. Most homes back onto the water, and plenty of residents spend their mornings on it, launching boats or paddleboarding the canals, then spend the rest of the day working from a home office. That combination of paddling and sitting tends to tighten the shoulders, rotator cuff, neck and hip flexors all at once. Because so many locals work from home, a mobile session in your living room is often the easiest option here.",
      whoBooks:
        "Work-from-home professionals, boat owners and canal paddleboarders, downsizers settling into waterfront homes, and parents who can't easily leave the house for an hour.",
      faqs: [
        {
          q: "Do you do home visits in Broadbeach Waters?",
          a: "Yes, and it's one of the most requested areas for them. A 60 minute home visit needs a quiet room and space for a yoga mat. Everything else comes with me.",
        },
        {
          q: "I paddleboard the canals and work at a desk. Where would we focus?",
          a: "Usually the shoulders and lats from paddling, then the neck, chest and hip flexors from sitting. We'll adjust each session depending on what feels tight that day.",
        },
        {
          q: "How far is the studio from Broadbeach Waters?",
          a: "About nine minutes by car to Wicked Bodz Fitness Centre on Cavill Avenue in Surfers Paradise.",
        },
      ],
    },
    pt: {
      intro:
        "From Broadbeach Waters it's around nine minutes to Wicked Bodz in Surfers Paradise, which makes a regular training session very manageable. This canal suburb has a lot of people working from home, and while the flexibility is great, it also means less incidental movement, more hours sitting and fewer reasons to leave the house. Personal training gives your week structure. You'll get a clear strength program, proper coaching on technique and the accountability of a booked session, with online coaching available on the days you'd rather train at home.",
      whoBooks:
        "Remote workers wanting routine, empty nesters getting back into fitness, boat owners and paddlers building shoulder strength, and families fitting training around school hours.",
      faqs: [
        {
          q: "I work from home. Can I train online as well?",
          a: "Yes. Many Broadbeach Waters clients mix in-person sessions with an online program they follow at home or at a local gym, with video form checks in between.",
        },
        {
          q: "Can personal training help protect my shoulders for paddling?",
          a: "Yes. Building strength in the upper back and rotator cuff makes paddling more comfortable and helps keep shoulder niggles away.",
        },
        {
          q: "I haven't trained in years. Is that OK?",
          a: "Completely. Programs start from where you are now and progress gradually. Most Broadbeach Waters clients who return after a long break are surprised how quickly strength comes back.",
        },
      ],
    },
  },

  benowa: {
    stretch: {
      intro:
        "Benowa is a leafy, established suburb about ten minutes from the studio, built around Royal Pines Resort and the Gold Coast Botanic Gardens. Golf is a big part of life here, and golf is a one-sided sport: the same rotation, in the same direction, hundreds of times a week. Over time that tightens the obliques, hips and lower back unevenly, and it often shows up as a stiff back or a shorter backswing. Assisted stretching targets both sides of the body so Benowa golfers, tennis players and gardeners can keep playing comfortably.",
      whoBooks:
        "Golfers at Royal Pines, tennis and lawn bowls players, retirees who garden and walk the Botanic Gardens, and professional families who want a home visit rather than a drive.",
      faqs: [
        {
          q: "Can assisted stretching help my golf swing?",
          a: "Many Benowa golfers book for exactly that. Improving rotation through the hips and upper back can make the swing feel freer and take pressure off the lower back.",
        },
        {
          q: "How far is the studio from Benowa?",
          a: "About ten minutes by car to Wicked Bodz on Cavill Avenue. Home visits across Benowa are also available.",
        },
        {
          q: "I'm in my 70s. Is this safe for me?",
          a: "Yes. Sessions are gentle, fully guided and adjusted to your comfort. Many older Benowa clients use regular stretching to keep moving easily for golf, gardening and daily life.",
        },
      ],
    },
    pt: {
      intro:
        "Benowa is a ten minute drive from Wicked Bodz in Surfers Paradise, and it's home to a lot of people who want to stay active well into later life. Royal Pines golfers, tennis players, Botanic Gardens walkers and busy professional families all benefit from the same thing: well-planned strength training. For golfers that means rotational strength and stability. For older clients it means leg strength, balance and bone health. For parents it means efficient sessions that fit around school runs. Every program is built around what you want to keep doing.",
      whoBooks:
        "Golfers wanting more power and fewer aches, retirees focused on strength and balance, parents with limited time, and professionals who want structured training close to home.",
      faqs: [
        {
          q: "Can personal training improve my golf?",
          a: "Yes. Strength and stability through the hips, core and upper back support a more powerful and consistent swing, and reduce the aches that come with frequent rounds.",
        },
        {
          q: "Is strength training suitable for older Benowa residents?",
          a: "It's one of the best things you can do as you age. Programs focus on safe, progressive exercises for leg strength, balance and posture.",
        },
        {
          q: "How close is the gym to Benowa?",
          a: "About ten minutes by car. Wicked Bodz Fitness Centre is at 45 Cavill Avenue, Surfers Paradise.",
        },
      ],
    },
  },

  "mermaid-beach": {
    stretch: {
      intro:
        "Mermaid Beach runs along the coast between Broadbeach and Nobby Beach, about ten minutes from the studio. It's a suburb of early beach runs and long walks, from the big homes on Hedges Avenue to the cafés in Nobby Beach village. Many residents also work from home offices, so the day often starts with a run on the sand and ends with a stiff neck from the laptop. That combination leaves calves, IT bands, hips and upper backs tight. Regular assisted stretching keeps you comfortable on the beach and at the desk.",
      whoBooks:
        "Beach runners and walkers, remote professionals, retirees who want to stay mobile, and hospitality staff from the Nobby Beach strip.",
      faqs: [
        {
          q: "I run on the sand at Mermaid Beach. What gets tight?",
          a: "Soft sand is hard on the calves, Achilles area and hips. Sessions usually focus there, along with the hamstrings and glutes.",
        },
        {
          q: "Can I get a home visit in Mermaid Beach?",
          a: "Yes. 60 minute home visits are available across Mermaid Beach, including the Hedges Avenue and Nobby Beach ends.",
        },
        {
          q: "How far is the studio from Mermaid Beach?",
          a: "Around ten minutes by car up the Gold Coast Highway to Cavill Avenue in Surfers Paradise.",
        },
      ],
    },
    pt: {
      intro:
        "From Mermaid Beach it's about a ten minute drive to Wicked Bodz in Surfers Paradise. Mermaid Beach locals are active, with sunrise runs along the beach, dog walks and weekend swims, but beach fitness is mostly cardio. Adding structured strength training protects your joints, supports better posture for the hours you spend at a home office and helps you keep the lean, strong shape that most people are after. Sessions are built around your goals and progress week to week, so you can see exactly how far you've come.",
      whoBooks:
        "Runners adding strength work, remote workers who want a reason to leave the house, established professionals, and retirees focused on healthy ageing.",
      faqs: [
        {
          q: "I run a lot. Do I need strength training too?",
          a: "Yes. Strength work reduces running injuries, improves posture and helps preserve muscle. Two sessions a week alongside your running is a common Mermaid Beach setup.",
        },
        {
          q: "Can I train online some weeks?",
          a: "Yes. Online coaching gives you a program to follow on your own with video form checks, which suits Mermaid Beach clients who travel.",
        },
        {
          q: "How do I get from Mermaid Beach to the gym?",
          a: "It's about ten minutes by car, or catch a bus up the Gold Coast Highway to Surfers Paradise.",
        },
      ],
    },
  },

  "mermaid-waters": {
    stretch: {
      intro:
        "Mermaid Waters sits behind Mermaid Beach, about eleven minutes from the studio, and it's a suburb shaped by its canals. Families, professional couples and retirees live in waterfront homes around Lakelands Drive, with the Q Supercentre nearby for everyday errands. Mornings often mean a paddle or a dog walk around the water, and many residents then work from home. Paddling, walking and sitting all day tighten the shoulders, calves and hip flexors. Assisted stretching sessions at home or in the studio target those areas directly.",
      whoBooks:
        "Canal paddlers and boat owners, work-from-home professionals, parents juggling school runs, and retirees who want to keep walking comfortably.",
      faqs: [
        {
          q: "Are home visits available in Mermaid Waters?",
          a: "Yes. Home visits are available across Mermaid Waters for the 60 minute session. You just need a quiet space and room for a yoga mat.",
        },
        {
          q: "How long is the drive from Mermaid Waters to the studio?",
          a: "About eleven minutes to Wicked Bodz Fitness Centre on Cavill Avenue, Surfers Paradise.",
        },
        {
          q: "I work from home and my hips feel tight. Can stretching help?",
          a: "Tight hip flexors are one of the most common complaints from people who sit at home all day. Assisted PNF stretching releases them and the surrounding muscles far more effectively than stretching alone.",
        },
      ],
    },
    pt: {
      intro:
        "Mermaid Waters is roughly eleven minutes from Wicked Bodz, so it's an easy trip for a regular training session. It's a family suburb with a lot of people working from home, which often means plenty of good intentions and not much structure. Personal training changes that. You'll have a set session time, a program designed around your goal, whether that's fat loss, strength or getting fit after having kids, and clear progress tracking so you can see it working. Online coaching is available for the days you can't get in.",
      whoBooks:
        "Parents getting back into fitness, remote workers, professional couples training together, and retirees who want to stay strong and independent.",
      faqs: [
        {
          q: "Can I train around school drop-off and pick-up?",
          a: "Yes. Mid-morning and early afternoon sessions are popular with Mermaid Waters parents because they fit neatly between school runs.",
        },
        {
          q: "Is personal training worth it if I work from home?",
          a: "It's especially useful. Structured strength work counters the effects of sitting and gives your week a routine outside the house.",
        },
        {
          q: "How far is the gym from Mermaid Waters?",
          a: "About eleven minutes by car to 45 Cavill Avenue, Surfers Paradise.",
        },
      ],
    },
  },

  southport: {
    stretch: {
      intro:
        "Southport is the Gold Coast's working city centre, about twelve minutes from the studio. It's home to Gold Coast University Hospital, the Australia Fair shopping centre and a large office district, with the Broadwater Parklands along the water. That means a lot of healthcare workers on long shifts, office staff sitting through the day, and walkers and runners using the foreshore paths in the evening. Nurses and hospital staff in particular carry tension in their backs, hips and feet. Assisted stretching gives Southport locals targeted relief after demanding weeks.",
      whoBooks:
        "Nurses, doctors and hospital staff, office professionals from the Southport CBD, university staff and students, and Broadwater walkers and runners.",
      faqs: [
        {
          q: "I work long shifts at the hospital. Can I book around a rotating roster?",
          a: "Yes. Sessions run from 6am to 8pm daily, so you can book before an afternoon shift or on a day off. Healthcare workers usually focus on the lower back, hips, calves and feet.",
        },
        {
          q: "How far is the studio from Southport?",
          a: "About twelve minutes by car, or take the G:link from Southport straight down to Cavill Avenue station in Surfers Paradise.",
        },
        {
          q: "Do you do home visits in Southport?",
          a: "Yes. 60 minute home visits are available across Southport, including the apartments near the Broadwater.",
        },
      ],
    },
    pt: {
      intro:
        "Southport is about twelve minutes from Wicked Bodz, and the G:link runs directly between the two, which makes training in Surfers Paradise practical even without a car. Southport's population includes a lot of hospital staff, office workers and university students, and each group has the same challenge: irregular or long days that make consistent training hard. Personal training solves the consistency problem with booked sessions and a program that adapts to your schedule, while building the strength that makes long shifts and long days at a desk easier on the body.",
      whoBooks:
        "Healthcare workers on rotating rosters, CBD office staff, university students and staff, and apartment residents new to strength training.",
      faqs: [
        {
          q: "Can I get to the gym from Southport without a car?",
          a: "Yes. The G:link runs from Southport to Cavill Avenue station, and the gym is a short walk from there.",
        },
        {
          q: "I'm a nurse on rotating shifts. How would training work?",
          a: "Sessions are booked week by week to match your roster, with an online program for weeks when you can't make it in. The focus is usually strength for the back and legs to handle long shifts.",
        },
        {
          q: "Do you train university students?",
          a: "Yes. Students often start with a custom program they run on their own, then add in-person sessions to learn technique on the main lifts.",
        },
      ],
    },
  },

  ashmore: {
    stretch: {
      intro:
        "Ashmore is a central, family-focused suburb about twelve minutes from the studio, with the Nerang River curving through it and Ashmore City Shopping Centre at its heart. Many locals are tradies, healthcare workers and small-business owners, and weekends are full of kids' sport and family activities. Physical jobs wear on the shoulders and knees, lifting children takes a toll on the lower back, and runners on the Ashmore cycleway end up with tight hips. Assisted stretching is often the recovery step busy Ashmore families skip, and it makes a real difference.",
      whoBooks:
        "Tradies with sore shoulders and knees, parents with lower back pain, healthcare workers, and runners and cyclists using the riverside paths.",
      faqs: [
        {
          q: "I'm a tradie. Can assisted stretching help my shoulders and knees?",
          a: "Yes, it's one of the most common reasons Ashmore tradies book. Sessions work through the shoulders, hips, quads and calves that take the load from physical work.",
        },
        {
          q: "How long is the drive from Ashmore to the studio?",
          a: "About twelve minutes by car, making Ashmore one of the closest inland suburbs to Wicked Bodz in Surfers Paradise.",
        },
        {
          q: "Can you visit me at home in Ashmore after work?",
          a: "Yes. Home visits are available across Ashmore, with sessions running until 8pm.",
        },
      ],
    },
    pt: {
      intro:
        "Ashmore is about twelve minutes from Wicked Bodz in Surfers Paradise, and it's home to a lot of people who work hard physically and look after busy families. Tradies need strength and resilience to protect their bodies over a long career. Parents need efficient sessions that fit around school and weekend sport. Plenty of Ashmore locals already train somewhere, but without a plan progress stalls. Personal training brings structure, correct technique and steady progression so every session moves you closer to your goal.",
      whoBooks:
        "Tradies wanting to stay injury-free, busy parents, small-business owners, and gym members who have hit a plateau.",
      faqs: [
        {
          q: "Can strength training help me stay fit for a physical job?",
          a: "Yes. Building strength in the back, legs, shoulders and core helps you handle heavy work with less wear and tear.",
        },
        {
          q: "I already go to the gym. What would change with a trainer?",
          a: "You'd get a structured program with progressive loads and technique coaching, which is usually what breaks a plateau.",
        },
        {
          q: "How far is the gym from Ashmore?",
          a: "About twelve minutes by car to 45 Cavill Avenue, Surfers Paradise.",
        },
      ],
    },
  },

  miami: {
    stretch: {
      intro:
        "Miami sits between Mermaid Beach and Burleigh, about thirteen minutes from the studio, and it has become one of the Gold Coast's most lively suburbs. Miami Marketta brings the night crowd, Pizzey Park is full of sport through the week, and the beach draws surfers at first light. Plenty of young professionals and creatives also work from cafés or home. Surfing and paddling tighten the shoulders and lats, laptops hunch the neck, and sitting shortens the hip flexors. Assisted stretching works through all three.",
      whoBooks:
        "Surfers who paddle out most mornings, creatives and remote workers, Pizzey Park sports players, and young families.",
      faqs: [
        {
          q: "I surf at Miami most mornings. Why are my shoulders so tight?",
          a: "Paddling works the lats, shoulders and upper back hard and often in a shortened position. PNF stretching restores range there and can make paddling feel easier.",
        },
        {
          q: "How far is Miami from the studio?",
          a: "About thirteen minutes by car up the Gold Coast Highway to Cavill Avenue, Surfers Paradise.",
        },
        {
          q: "Can I book a home visit in Miami?",
          a: "Yes. Home visits are available across Miami for the 60 minute session.",
        },
      ],
    },
    pt: {
      intro:
        "Miami is a thirteen minute drive from Wicked Bodz in Surfers Paradise and has a young, active population of surfers, creatives, café owners and growing families. Many locals are fit but train without a plan, surfing when the waves are good and hitting the gym when there's time. Personal training adds structure. You'll build strength that supports your surfing and sport, get technique right on key lifts and follow a program that progresses each week. Online coaching suits Miami locals whose work schedules change often.",
      whoBooks:
        "Surfers who want more paddle power, creatives and freelancers, Pizzey Park sports players, and parents getting back into training.",
      faqs: [
        {
          q: "Can personal training make me a better surfer?",
          a: "Strength and mobility work for the shoulders, back and hips can improve paddle endurance and pop-ups, and help keep you in the water with fewer niggles.",
        },
        {
          q: "My schedule changes all the time. Can I still train?",
          a: "Yes. Sessions are booked week to week, and online coaching fills the gaps when you can't make it to the gym.",
        },
        {
          q: "How long is the trip from Miami to the gym?",
          a: "Around thirteen minutes by car.",
        },
      ],
    },
  },

  labrador: {
    stretch: {
      intro:
        "Labrador stretches along the Broadwater about fifteen minutes from the studio. It's an established suburb of families, retirees and healthcare workers, with a long foreshore path that's busy with walkers from early morning and paddleboarders heading out onto calm water. Charis Seafoods is a weekend fixture, and the Broadwater Parklands are just to the south. Daily walking, paddling and long shifts on your feet leave the hips, knees, shoulders and lower back tight. Assisted stretching helps Labrador locals keep moving comfortably.",
      whoBooks:
        "Foreshore walkers, Broadwater paddleboarders, healthcare workers from the nearby hospital, and retirees who want to stay active.",
      faqs: [
        {
          q: "I walk the Labrador foreshore every day. Will stretching help my hips and knees?",
          a: "Yes. Regular walking can tighten the hips, hamstrings and calves, and those areas often drive knee discomfort. Sessions release them and help you walk more comfortably.",
        },
        {
          q: "How far is Labrador from the studio?",
          a: "About fifteen minutes by car to Wicked Bodz Fitness Centre on Cavill Avenue in Surfers Paradise.",
        },
        {
          q: "Are home visits available in Labrador?",
          a: "Yes. 60 minute home visits are available across Labrador.",
        },
      ],
    },
    pt: {
      intro:
        "Labrador is around fifteen minutes by car from Wicked Bodz in Surfers Paradise, an easy trip down the Gold Coast Highway. Many Labrador residents are long-term locals, healthcare workers and retirees who walk the Broadwater foreshore daily but don't do any strength training. That's the missing piece for most people over 40, and it's never too late to start. Personal training builds the leg strength, balance and posture that keep you independent and active, and for younger clients it's the fastest route to real fitness goals.",
      whoBooks:
        "Retirees and over-50s building strength, healthcare workers, parents fitting training around school runs, and walkers wanting to add resistance training.",
      faqs: [
        {
          q: "I'm over 60. Is it too late to start strength training?",
          a: "Not at all. Strength training helps at any age. Programs start gently and build up safely to improve strength, balance and confidence.",
        },
        {
          q: "How far is the gym from Labrador?",
          a: "About fifteen minutes by car to Wicked Bodz Fitness Centre, 45 Cavill Avenue, Surfers Paradise.",
        },
        {
          q: "Do you offer online coaching for Labrador clients?",
          a: "Yes. Online coaching includes a custom program, video form checks and regular check-ins.",
        },
      ],
    },
  },

  "burleigh-heads": {
    stretch: {
      intro:
        "Burleigh Heads is about seventeen minutes south of the studio, and it's one of the most active suburbs on the Gold Coast. Surfers check the point break at dawn, runners take on the Burleigh Hill stairs, the James Street café strip fills with remote workers and swimmers cool off at the Tallebudgera Creek mouth. All that activity is great for fitness but it builds tension in the shoulders, lats, calves and hips, while laptop time hunches the upper back. Assisted stretching gives Burleigh locals a way to recover properly.",
      whoBooks:
        "Surfers, runners and gym-goers, café-based remote workers, young families, and fitness professionals who look after everyone else.",
      faqs: [
        {
          q: "Do you offer mobile stretching in Burleigh Heads?",
          a: "Yes. Home visits are popular in Burleigh because it saves a trip up the highway. The 60 minute home visit only needs a quiet room and space for a yoga mat.",
        },
        {
          q: "I run the Burleigh Hill stairs. What should we focus on?",
          a: "Stair and hill work loads the calves, quads and hip flexors heavily. Sessions usually target those areas, plus the glutes and hamstrings.",
        },
        {
          q: "How far is Burleigh Heads from the studio?",
          a: "About seventeen minutes by car to Wicked Bodz on Cavill Avenue in Surfers Paradise.",
        },
      ],
    },
    pt: {
      intro:
        "Burleigh Heads is around seventeen minutes from Wicked Bodz in Surfers Paradise. It's a suburb where fitness is part of the culture, with surfers, runners and gym-goers everywhere, so most Burleigh clients aren't starting from zero. What they want is direction: a structured program to build real strength, fix weak links that cause injuries, or reach a specific goal like a physique change or an event. In-person sessions build technique, and online coaching keeps you progressing on the days you train closer to home.",
      whoBooks:
        "Experienced gym-goers who want a smarter program, surfers building strength, remote workers who want routine, and young parents getting back in shape.",
      faqs: [
        {
          q: "I train at a gym in Burleigh already. Can I do online coaching?",
          a: "Yes. Many Burleigh clients follow an online program at their local gym, with video form checks and weekly check-ins, and book in-person sessions when they want hands-on coaching.",
        },
        {
          q: "Can you help me train for a specific goal or event?",
          a: "Yes. Programs are built around your goal and timeline, whether that's a stronger squat, a physique change or preparing for an event.",
        },
        {
          q: "How far is the gym from Burleigh Heads?",
          a: "About seventeen minutes by car.",
        },
      ],
    },
  },

  robina: {
    stretch: {
      intro:
        "Robina is one of the Gold Coast's biggest suburbs and a central hub for the southern half of the city, about eighteen minutes from the studio. Robina Town Centre, Robina Hospital and Cbus Super Stadium all sit here, and Bond University is right on its doorstep. That means a mix of healthcare workers, students, retail staff and professional families, each with their own aches: shift-worker backs and legs, student necks from long study sessions, and shoulders overworked in the gym. Home visits suit many Robina clients.",
      whoBooks:
        "Robina Hospital staff, Bond University students and staff, retail and hospitality workers from the town centre, and families wanting a home visit.",
      faqs: [
        {
          q: "Can you come to my home in Robina?",
          a: "Yes. Home visits are available across Robina and are the most popular option here, since it saves an eighteen minute drive each way.",
        },
        {
          q: "I work shifts at Robina Hospital. When can I book?",
          a: "Sessions run from 6am to 8pm, seven days a week, so you can book around your roster, including days off.",
        },
        {
          q: "How far is Robina from the studio?",
          a: "About eighteen minutes by car to Wicked Bodz in Surfers Paradise.",
        },
      ],
    },
    pt: {
      intro:
        "Robina is about eighteen minutes from Wicked Bodz in Surfers Paradise, and it's a big, busy suburb with Robina Town Centre, Robina Hospital and nearby Bond University at its centre. Clients from Robina tend to be time-poor: healthcare workers on rotating rosters, parents running between school and sport, students balancing study and part-time work. The drive means many choose a mix of in-person sessions and online coaching, so they get proper technique coaching in the gym and a structured program they can follow closer to home.",
      whoBooks:
        "Healthcare workers, Bond University students, busy parents, and retail and hospitality staff from the town centre.",
      faqs: [
        {
          q: "The gym is 18 minutes away. Is online coaching an option?",
          a: "Yes. Many Robina clients train online with a custom program, video form checks and check-ins, then book in-person sessions every week or two.",
        },
        {
          q: "Do you train students from Bond University?",
          a: "Yes. Students often start with a program-only plan and add sessions to learn technique on the main lifts.",
        },
        {
          q: "Can personal training help with shift work fatigue?",
          a: "Regular strength training helps many shift workers feel more resilient on long days. Programs are designed around your roster so training supports your work rather than wearing you out.",
        },
      ],
    },
  },

  "varsity-lakes": {
    stretch: {
      intro:
        "Varsity Lakes is a lakeside suburb about twenty minutes from the studio, anchored by Bond University and Lake Orr, with the Varsity Lakes train station and the Varsity Central café strip close by. The population is young, professional and active. Students study for hours, runners loop the lake, athletes train most days and plenty of couples spend weekends at the gym. Long study sessions stiffen the neck and back, while running and training tighten the calves, hips and shoulders. Assisted stretching helps Varsity Lakes locals recover and perform.",
      whoBooks:
        "Bond University students and athletes, lake runners, gym-goers and weekend sports players, and young professionals working from home.",
      faqs: [
        {
          q: "I play sport at Bond. Can stretching help my recovery?",
          a: "Yes. Athletes use assisted stretching to restore range of motion between training sessions and games. Focus areas depend on your sport.",
        },
        {
          q: "How far is Varsity Lakes from the studio?",
          a: "About twenty minutes by car to Wicked Bodz in Surfers Paradise. Home visits across Varsity Lakes save that trip.",
        },
        {
          q: "I run around Lake Orr. How often should I book?",
          a: "Weekly sessions while you're building mileage work well, then fortnightly to maintain. Calves, hamstrings and hips are the usual focus.",
        },
      ],
    },
    pt: {
      intro:
        "Varsity Lakes is about twenty minutes from Wicked Bodz, and it's home to a young, fitness-minded crowd around Bond University and Lake Orr. Many locals already run, play sport or train at a gym, so personal training here is usually about getting more from the effort: a periodised program, better technique on big lifts and a plan that fits around study, work and competition. Because of the drive, a lot of Varsity Lakes clients combine online coaching with regular in-person sessions in Surfers Paradise.",
      whoBooks:
        "University students and athletes, runners adding strength, young professionals, and couples who train together.",
      faqs: [
        {
          q: "I'm a student athlete. Can you program around my season?",
          a: "Yes. Programs are periodised around your competition schedule, with heavier strength blocks in the off-season and maintenance work in-season.",
        },
        {
          q: "Can I do online coaching from Varsity Lakes?",
          a: "Yes. Online coaching includes a custom program, video form checks and weekly check-ins, and suits Varsity Lakes clients who train locally.",
        },
        {
          q: "How far is the gym from Varsity Lakes?",
          a: "About twenty minutes by car to 45 Cavill Avenue, Surfers Paradise.",
        },
      ],
    },
  },
};

export function getTier1Copy(slug: string, service: "stretch" | "pt"): ServiceCopy | undefined {
  return (TIER1_CONTENT as Record<string, { stretch: ServiceCopy; pt: ServiceCopy }>)[slug]?.[
    service
  ];
}

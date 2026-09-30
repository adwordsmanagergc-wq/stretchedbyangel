import { Link } from "react-router";
import {
  CheckCircle2,
  Brain,
  Trophy,
  Briefcase,
  Heart,
  HeartPulse,
  Target,
  Users,
  Monitor,
  Flame,
} from "lucide-react";
import { CONTACT } from "@/data/contact";
import { IMG } from "@/data/images";


/**
 * Long-form personal training guide content. It used to live on its own
 * page; it is now part of the canonical personal training page at
 * /personal-training-gold-coast (see PersonalTraining.tsx), and
 * /personal-training 301-redirects there.
 */

const PHYSICAL_RESULTS = [
  "Build genuine, lasting strength",
  "Lose body fat sustainably",
  "Visibly change body composition",
  "Build lean muscle (yes, women too)",
  "Improve cardiovascular fitness",
  "Increase bone density",
  "Better balance, coordination and agility",
  "Improved posture and movement quality",
  "Stronger joints and connective tissue",
  "Reduced everyday aches and pains",
  "More energy throughout the day",
  "Better sleep quality",
  "Higher resting metabolic rate",
  "Improved hormonal health",
];

const MENTAL_RESULTS = [
  "Genuine, earned confidence",
  "Lower stress and anxiety",
  "Better mood and emotional resilience",
  "Sharper focus and productivity",
  "A reliable sense of accomplishment each week",
  "Discipline and habits that bleed into the rest of life",
  "Body-image improvements that aren't dependent on the scale",
];

const CONDITIONS_PT_HELPS = [
  "Stubborn weight that won't shift",
  "Postpartum return to training",
  "Recovery from injury or surgery (with medical clearance)",
  "Pre-diabetic or metabolic syndrome risk",
  "Osteoporosis prevention",
  "Sarcopenia (age-related muscle loss)",
  "Office-job stiffness and weakness",
  "Anxiety, depression and burnout (as adjunct to professional care)",
  "Plateaus after years of solo training",
  "Lack of motivation or consistency",
];

const WHO_IT_HELPS = [
  {
    icon: Users,
    title: "Beginners & comeback clients",
    body: "Never lifted a weight, or haven't trained in years? This is the most common starting point. We strip everything back to fundamentals and build from there — no judgement, no ego.",
  },
  {
    icon: Briefcase,
    title: "Busy professionals",
    body: "If you have 2–3 hours a week and want maximum return on time, structured personal training crushes random gym sessions. We build a program that fits your schedule, not the other way around.",
  },
  {
    icon: HeartPulse,
    title: "Postpartum mums",
    body: "Returning to training after a baby needs structure and patience. We rebuild your core and pelvic floor first, then progressively layer strength on top.",
  },
  {
    icon: Heart,
    title: "Over-40s",
    body: "Strength training in your 40s, 50s and 60s is the single best thing you can do for long-term health, mobility and independence. We train smart, not destructively.",
  },
  {
    icon: Trophy,
    title: "Athletes & active Gold Coasters",
    body: "Surfers, runners, triathletes, footballers — if you have a sport, you need a strength program that supports it without wrecking your recovery. We periodise around your season.",
  },
  {
    icon: Flame,
    title: "Anyone stuck in a plateau",
    body: "Been training for years but the needle hasn't moved? Outside eyes, structured programming and proper progressive overload solve this fast.",
  },
];

const TRAINING_OPTIONS = [
  {
    icon: Users,
    title: "In-person training",
    body: "One-on-one sessions at Wicked Bodz Fitness Centre in Surfers Paradise. Best for technique-heavy training, accountability, and people who genuinely thrive on having a coach in the room.",
  },
  {
    icon: Monitor,
    title: "Online coaching",
    body: "Custom programming delivered weekly, video form reviews, regular check-ins, and ongoing adjustments. Best for people who travel, work shift work, or live further out from Surfers.",
  },
  {
    icon: Target,
    title: "Custom programs",
    body: "A personalised program designed for your goals, equipment and schedule — that you run independently. Best for self-motivated trainees who just need the plan, not the hand-holding.",
  },
];

export const PT_GUIDE_FAQS = [
  {
    q: "Do I have to be fit to start personal training on the Gold Coast?",
    a: "No — quite the opposite. Most of my Gold Coast clients walk in for their first session as total beginners or after a long break from the gym. Every program is built around your current ability and progressed from there.",
  },
  {
    q: "How fast will I see results?",
    a: "Most clients see and feel meaningful changes inside 4–8 weeks — strength up, body composition shifting, energy and mood noticeably better. Visible body changes typically lock in around the 8–12 week mark with consistent training and nutrition.",
  },
  {
    q: "How is personal training different from just going to the gym?",
    a: "Three things: programming, technique, and accountability. A coached program is built specifically for your body and goals; technique gets corrected in real time so you actually progress; and someone is expecting you each week. Most people make more progress in 12 weeks of coaching than 12 months of solo training.",
  },
  {
    q: "Do you do online coaching or just in-person?",
    a: "Both. In-person clients meet me at Wicked Bodz Fitness Centre in Surfers Paradise. Online clients receive a custom program, video form-checks, and weekly check-ins — and can train anywhere in the world. Many clients combine the two.",
  },
  {
    q: "Will I get bulky if I lift weights?",
    a: "No. Building visible muscle requires huge calorie surplus and years of dedicated training. What lifting actually gives you is strength, shape, better posture, denser bones, faster metabolism and confidence. Almost every female client I've ever coached has wished they started sooner.",
  },
  {
    q: "How much does personal training on the Gold Coast cost?",
    a: `Pricing depends on whether you choose in-person, online or a custom program-only plan, and how many sessions per week you want. Give me a call on ${CONTACT.phone} or DM ${CONTACT.instagram} and I'll talk you through the options that fit your goals and budget.`,
  },
];

export function PersonalTrainingGuide() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16 sm:py-24 space-y-12">
          {/* Intro */}
          <section>
            <p className="text-xl text-muted-foreground leading-relaxed mb-4">
              Most people on the{" "}
              <strong className="text-foreground">Gold Coast</strong> who hire
              a personal trainer have tried gyms before. They've started
              programs, lost momentum, tried again, plateaued. The thing solo
              training can't give you is{" "}
              <strong className="text-foreground">a system</strong> — a
              real, periodised program built for your body, your schedule and
              your goals, plus the accountability to actually run it.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              That's what{" "}
              <strong className="text-foreground">personal training Gold
              Coast clients come to me for</strong>. Below is exactly what it
              does, who it helps most, and how to choose between in-person,
              online or program-only. If you'd also like to loosen up, see{" "}
              <Link to="/" className="text-primary underline hover:text-primary/80">
                assisted stretching on the Gold Coast
              </Link>
              .
            </p>
          </section>

          {/* What is PT */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What personal training actually is (and isn't)
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Personal training</strong> is
              not someone yelling at you in a sweaty room until you collapse.
              It's structured, periodised programming designed specifically
              for one person — you — coached week-on-week so the program keeps
              progressing and the technique keeps improving. Done right, it's
              the single highest-ROI use of your gym time.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I've been coaching for{" "}
              <strong className="text-foreground">over a decade</strong>, with
              clients spanning Jersey to the Gold Coast — from complete
              beginners to athletes and over-60s. The principles are the same
              whether the goal is fat loss, strength, postpartum recovery or
              athletic performance: <em>progressive overload, recoverable
              workload, technique that scales, and habits that stick</em>.
            </p>
          </section>

          {/* Physical results */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              What personal training does for your body
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Strength training is the closest thing we have to a longevity
              drug. Most clients arrive with one goal — usually fat loss —
              and walk away with everything else as a bonus. Here's the full
              list:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {PHYSICAL_RESULTS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Mental results */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              What it does for your mind
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              The mental return on personal training is, honestly, often
              bigger than the physical one. Clients consistently report:
            </p>
            <ul className="space-y-3">
              {MENTAL_RESULTS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Conditions PT helps */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Situations where personal training helps most
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Personal training isn't medical care — but structured strength
              and conditioning is part of the gold-standard intervention for
              a long list of common situations:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-6">
              {CONDITIONS_PT_HELPS.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 bg-card/50 border border-border rounded-xl px-4 py-3"
                >
                  <Target className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{c}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground italic">
              Always check with your doctor first if you're working around a
              diagnosed condition, injury, or post-surgical rehab.
            </p>
          </section>

          {/* Who it helps */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Who personal training helps most
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              The clients who get the most out of coaching aren't necessarily
              the fittest or the most motivated. They're the ones who show up
              consistently and let the system work:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {WHO_IT_HELPS.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="bg-card/50 border border-border rounded-2xl p-6 hover:border-primary/50 transition-all"
                >
                  <Icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-bold text-foreground text-lg mb-2">
                    {title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Training options */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              In-person vs online vs custom programs
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              I offer three ways to work together. Most clients pick one and
              stick with it — but some combine in-person and online during
              busy seasons or while travelling.
            </p>
            <div className="space-y-4">
              {TRAINING_OPTIONS.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="bg-card/50 border border-border rounded-2xl p-6 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-xl mb-1">
                        {title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Gold Coast */}
          <section className="bg-card/50 border border-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why personal training on the Gold Coast specifically
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                The Gold Coast lifestyle is misleading. From the outside, it
                looks like everyone's beach-fit by default. In reality, the
                exact same patterns play out here as everywhere else: long
                hours at a desk, FIFO rotations, tradie shoulders, postnatal
                rebuilds, and decades-deep gym plateaus.
              </p>
              <p>
                What's different here is{" "}
                <em>access</em>. The climate means you can train year-round.
                The beachfront makes conditioning easy. And the gym scene
                here is genuinely excellent. Once you have a real program,
                the Gold Coast is one of the best places on the planet to
                execute it.
              </p>
              <p>
                I'm based at{" "}
                <strong className="text-foreground">Wicked Bodz Fitness
                Centre, Surfers Paradise</strong>, working with clients from{" "}
                <Link to="/personal-training/burleigh-heads" className="text-primary hover:underline">
                  Burleigh Heads
                </Link>
                ,{" "}
                <Link to="/personal-training/broadbeach" className="text-primary hover:underline">
                  Broadbeach
                </Link>
                ,{" "}
                <Link to="/personal-training/main-beach" className="text-primary hover:underline">
                  Main Beach
                </Link>
                ,{" "}
                <Link to="/personal-training/robina" className="text-primary hover:underline">
                  Robina
                </Link>
                ,{" "}
                <Link to="/personal-training/southport" className="text-primary hover:underline">
                  Southport
                </Link>{" "}
                and{" "}
                <Link to="/areas-i-service" className="text-primary hover:underline">
                  every other Gold Coast suburb
                </Link>
                . Online clients train from anywhere in the world.
              </p>
            </div>
          </section>

          {/* Secondary image */}
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 rounded-2xl border border-accent/35" />
            <img
              {...IMG.ptGymSession}
              loading="lazy"
              alt="Personal trainer Angel Elliott coaching a strength session on the Gold Coast"
              className="relative rounded-2xl shadow-2xl w-full ring-1 ring-white/10"
            />
          </div>

          {/* What to expect */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What to expect from your first 12 weeks
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              The first three months produce the most dramatic visible change
              — and the foundation for everything that follows.
            </p>
            <ol className="space-y-3 text-lg text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-bold text-primary shrink-0">Weeks 1–2:</span>
                <span>
                  Movement assessment, technique work, baseline strength
                  numbers, lifestyle and nutrition audit. You'll feel sore
                  but capable.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary shrink-0">Weeks 3–4:</span>
                <span>
                  Energy levels lift. Sleep improves. The big lifts start
                  feeling familiar. Friends start asking what you're doing.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary shrink-0">Weeks 5–8:</span>
                <span>
                  Visible body composition changes. Clothes fit differently.
                  Strength gains are obvious and measurable. Confidence
                  noticeably up.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary shrink-0">Weeks 9–12:</span>
                <span>
                  The "transformation" people post on Instagram. By this
                  point training is a non-negotiable habit, not a willpower
                  battle.
                </span>
              </li>
            </ol>
          </section>

          {/* Pair with stretching */}
          <section className="bg-gradient-to-br from-pink-500/10 to-accent/5 border border-primary/20 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Pair training with assisted stretching for faster results
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The single biggest accelerator I see for clients is adding{" "}
              <Link to="/pnf-stretching" className="text-primary underline hover:text-primary/80">
                assisted PNF stretching
              </Link>{" "}
              to their training week. It accelerates recovery, reduces
              injury risk, and unlocks range of motion you didn't know you'd
              lost. I offer both services, so it's easy to combine.
            </p>
          </section>

    </article>
  );
}

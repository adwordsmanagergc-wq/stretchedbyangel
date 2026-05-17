import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import {
  Phone,
  Instagram,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Dumbbell,
  Monitor,
  Users,
  Target,
  ArrowRight,
} from "lucide-react";
import SchemaMarkup from "@/react-app/components/SchemaMarkup";

const IMAGES = {
  logo: "https://019cb84d-8ead-73c3-a40b-714550aaa6fe.mochausercontent.com/stretched-by-angel-transparent.png",
  onlineCoaching: "https://019cb84d-8ead-73c3-a40b-714550aaa6fe.mochausercontent.com/Screenshot-2026-03-23-at-10.34.41-am.png",
  gymTraining: "https://019cb84d-8ead-73c3-a40b-714550aaa6fe.mochausercontent.com/Screenshot-2026-03-23-at-10.35.28-am.png",
  professional: "https://019cb84d-8ead-73c3-a40b-714550aaa6fe.mochausercontent.com/Screenshot-2026-03-23-at-10.36.27-am.png",
  physique: "https://019cb84d-8ead-73c3-a40b-714550aaa6fe.mochausercontent.com/Screenshot-2026-03-23-at-10.36.51-am.png",
  transformation: "https://019cb84d-8ead-73c3-a40b-714550aaa6fe.mochausercontent.com/Screenshot-2026-03-23-at-10.55.51-am.png",
};

const CONTACT = {
  phone: "0434 773 815",
  phoneLink: "tel:0434773815",
  instagram: "@angelfitnessau",
  instagramLink: "https://instagram.com/angelfitnessau",
};

const SERVICES = [
  {
    icon: Users,
    title: "In-Person Training",
    description: "One-on-one personal training sessions on the Gold Coast. Tailored workouts designed for your specific goals and fitness level.",
  },
  {
    icon: Monitor,
    title: "Online Coaching",
    description: "Can't train in person? Get custom workout programs, nutrition guidance, and weekly check-ins—no matter where you are in the world.",
  },
  {
    icon: Target,
    title: "Custom Program Plans",
    description: "Prefer to train independently? Get a personalised program designed for your goals that you can follow at your own pace.",
  },
];

const FAQS = [
  {
    question: "How long have you been a personal trainer?",
    answer: "I've been a qualified personal trainer for over 10 years. Helping people transform their lives through fitness is my passion, and I've worked with clients all over the world—from Jersey to Australia and everywhere in between.",
  },
  {
    question: "Do you offer online coaching?",
    answer: "Absolutely! For those who can't train with me in person, I offer online coaching options and custom program-only plans for anyone confident following a plan on their own. No matter where you are in the world, I can help you reach your goals.",
  },
  {
    question: "Where do you train clients on the Gold Coast?",
    answer: "I train clients at Wicked Bodz Fitness Centre in Surfers Paradise, or I can come to your location for home visits. Whatever works best for your lifestyle!",
  },
  {
    question: "What kind of results can I expect?",
    answer: "Results depend on your commitment and goals, but my clients typically see improvements in strength, body composition, confidence, and overall fitness within the first few weeks. I'll be with you every step of the way to keep you accountable and motivated.",
  },
  {
    question: "Do you also offer stretching services?",
    answer: "Yes! In addition to personal training, I'm also a certified stretch therapist. Assisted PNF stretching is a great complement to your training—helping with recovery, flexibility, and injury prevention.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
      >
        <h3 className="font-semibold text-lg text-foreground pr-4">{question}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-primary shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-5">
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function PersonalTrainingPage() {
  const footerRef = useRef<HTMLElement>(null);
  const [whatsappBottom, setWhatsappBottom] = useState(24);

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      const footerRect = footerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const defaultBottom = window.innerWidth >= 640 ? 24 : 80;

      if (footerRect.top < viewportHeight) {
        const overlap = viewportHeight - footerRect.top;
        setWhatsappBottom(Math.max(defaultBottom, overlap + 24));
      } else {
        setWhatsappBottom(defaultBottom);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SchemaMarkup type="personal-training" />
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={IMAGES.logo}
              alt="Angel Fitness"
              className="h-12 w-12"
            />
            <span className="font-semibold text-lg">Angel Fitness</span>
          </Link>
          <div className="flex items-center gap-4">
            <a
              href={CONTACT.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={CONTACT.phoneLink}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 py-2 rounded-full transition-all"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Book Now</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-12 pb-16 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500/20 via-rose-500/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-500/15 via-blue-500/10 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Dumbbell className="w-4 h-4" />
                10+ Years Experience
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 bg-clip-text text-transparent">
                  Personal Training
                </span>
                <br />
                <span className="text-white">Gold Coast</span>
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Transform your body and your life with Angel—a qualified personal trainer
                with over a decade of experience helping people reach their fitness goals.
                In-person on the Gold Coast or online anywhere in the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={CONTACT.phoneLink}
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-full text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  <Phone className="w-5 h-5" />
                  Call {CONTACT.phone}
                </a>
                <a
                  href={CONTACT.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all border border-white/20"
                >
                  <Instagram className="w-5 h-5" />
                  {CONTACT.instagram}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Angel Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-background to-card">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-3xl blur-xl" />
              <img
                src={IMAGES.onlineCoaching}
                alt="Angel Elliott - Personal Trainer Gold Coast"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Meet{" "}
                <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Angel Elliott
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                I wanted to take a moment to reintroduce myself. I've been a personal trainer
                for over 10 years now, and helping people transform their lives is my passion.
              </p>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                This past year, I've been travelling the world while taking my business online—and
                it's been amazing to continue training my clients from across the globe. I know my
                clients in Jersey miss me (and I miss them too!), but I'm excited to share that
                I'm now working at a gym on the Gold Coast in Australia! I am so excited for this
                because I miss coaching in person so much.
              </p>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                For those who can't train with me in person, I've got online coaching options and
                custom program-only plans for anyone confident following a plan on their own. So
                no matter where you are in the world, I can help you reach your goals!
              </p>
              <div className="space-y-3">
                {[
                  "10+ years personal training experience",
                  "Certified & qualified trainer",
                  "In-person & online coaching available",
                  "Also offers assisted stretching services",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-24 bg-card">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Training Options
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              No matter where you are or how you prefer to train, I have an option that works for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => (
              <div
                key={index}
                className="bg-background/50 border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-card to-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Train With Angel
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
              <img
                src={IMAGES.gymTraining}
                alt="Angel training at the gym"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-medium">Strength Training</p>
                <p className="text-white/70 text-sm">Build muscle & power</p>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
              <img
                src={IMAGES.transformation}
                alt="Client body transformation results"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-medium">Body Transformation</p>
                <p className="text-white/70 text-sm">Achieve your goals</p>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
              <img
                src={IMAGES.physique}
                alt="Angel doing online coaching"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-medium">Online Coaching</p>
                <p className="text-white/70 text-sm">Train from anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Frequently Asked
            </span>
            {" "}Questions
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Everything you need to know about personal training with Angel.
          </p>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Stretching CTA Section */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Also Looking for{" "}
            <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Assisted Stretching
            </span>
            ?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Complement your training with professional PNF stretching. Perfect for recovery,
            flexibility, and injury prevention.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-full text-lg transition-all shadow-lg"
          >
            View Stretching Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-background to-cyan-500/10" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to{" "}
            <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Transform Your Life
            </span>
            ?
          </h2>
          <p className="text-muted-foreground text-xl mb-8">
            Get in touch today to start your fitness journey with Angel.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CONTACT.phoneLink}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-full text-lg transition-all shadow-lg hover:shadow-xl"
            >
              <Phone className="w-5 h-5" />
              Call {CONTACT.phone}
            </a>
            <a
              href={CONTACT.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-card hover:bg-card/80 text-foreground font-semibold px-8 py-4 rounded-full text-lg transition-all border border-border"
            >
              <Instagram className="w-5 h-5" />
              DM on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/61434773815?text=Hi%20Angel!%20I'm%20interested%20in%20personal%20training."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 z-50 bg-[#25D366] hover:bg-[#20BA5C] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all group"
        style={{ bottom: `${whatsappBottom}px` }}
        aria-label="Chat on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Footer */}
      <footer ref={footerRef} className="py-8 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Link to="/" className="inline-block mb-4">
            <img
              src={IMAGES.logo}
              alt="Angel Fitness"
              className="h-12 w-12 mx-auto"
            />
          </Link>
          <p className="text-muted-foreground text-sm mb-4">
            Personal Training & Assisted Stretching on the Gold Coast
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">
              Stretching Services
            </Link>
            <span>•</span>
            <Link to="/areas-i-service" className="hover:text-primary transition-colors">
              Areas I Service
            </Link>
            <span>•</span>
            <a
              href={CONTACT.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Instagram
            </a>
            <span>•</span>
            <Link to="/waiver" className="hover:text-primary transition-colors">
              Liability Waiver
            </Link>
          </div>
          <p className="text-muted-foreground/60 text-xs mt-6">
            © {new Date().getFullYear()} Angel Fitness. All rights reserved. Website by Metatap Pty Ltd.
          </p>
        </div>
      </footer>
    </div>
  );
}

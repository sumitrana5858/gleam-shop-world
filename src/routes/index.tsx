import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUXE — Considered Design Boutique" },
      { name: "description", content: "Discover sneakers, apparel, watches and accessories from the world's most thoughtful makers." },
      { property: "og:title", content: "LUXE — Considered Design Boutique" },
      { property: "og:description", content: "Discover sneakers, apparel, watches and accessories from the world's most thoughtful makers." },
    ],
  }),
  component: HomePage,
});

const HERO_SLIDES = [
  {
    eyebrow: "Autumn / Winter ’25",
    title: "Quiet luxury,\nloud craft.",
    sub: "The Aurelia AW collection. Considered silhouettes in deadstock cashmere and Italian wool.",
    cta: "Shop the collection",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=80",
  },
  {
    eyebrow: "Limited drop",
    title: "Aero Runner\nCarbon.",
    sub: "260 pairs. Worldwide. Carbon-plated for race day, designed for forever.",
    cta: "Reserve a pair",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=2000&q=80",
  },
  {
    eyebrow: "Maison Blanc",
    title: "Time, well\nspent.",
    sub: "Swiss-made automatics. Hand-finished movements. A lifetime of service.",
    cta: "Explore watches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=2000&q=80",
  },
];

function HomePage() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const trending = products.filter((p) => p.isTrending).slice(0, 8);
  const featured = products.filter((p) => p.isFeatured).slice(0, 4);
  const deals = products.filter((p) => p.compareAtPrice).slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[88vh] min-h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img src={HERO_SLIDES[slide].image} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative h-full mx-auto max-w-[1400px] px-6 md:px-10 flex items-end pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-2xl"
            >
              <div className="text-[11px] uppercase tracking-[0.35em] text-gold mb-6">
                {HERO_SLIDES[slide].eyebrow}
              </div>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-balance whitespace-pre-line">
                {HERO_SLIDES[slide].title}
              </h1>
              <p className="mt-6 text-base md:text-lg text-foreground/85 max-w-md">
                {HERO_SLIDES[slide].sub}
              </p>
              <div className="mt-10 flex items-center gap-4">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-3 bg-foreground text-background pl-7 pr-3 py-3 rounded-full text-sm font-medium"
                >
                  {HERO_SLIDES[slide].cta}
                  <span className="h-8 w-8 rounded-full bg-gold text-gold-foreground flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link to="/shop" className="text-sm underline-grow">View lookbook</Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 right-10 flex gap-2 z-10">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-[2px] transition-all ${i === slide ? "w-12 bg-gold" : "w-6 bg-foreground/30 hover:bg-foreground/60"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* USP STRIP */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Truck, t: "Free shipping", s: "Orders over $150" },
            { icon: RotateCcw, t: "30-day returns", s: "Free & easy" },
            { icon: ShieldCheck, t: "Authenticity", s: "Every item verified" },
            { icon: Sparkles, t: "Members early access", s: "Drops & exclusives" },
          ].map((u) => (
            <div key={u.t} className="flex items-center gap-3">
              <u.icon className="h-5 w-5 text-gold shrink-0" />
              <div>
                <div className="text-sm font-medium">{u.t}</div>
                <div className="text-xs text-muted-foreground">{u.s}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-24">
        <div className="flex items-end justify-between mb-12">
          <SectionHeading eyebrow="The world of LUXE" title="Shop by category" />
          <Link to="/shop" className="hidden md:inline-block text-sm underline-grow">View all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {categories.map((c, i) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={i === 0 ? "col-span-2 md:col-span-2 row-span-2" : ""}
            >
              <Link
                to="/shop"
                search={{ category: c.key } as any}
                className="group relative block aspect-[4/5] overflow-hidden rounded-md"
              >
                <img src={c.image} alt={c.label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-background">
                  <div className="font-display text-2xl md:text-3xl">{c.label}</div>
                  <div className="text-xs uppercase tracking-[0.2em] opacity-80 mt-1 flex items-center gap-2">
                    Shop now <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DEALS */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex items-end justify-between mb-12">
            <SectionHeading eyebrow="Limited time" title="Deals of the day" description="Hand-picked reductions across the boutique. While stock lasts." />
            <Link to="/shop" className="hidden md:inline-block text-sm underline-grow">All deals →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-12">
            {deals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-24">
        <div className="flex items-end justify-between mb-12">
          <SectionHeading eyebrow="What's moving" title="Trending now" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-12">
          {trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-24">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative aspect-[4/5] lg:aspect-auto overflow-hidden rounded-md"
          >
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80" alt="" className="absolute inset-0 h-full w-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="flex flex-col justify-center px-2 lg:px-12 py-12"
          >
            <div className="text-[11px] uppercase tracking-[0.3em] text-gold mb-6">The Maison Blanc atelier</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-balance">
              Five generations.<br/>One obsession.
            </h2>
            <p className="mt-6 text-muted-foreground text-pretty max-w-md">
              Inside the Geneva atelier where every Maison Blanc movement is hand-finished,
              regulated and tested for 14 days before it leaves the workshop.
            </p>
            <Link to="/shop" search={{ category: "watches" } as any} className="mt-10 self-start group inline-flex items-center gap-3 border-b border-foreground pb-1 text-sm">
              Read the story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="border-y border-border bg-surface py-16">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground text-center mb-10">
            Brands we love
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-y-8 gap-x-6 items-center justify-items-center">
            {Array.from(new Set(products.map((p) => p.brand))).map((b) => (
              <div key={b} className="font-display text-2xl md:text-3xl text-muted-foreground/70 hover:text-foreground transition-colors cursor-default tracking-wide">
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-24">
        <div className="flex items-end justify-between mb-12">
          <SectionHeading eyebrow="Curator's picks" title="Featured this week" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-12">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-24">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-luxe text-gold-foreground p-10 md:p-20">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-foreground/10 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] mb-5">Become a member</div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance">
                Quiet drops.<br/>Considered editorials.<br/>No spam.
              </h2>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 sm:items-stretch">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 bg-background/20 placeholder:text-gold-foreground/60 border border-foreground/20 px-5 py-4 rounded-full outline-none focus:border-foreground/60 transition"
              />
              <button className="bg-foreground text-background rounded-full px-7 py-4 text-sm font-medium hover:opacity-90 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-6 text-xs text-muted-foreground text-center">
          By subscribing you agree to receive marketing emails. {formatPrice(0)} commitment, unsubscribe anytime.
        </div>
      </section>
    </div>
  );
}

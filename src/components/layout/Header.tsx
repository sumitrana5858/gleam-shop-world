import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, Sun, Moon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useShop } from "@/context/ShopContext";
import { cls } from "@/lib/format";

const NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "Sneakers", search: { category: "sneakers" } as const },
  { to: "/shop", label: "Apparel", search: { category: "apparel" } as const },
  { to: "/shop", label: "Watches", search: { category: "watches" } as const },
  { to: "/shop", label: "Bags", search: { category: "bags" } as const },
];

export function Header() {
  const { cartCount, wishlist, theme, toggleTheme } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top marquee */}
      <div className="overflow-hidden bg-foreground text-background text-[11px] tracking-[0.25em] uppercase">
        <div className="flex w-max marquee py-2">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0">
              {["Complimentary shipping over $150", "30-day returns", "New season — Aurelia AW collection", "Members get early access"].map((t, i) => (
                <span key={`${k}-${i}`} className="px-8">{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <header
        className={cls(
          "sticky top-0 z-40 transition-all duration-300 backdrop-blur-md",
          scrolled ? "bg-background/85 border-b border-border" : "bg-background/40"
        )}
      >
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between gap-4">
            {/* Left: mobile menu + nav */}
            <div className="flex items-center gap-6 flex-1">
              <button
                className="md:hidden p-2 -ml-2"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <nav className="hidden md:flex items-center gap-7 text-[13px] tracking-wide">
                {NAV.map((n) => (
                  <Link
                    key={n.label}
                    to={n.to}
                    search={n.search as any}
                    className="underline-grow text-foreground/85 hover:text-foreground transition-colors"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center: logo */}
            <Link to="/" className="font-display text-2xl md:text-3xl tracking-[0.3em] font-light">
              LUXE
            </Link>

            {/* Right: actions */}
            <div className="flex items-center gap-1 md:gap-2 flex-1 justify-end">
              <button onClick={() => setSearchOpen(true)} className="p-2 hover:text-gold transition-colors" aria-label="Search">
                <Search className="h-5 w-5" />
              </button>
              <button onClick={toggleTheme} className="p-2 hover:text-gold transition-colors hidden sm:inline-flex" aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Link to="/account" className="p-2 hover:text-gold transition-colors hidden sm:inline-flex" aria-label="Account">
                <User className="h-5 w-5" />
              </Link>
              <Link to="/wishlist" className="relative p-2 hover:text-gold transition-colors" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gold text-gold-foreground text-[10px] rounded-full h-4 min-w-4 px-1 flex items-center justify-center font-medium">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative p-2 hover:text-gold transition-colors" aria-label="Cart">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-0.5 -right-0.5 bg-gold text-gold-foreground text-[10px] rounded-full h-4 min-w-4 px-1 flex items-center justify-center font-medium"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ delay: 0.05 }}
              className="mx-auto max-w-3xl px-6 pt-32"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 border-b border-border pb-4">
                <Search className="h-6 w-6 text-muted-foreground" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search sneakers, watches, brands…"
                  className="flex-1 bg-transparent text-2xl md:text-3xl font-display outline-none"
                />
                <button onClick={() => setSearchOpen(false)} aria-label="Close" className="p-1">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                {["Aero Runner", "Cashmere", "Automatic watches", "Weekender", "Aurelia"].map((s) => (
                  <Link
                    key={s}
                    to="/search"
                    search={{ q: s } as any}
                    onClick={() => setSearchOpen(false)}
                    className="px-3 py-1.5 rounded-full border border-border hover:border-gold hover:text-gold transition-colors"
                  >
                    {s}
                  </Link>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <Link
                  to="/search"
                  search={{ q } as any}
                  onClick={() => setSearchOpen(false)}
                  className="bg-gold text-gold-foreground text-sm font-medium px-6 py-3 rounded-full hover:opacity-90 transition"
                >
                  Search
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-border">
              <span className="font-display tracking-[0.3em]">LUXE</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <nav className="flex flex-col p-6 gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.label}
                  to={n.to}
                  search={n.search as any}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-3xl py-3 border-b border-border/60"
                >
                  {n.label}
                </Link>
              ))}
              <div className="mt-6 flex flex-col gap-3 text-sm">
                <Link to="/account" onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground">Account</Link>
                <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground">Wishlist</Link>
                <button onClick={toggleTheme} className="text-left text-muted-foreground hover:text-foreground">
                  Switch to {theme === "dark" ? "light" : "dark"} mode
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="font-display text-3xl tracking-[0.3em]">LUXE</div>
          <p className="mt-6 text-sm text-muted-foreground max-w-xs leading-relaxed">
            A modern boutique for considered design. Curating sneakers, apparel,
            watches & accessories from the world's most thoughtful makers.
          </p>
          <div className="mt-8 flex gap-3">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                aria-label="social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {[
          { title: "Shop", links: [["Sneakers", "/shop"], ["Apparel", "/shop"], ["Watches", "/shop"], ["Bags", "/shop"], ["Accessories", "/shop"]] },
          { title: "Help", links: [["Shipping", "/"], ["Returns", "/"], ["Size guide", "/"], ["Contact", "/"], ["FAQ", "/"]] },
          { title: "Company", links: [["About", "/"], ["Journal", "/"], ["Careers", "/"], ["Press", "/"], ["Sustainability", "/"]] },
        ].map((col) => (
          <div key={col.title} className="md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-5">{col.title}</div>
            <ul className="space-y-3 text-sm">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <Link to={href as string} className="hover:text-gold transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-2">
          <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-5">Newsletter</div>
          <p className="text-sm text-muted-foreground mb-4">Quiet drops. Considered editorials. No spam.</p>
          <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent border-b border-border py-2 text-sm outline-none focus:border-gold transition"
            />
            <button className="self-start text-xs uppercase tracking-[0.25em] text-gold mt-2">Subscribe →</button>
          </form>
        </div>
      </div>

      <div className="border-t border-border px-6 md:px-10 py-6 text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2 max-w-[1400px] mx-auto">
        <div>© {new Date().getFullYear()} LUXE Boutique. All rights reserved.</div>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-foreground">Privacy</Link>
          <Link to="/" className="hover:text-foreground">Terms</Link>
          <Link to="/" className="hover:text-foreground">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}

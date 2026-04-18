import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Package, Heart, MapPin, CreditCard, LogOut } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { products } from "@/data/products";
import { formatPrice, cls } from "@/lib/format";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account — LUXE" }] }),
  component: AccountPage,
});

const TABS = [
  { key: "orders", label: "Orders", icon: Package },
  { key: "wishlist", label: "Wishlist", icon: Heart },
  { key: "addresses", label: "Addresses", icon: MapPin },
  { key: "payment", label: "Payment", icon: CreditCard },
] as const;

type Tab = (typeof TABS)[number]["key"];

const MOCK_ORDERS = [
  { id: "LUXE-72193", date: "Apr 8, 2026", status: "Delivered", total: 412 },
  { id: "LUXE-71042", date: "Mar 21, 2026", status: "Delivered", total: 195 },
  { id: "LUXE-69810", date: "Feb 14, 2026", status: "Cancelled", total: 145 },
];

function AccountPage() {
  const { wishlist } = useShop();
  const [tab, setTab] = useState<Tab>("orders");
  const wishItems = products.filter((p) => wishlist.includes(p.id)).slice(0, 6);

  return (
    <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-12">
      {/* Hero */}
      <div className="bg-gradient-luxe rounded-2xl p-8 md:p-12 text-gold-foreground mb-10 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-foreground/10 blur-3xl" />
        <div className="relative flex items-center gap-5">
          <div className="h-20 w-20 rounded-full bg-foreground/20 flex items-center justify-center">
            <User className="h-10 w-10" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em]">Welcome back</div>
            <div className="font-display text-3xl md:text-4xl mt-1">Sasha Marchetti</div>
            <div className="text-sm opacity-80 mt-1">Member since 2024 · Gold tier</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-10">
        {/* Sidebar */}
        <aside>
          <nav className="space-y-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cls(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm transition",
                  tab === t.key ? "bg-foreground text-background" : "hover:bg-muted"
                )}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
            <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm hover:bg-muted text-muted-foreground mt-6">
              <LogOut className="h-4 w-4" /> Sign out
            </Link>
          </nav>
        </aside>

        {/* Content */}
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {tab === "orders" && (
            <div>
              <h2 className="font-display text-2xl mb-6">Recent orders</h2>
              <div className="space-y-3">
                {MOCK_ORDERS.map((o) => (
                  <div key={o.id} className="border border-border rounded-md p-5 flex items-center gap-6 flex-wrap">
                    <div className="flex-1 min-w-[150px]">
                      <div className="font-medium text-sm">{o.id}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{o.date}</div>
                    </div>
                    <div className={cls(
                      "text-xs px-3 py-1 rounded-full",
                      o.status === "Delivered" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                    )}>
                      {o.status}
                    </div>
                    <div className="text-sm font-medium">{formatPrice(o.total)}</div>
                    <button className="text-sm underline-grow">View details</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "wishlist" && (
            <div>
              <h2 className="font-display text-2xl mb-6">Saved items</h2>
              {wishItems.length === 0 ? (
                <p className="text-sm text-muted-foreground">No saved items yet. <Link to="/shop" className="underline">Browse the shop</Link>.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10">
                  {wishItems.map((p) => (
                    <Link key={p.id} to="/product/$slug" params={{ slug: p.slug }}>
                      <div className="aspect-[4/5] overflow-hidden rounded-md bg-muted">
                        <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
                      </div>
                      <div className="text-sm font-medium mt-3">{p.name}</div>
                      <div className="text-sm text-muted-foreground">{formatPrice(p.price)}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "addresses" && (
            <div>
              <h2 className="font-display text-2xl mb-6">Saved addresses</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border border-border rounded-md p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-gold mb-2">Default</div>
                  <div className="text-sm">Sasha Marchetti</div>
                  <div className="text-sm text-muted-foreground">12 Mercer Street<br/>New York, NY 10013<br/>United States</div>
                </div>
                <button className="border border-dashed border-border rounded-md p-5 text-sm text-muted-foreground hover:border-foreground transition">
                  + Add new address
                </button>
              </div>
            </div>
          )}

          {tab === "payment" && (
            <div>
              <h2 className="font-display text-2xl mb-6">Payment methods</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border border-border rounded-md p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-gold mb-2">Default</div>
                  <div className="text-sm">Visa ending 4242</div>
                  <div className="text-sm text-muted-foreground mt-1">Expires 09/27</div>
                </div>
                <button className="border border-dashed border-border rounded-md p-5 text-sm text-muted-foreground hover:border-foreground transition">
                  + Add payment method
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

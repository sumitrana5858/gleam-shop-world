import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useShop, cartItemKey } from "@/context/ShopContext";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Bag — LUXE" }] }),
  component: CartPage,
});

function CartPage() {
  const { cart, updateQty, removeFromCart, cartSubtotal } = useShop();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const discount = appliedCoupon === "LUXE10" ? cartSubtotal * 0.1 : 0;
  const shipping = cartSubtotal > 150 || cartSubtotal === 0 ? 0 : 12;
  const tax = (cartSubtotal - discount) * 0.08;
  const total = cartSubtotal - discount + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
        <h1 className="font-display text-4xl mt-6">Your bag is empty</h1>
        <p className="mt-3 text-muted-foreground">Start exploring the boutique to fill it.</p>
        <Link to="/shop" className="mt-8 inline-block bg-foreground text-background rounded-full px-7 py-3 text-sm">
          Discover the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-12">
      <h1 className="font-display text-4xl md:text-5xl">Your bag</h1>
      <p className="text-sm text-muted-foreground mt-2">{cart.length} item{cart.length > 1 ? "s" : ""}</p>

      <div className="mt-12 grid lg:grid-cols-[1fr_400px] gap-12">
        {/* Items */}
        <div>
          <AnimatePresence initial={false}>
            {cart.map((item) => {
              const k = cartItemKey(item);
              return (
                <motion.div
                  key={k}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-[100px_1fr_auto] md:grid-cols-[140px_1fr_auto] gap-5 py-6 border-b border-border"
                >
                  <Link to="/product/$slug" params={{ slug: item.slug }} className="aspect-square overflow-hidden bg-muted rounded-md">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{item.brand}</div>
                    <Link to="/product/$slug" params={{ slug: item.slug }} className="block text-base md:text-lg font-medium mt-1 hover:text-gold transition">{item.name}</Link>
                    <div className="text-xs text-muted-foreground mt-1">{item.color} · Size {item.size}</div>
                    <div className="flex items-center mt-4 gap-4">
                      <div className="flex items-center border border-border rounded-full">
                        <button onClick={() => updateQty(k, item.qty - 1)} className="p-2"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-8 text-center text-sm">{item.qty}</span>
                        <button onClick={() => updateQty(k, item.qty + 1)} className="p-2"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <button onClick={() => removeFromCart(k)} className="text-xs text-muted-foreground hover:text-destructive transition flex items-center gap-1">
                        <X className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <motion.div key={item.qty} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="font-medium">
                      {formatPrice(item.price * item.qty)}
                    </motion.div>
                    {item.qty > 1 && <div className="text-xs text-muted-foreground mt-1">{formatPrice(item.price)} each</div>}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-28 self-start">
          <div className="bg-surface border border-border rounded-lg p-6 md:p-8">
            <div className="font-display text-2xl mb-6">Order summary</div>

            {/* Coupon */}
            <div className="mb-6">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 mb-2">
                <Tag className="h-3 w-3" /> Promo code
              </label>
              <div className="flex gap-2">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  placeholder="Try LUXE10"
                  className="flex-1 bg-background border border-border rounded-full px-4 py-2.5 text-sm outline-none focus:border-gold transition"
                />
                <button
                  onClick={() => setAppliedCoupon(coupon)}
                  className="text-sm px-4 rounded-full border border-border hover:border-foreground transition"
                >
                  Apply
                </button>
              </div>
              {appliedCoupon && discount > 0 && (
                <div className="text-xs text-success mt-2">{appliedCoupon} applied — 10% off</div>
              )}
              {appliedCoupon && discount === 0 && (
                <div className="text-xs text-destructive mt-2">Invalid code</div>
              )}
            </div>

            <div className="space-y-3 text-sm border-t border-border pt-5">
              <Row label="Subtotal" value={formatPrice(cartSubtotal)} />
              {discount > 0 && <Row label="Discount" value={`− ${formatPrice(discount)}`} accent />}
              <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
              <Row label="Estimated tax" value={formatPrice(tax)} muted />
              <div className="border-t border-border pt-4 flex justify-between text-base">
                <span>Total</span>
                <motion.span key={total} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-xl">
                  {formatPrice(total)}
                </motion.span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-6 group bg-foreground text-background rounded-full text-sm uppercase tracking-[0.2em] py-4 flex items-center justify-center gap-3 hover:opacity-90 transition"
            >
              Checkout
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link to="/shop" className="mt-4 block text-center text-xs text-muted-foreground hover:text-foreground underline-grow">
              Continue shopping
            </Link>
          </div>

          <div className="text-xs text-muted-foreground text-center mt-4">
            Secure checkout · 30-day returns · Free shipping over $150
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, muted, accent }: { label: string; value: string; muted?: boolean; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className={muted ? "text-muted-foreground" : ""}>{label}</span>
      <span className={accent ? "text-success" : muted ? "text-muted-foreground" : ""}>{value}</span>
    </div>
  );
}

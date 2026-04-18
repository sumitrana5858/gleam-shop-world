import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Minus, Plus, Star, Truck, RotateCcw, ShieldCheck, ChevronRight, GitCompare } from "lucide-react";
import { getProduct, getRelated, type Product } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { ProductCard } from "@/components/product/ProductCard";
import { formatPrice, cls } from "@/lib/format";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }: { loaderData?: { product: ReturnType<typeof getProduct> } }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Product not found — LUXE" }] };
    return {
      meta: [
        { title: `${p.name} — ${p.brand} | LUXE` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — ${p.brand}` },
        { property: "og:description", content: p.description },
        { property: "og:image", content: p.images[0] },
        { name: "twitter:image", content: p.images[0] },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <div className="font-display text-6xl">Not found</div>
      <p className="mt-4 text-muted-foreground">This product is no longer available.</p>
      <Link to="/shop" className="mt-8 inline-block bg-gold text-gold-foreground rounded-full px-6 py-3 text-sm">Continue shopping</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <div className="font-display text-3xl">Something went wrong</div>
      <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { addToCart, toggleWishlist, isWishlisted, trackView, toggleCompare, compare } = useShop();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [tab, setTab] = useState<"description" | "details" | "reviews">("description");

  useEffect(() => { trackView(product.id); }, [product.id, trackView]);

  const wished = isWishlisted(product.id);
  const inCompare = compare.includes(product.id);
  const related = getRelated(product, 4);

  return (
    <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted-foreground flex items-center gap-1.5 mb-8">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/shop" search={{ category: product.category } as any} className="hover:text-foreground capitalize">{product.category}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div className="lg:sticky lg:top-28 self-start">
          <div
            className="relative aspect-[4/5] overflow-hidden bg-muted rounded-md cursor-zoom-in"
            onClick={() => setZoom(true)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={product.images[activeImg]}
                alt={product.name}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            {product.compareAtPrice && (
              <span className="absolute top-4 left-4 bg-gold text-gold-foreground text-[10px] tracking-widest uppercase px-2.5 py-1.5">
                −{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
              </span>
            )}
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {product.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setActiveImg(i)}
                className={cls(
                  "aspect-square overflow-hidden rounded-sm border transition",
                  i === activeImg ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="max-w-xl">
          <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{product.brand}</div>
          <h1 className="font-display text-4xl md:text-5xl mt-3 leading-tight text-balance">{product.name}</h1>
          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cls("h-4 w-4", i < Math.round(product.rating) ? "fill-gold" : "opacity-30")} />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{product.rating} · {product.reviewCount} reviews</span>
          </div>

          <div className="flex items-baseline gap-3 mt-6">
            <span className="text-3xl font-display">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-base text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">Tax included. Shipping calculated at checkout.</div>

          {/* Color */}
          <div className="mt-8">
            <div className="flex items-center justify-between text-sm mb-3">
              <span>Color: <span className="text-muted-foreground ml-1">{color}</span></span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  className={cls(
                    "h-10 w-10 rounded-full border-2 transition",
                    color === c.name ? "border-gold" : "border-border hover:border-foreground/40"
                  )}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-8">
            <div className="flex items-center justify-between text-sm mb-3">
              <span>Size: <span className="text-muted-foreground ml-1">{size}</span></span>
              <button className="text-xs text-muted-foreground underline">Size guide</button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cls(
                    "py-3 text-sm border rounded-sm transition",
                    size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/40"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Stock */}
          <div className="mt-6 text-xs text-muted-foreground flex items-center gap-2">
            <span className={cls("h-1.5 w-1.5 rounded-full", product.stock > 5 ? "bg-success" : "bg-destructive")} />
            {product.stock > 5 ? "In stock — ships in 1-2 business days" : `Only ${product.stock} left`}
          </div>

          {/* Qty + CTA */}
          <div className="mt-8 flex gap-3">
            <div className="flex items-center border border-border rounded-full">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3" aria-label="Decrease"><Minus className="h-4 w-4" /></button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-3" aria-label="Increase"><Plus className="h-4 w-4" /></button>
            </div>
            <button
              onClick={() => addToCart(product, { size, color, qty })}
              className="flex-1 bg-foreground text-background rounded-full text-sm uppercase tracking-[0.2em] hover:opacity-90 transition active:scale-[0.98]"
            >
              Add to bag — {formatPrice(product.price * qty)}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="h-12 w-12 border border-border rounded-full flex items-center justify-center hover:border-gold transition"
              aria-label="Wishlist"
            >
              <Heart className={cls("h-5 w-5 transition", wished && "fill-gold text-gold")} />
            </button>
          </div>

          <button
            onClick={() => toggleCompare(product.id)}
            className={cls("mt-3 text-xs flex items-center gap-2 hover:text-foreground transition", inCompare ? "text-gold" : "text-muted-foreground")}
          >
            <GitCompare className="h-3.5 w-3.5" />
            {inCompare ? "Added to compare" : "Add to compare"}
          </button>

          {/* USP */}
          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            {[{ I: Truck, t: "Free shipping" }, { I: RotateCcw, t: "30-day returns" }, { I: ShieldCheck, t: "Authenticity" }].map((u) => (
              <div key={u.t} className="border border-border rounded-md py-4 px-2">
                <u.I className="h-4 w-4 mx-auto text-gold" />
                <div className="text-[11px] mt-2 text-muted-foreground">{u.t}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-12 border-t border-border pt-8">
            <div className="flex gap-6 border-b border-border text-sm">
              {(["description", "details", "reviews"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cls("pb-3 capitalize border-b-2 -mb-px transition", tab === t ? "border-gold text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}
                >
                  {t} {t === "reviews" && `(${product.reviewCount})`}
                </button>
              ))}
            </div>
            <div className="pt-6 text-sm text-foreground/85 leading-relaxed">
              {tab === "description" && <p>{product.description}</p>}
              {tab === "details" && (
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex gap-3"><span className="text-gold">—</span>{f}</li>
                  ))}
                </ul>
              )}
              {tab === "reviews" && (
                <div className="space-y-6">
                  {product.reviews.map((r) => (
                    <div key={r.id} className="border-b border-border pb-6 last:border-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex text-gold">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={cls("h-3.5 w-3.5", i < r.rating ? "fill-gold" : "opacity-30")} />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{r.author} · {r.date}</span>
                      </div>
                      <div className="font-medium text-sm">{r.title}</div>
                      <p className="text-sm text-muted-foreground mt-1">{r.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="mt-32">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-3xl md:text-4xl">You might also like</h2>
          <Link to="/shop" search={{ category: product.category } as any} className="text-sm underline-grow">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-12">
          {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Zoom modal */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur p-6 md:p-12 cursor-zoom-out"
            onClick={() => setZoom(false)}
          >
            <img src={product.images[activeImg]} alt="" className="h-full w-full object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

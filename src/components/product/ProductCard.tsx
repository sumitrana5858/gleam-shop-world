import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { formatPrice, cls } from "@/lib/format";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { toggleWishlist, isWishlisted, addToCart } = useShop();
  const wished = isWishlisted(product.id);
  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.4) }}
      className="group relative"
    >
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-md">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && <span className="bg-background/90 text-foreground text-[10px] tracking-widest uppercase px-2 py-1">New</span>}
            {discount > 0 && <span className="bg-gold text-gold-foreground text-[10px] tracking-widest uppercase px-2 py-1">−{discount}%</span>}
            {product.isLimited && <span className="border border-foreground/40 text-foreground/90 bg-background/70 text-[10px] tracking-widest uppercase px-2 py-1">Limited</span>}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
            className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition"
            aria-label="Wishlist"
          >
            <Heart className={cls("h-4 w-4 transition", wished && "fill-gold text-gold")} />
          </button>

          {/* Quick add */}
          <motion.button
            initial={false}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, { size: product.sizes[0], color: product.colors[0].name });
            }}
            className="absolute bottom-3 left-3 right-3 bg-foreground text-background text-xs uppercase tracking-[0.2em] py-3 rounded-sm flex items-center justify-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Quick add
          </motion.button>
        </div>

        <div className="pt-4 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{product.brand}</div>
            <div className="text-[11px] text-muted-foreground">★ {product.rating}</div>
          </div>
          <div className="text-sm font-medium leading-snug text-pretty line-clamp-1">{product.name}</div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-sm">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

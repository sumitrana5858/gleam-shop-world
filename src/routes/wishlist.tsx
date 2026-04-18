import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — LUXE" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useShop();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-12">
      <div className="text-[11px] uppercase tracking-[0.3em] text-gold mb-3">Saved for later</div>
      <h1 className="font-display text-4xl md:text-5xl">Your wishlist</h1>
      <p className="mt-2 text-sm text-muted-foreground">{items.length} item{items.length !== 1 ? "s" : ""}</p>

      {items.length === 0 ? (
        <div className="mt-24 text-center">
          <Heart className="h-12 w-12 mx-auto text-muted-foreground" />
          <div className="font-display text-2xl mt-6">Nothing saved yet</div>
          <p className="text-sm text-muted-foreground mt-2">Tap the heart on any product to save it for later.</p>
          <Link to="/shop" className="mt-8 inline-block bg-foreground text-background rounded-full px-6 py-3 text-sm">
            Discover the collection
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Search as SearchIcon } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

type Search = { q?: string };

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): Search => ({ q: (s.q as string) ?? "" }),
  head: () => ({ meta: [{ title: "Search — LUXE" }] }),
  component: SearchPage,
});

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const navigate = Route.useNavigate();

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.subcategory.toLowerCase().includes(term) ||
        p.tags.some((t) => t.toLowerCase().includes(term))
    );
  }, [q]);

  return (
    <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-12">
      <div className="text-[11px] uppercase tracking-[0.3em] text-gold mb-3">Search</div>

      <div className="flex items-center gap-4 border-b-2 border-border pb-4 max-w-3xl">
        <SearchIcon className="h-6 w-6 text-muted-foreground" />
        <input
          autoFocus
          value={q}
          onChange={(e) => navigate({ search: { q: e.target.value } })}
          placeholder="Search the boutique…"
          className="flex-1 bg-transparent text-2xl md:text-4xl font-display outline-none"
        />
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        {q ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${q}"` : "Type to search products, brands, or categories."}
      </div>

      {q && results.length === 0 && (
        <div className="mt-16 text-center">
          <div className="font-display text-3xl">No matches</div>
          <p className="text-sm text-muted-foreground mt-2">Try a different keyword or <Link to="/shop" className="underline">browse the shop</Link>.</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
          {results.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}

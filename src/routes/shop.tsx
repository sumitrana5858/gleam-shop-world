import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Rows3, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { products, categories, brands, type Product } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { formatPrice, cls } from "@/lib/format";

type Search = {
  category?: Product["category"];
  brand?: string;
  sort?: "featured" | "new" | "price-asc" | "price-desc" | "rating";
  min?: number;
  max?: number;
  page?: number;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: s.category as Search["category"],
    brand: s.brand as string | undefined,
    sort: (s.sort as Search["sort"]) ?? "featured",
    min: s.min ? Number(s.min) : undefined,
    max: s.max ? Number(s.max) : undefined,
    page: s.page ? Number(s.page) : 1,
  }),
  head: () => ({
    meta: [
      { title: "Shop — LUXE Boutique" },
      { name: "description", content: "Browse the full LUXE collection of sneakers, apparel, watches, bags and accessories." },
      { property: "og:title", content: "Shop — LUXE Boutique" },
      { property: "og:description", content: "Browse the full LUXE collection of sneakers, apparel, watches, bags and accessories." },
    ],
  }),
  component: ShopPage,
});

const PAGE_SIZE = 12;
const SORTS: { value: NonNullable<Search["sort"]>; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "new", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top rated" },
];

function ShopPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const update = (patch: Partial<Search>) => navigate({ search: (s: Search) => ({ ...s, ...patch, page: patch.page ?? 1 }) });

  const filtered = useMemo(() => {
    let list = [...products];
    if (search.category) list = list.filter((p) => p.category === search.category);
    if (search.brand) list = list.filter((p) => p.brand === search.brand);
    if (search.min) list = list.filter((p) => p.price >= search.min!);
    if (search.max) list = list.filter((p) => p.price <= search.max!);

    switch (search.sort) {
      case "new": list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew)); break;
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      default: list.sort((a, b) => Number(!!b.isFeatured) - Number(!!a.isFeatured));
    }
    return list;
  }, [search]);

  const page = search.page ?? 1;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const Filters = (
    <div className="space-y-8">
      <FilterGroup title="Category">
        <button
          onClick={() => update({ category: undefined })}
          className={cls("block text-left text-sm py-1 hover:text-gold", !search.category && "text-gold")}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => update({ category: c.key })}
            className={cls("block text-left text-sm py-1 hover:text-gold", search.category === c.key && "text-gold")}
          >
            {c.label}
          </button>
        ))}
      </FilterGroup>

      <FilterGroup title="Brand">
        <button
          onClick={() => update({ brand: undefined })}
          className={cls("block text-left text-sm py-1 hover:text-gold", !search.brand && "text-gold")}
        >
          All brands
        </button>
        {brands.map((b) => (
          <button
            key={b}
            onClick={() => update({ brand: b })}
            className={cls("block text-left text-sm py-1 hover:text-gold", search.brand === b && "text-gold")}
          >
            {b}
          </button>
        ))}
      </FilterGroup>

      <FilterGroup title="Price">
        <div className="space-y-2">
          {[
            { label: "Under $100", min: 0, max: 100 },
            { label: "$100 — $250", min: 100, max: 250 },
            { label: "$250 — $500", min: 250, max: 500 },
            { label: "$500 — $1,000", min: 500, max: 1000 },
            { label: "$1,000+", min: 1000, max: undefined },
          ].map((r) => {
            const active = search.min === r.min && search.max === r.max;
            return (
              <button
                key={r.label}
                onClick={() => update({ min: r.min, max: r.max })}
                className={cls("block text-left text-sm py-1 hover:text-gold", active && "text-gold")}
              >
                {r.label}
              </button>
            );
          })}
          {(search.min !== undefined || search.max !== undefined) && (
            <button onClick={() => update({ min: undefined, max: undefined })} className="text-xs text-muted-foreground underline pt-1">
              Clear price
            </button>
          )}
        </div>
      </FilterGroup>
    </div>
  );

  const activeFilterCount =
    (search.category ? 1 : 0) + (search.brand ? 1 : 0) + (search.min !== undefined || search.max !== undefined ? 1 : 0);

  return (
    <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="text-[11px] uppercase tracking-[0.3em] text-gold mb-3">The boutique</div>
        <h1 className="font-display text-4xl md:text-6xl">
          {search.category ? categories.find((c) => c.key === search.category)?.label : "All products"}
        </h1>
        <p className="mt-3 text-muted-foreground text-sm">{filtered.length} pieces</p>
      </div>

      <div className="flex gap-10">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block w-60 shrink-0 sticky top-28 self-start">
          {Filters}
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 pb-6 border-b border-border mb-8">
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 text-sm border border-border rounded-full px-4 py-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters {activeFilterCount > 0 && <span className="text-gold">({activeFilterCount})</span>}
            </button>

            <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
              {activeFilterCount > 0 && (
                <button onClick={() => update({ category: undefined, brand: undefined, min: undefined, max: undefined })} className="underline">
                  Clear filters
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <div className="relative">
                <select
                  value={search.sort}
                  onChange={(e) => update({ sort: e.target.value as any })}
                  className="appearance-none bg-transparent border border-border rounded-full pl-4 pr-10 py-2 text-sm outline-none cursor-pointer hover:border-foreground/40 transition"
                >
                  {SORTS.map((s) => <option key={s.value} value={s.value} className="bg-background">{s.label}</option>)}
                </select>
                <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="hidden sm:flex border border-border rounded-full p-1">
                <button onClick={() => setView("grid")} className={cls("p-2 rounded-full", view === "grid" && "bg-foreground text-background")} aria-label="Grid">
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button onClick={() => setView("list")} className={cls("p-2 rounded-full", view === "list" && "bg-foreground text-background")} aria-label="List">
                  <Rows3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Grid / List */}
          {paged.length === 0 ? (
            <div className="text-center py-24">
              <div className="font-display text-3xl mb-2">Nothing matches</div>
              <p className="text-sm text-muted-foreground">Try clearing some filters.</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-12">
              {paged.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          ) : (
            <div className="space-y-6">
              {paged.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link to="/product/$slug" params={{ slug: p.slug }} className="grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr] gap-6 group">
                    <div className="aspect-square overflow-hidden rounded-md bg-muted">
                      <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="flex flex-col justify-between py-2">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{p.brand}</div>
                        <div className="font-display text-2xl mt-1">{p.name}</div>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 max-w-prose">{p.description}</p>
                      </div>
                      <div className="flex items-baseline gap-3 pt-3">
                        <span>{formatPrice(p.price)}</span>
                        {p.compareAtPrice && <span className="text-sm text-muted-foreground line-through">{formatPrice(p.compareAtPrice)}</span>}
                        <span className="ml-auto text-xs text-muted-foreground">★ {p.rating} · {p.reviewCount}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-16">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => update({ page: i + 1 })}
                  className={cls(
                    "h-9 w-9 rounded-full text-sm transition",
                    page === i + 1 ? "bg-foreground text-background" : "hover:bg-muted"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setFiltersOpen(false)} />
          <motion.div
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-background p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-display text-2xl">Filters</span>
              <button onClick={() => setFiltersOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            {Filters}
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-10 w-full bg-foreground text-background rounded-full py-3 text-sm"
            >
              Show {filtered.length} results
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3">{title}</div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

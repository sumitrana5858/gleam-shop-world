import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { Product } from "@/data/products";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  size: string;
  color: string;
  qty: number;
};

type ShopState = {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  compare: string[];
  theme: "light" | "dark";
};

type ShopContextValue = ShopState & {
  addToCart: (p: Product, opts: { size: string; color: string; qty?: number }) => void;
  removeFromCart: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  trackView: (id: string) => void;
  toggleCompare: (id: string) => void;
  toggleTheme: () => void;
  cartCount: number;
  cartSubtotal: number;
};

const ShopCtx = createContext<ShopContextValue | null>(null);

const cartKey = (i: CartItem) => `${i.productId}::${i.size}::${i.color}`;

const STORAGE = "luxe.shop.v1";

const safeParse = <T,>(raw: string | null, fallback: T): T => {
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
};

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ShopState>(() => {
    if (typeof window === "undefined") {
      return { cart: [], wishlist: [], recentlyViewed: [], compare: [], theme: "dark" };
    }
    return safeParse<ShopState>(localStorage.getItem(STORAGE), {
      cart: [], wishlist: [], recentlyViewed: [], compare: [], theme: "dark",
    });
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE, JSON.stringify(state));
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }, [state]);

  const addToCart: ShopContextValue["addToCart"] = useCallback((p, { size, color, qty = 1 }) => {
    setState((s) => {
      const item: CartItem = {
        productId: p.id,
        slug: p.slug,
        name: p.name,
        brand: p.brand,
        image: p.images[0],
        price: p.price,
        size,
        color,
        qty,
      };
      const k = cartKey(item);
      const existing = s.cart.find((c) => cartKey(c) === k);
      const cart = existing
        ? s.cart.map((c) => (cartKey(c) === k ? { ...c, qty: c.qty + qty } : c))
        : [...s.cart, item];
      return { ...s, cart };
    });
    toast.success(`${p.name} added to bag`, { description: `${color} · Size ${size}` });
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setState((s) => ({ ...s, cart: s.cart.filter((c) => cartKey(c) !== key) }));
  }, []);

  const updateQty = useCallback((key: string, qty: number) => {
    setState((s) => ({
      ...s,
      cart: s.cart.map((c) => (cartKey(c) === key ? { ...c, qty: Math.max(1, qty) } : c)),
    }));
  }, []);

  const clearCart = useCallback(() => setState((s) => ({ ...s, cart: [] })), []);

  const toggleWishlist = useCallback((id: string) => {
    setState((s) => {
      const exists = s.wishlist.includes(id);
      toast(exists ? "Removed from wishlist" : "Saved to wishlist");
      return { ...s, wishlist: exists ? s.wishlist.filter((x) => x !== id) : [...s.wishlist, id] };
    });
  }, []);

  const isWishlisted = useCallback((id: string) => state.wishlist.includes(id), [state.wishlist]);

  const trackView = useCallback((id: string) => {
    setState((s) => {
      const next = [id, ...s.recentlyViewed.filter((x) => x !== id)].slice(0, 8);
      return { ...s, recentlyViewed: next };
    });
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setState((s) => {
      const exists = s.compare.includes(id);
      if (exists) return { ...s, compare: s.compare.filter((x) => x !== id) };
      if (s.compare.length >= 4) {
        toast.error("You can compare up to 4 items");
        return s;
      }
      return { ...s, compare: [...s.compare, id] };
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setState((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" }));
  }, []);

  const value = useMemo<ShopContextValue>(() => {
    const cartCount = state.cart.reduce((a, c) => a + c.qty, 0);
    const cartSubtotal = state.cart.reduce((a, c) => a + c.qty * c.price, 0);
    return {
      ...state,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleWishlist,
      isWishlisted,
      trackView,
      toggleCompare,
      toggleTheme,
      cartCount,
      cartSubtotal,
    };
  }, [state, addToCart, removeFromCart, updateQty, clearCart, toggleWishlist, isWishlisted, trackView, toggleCompare, toggleTheme]);

  return <ShopCtx.Provider value={value}>{children}</ShopCtx.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopCtx);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}

export const cartItemKey = cartKey;
